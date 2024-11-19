import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService, RolesService, UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  templateUrl: './create-user.component.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class CreateUserComponent implements OnInit {
  @Input() user?: IUser; // Usuario para editar, opcional
  @Output() closeModal = new EventEmitter<void>();
  @Output() userSaved = new EventEmitter<IUser>();

  form!: FormGroup;
  submitted = false;

  roles: any[] = [];
  branches: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private roleService: RolesService,
    private branchService: BranchService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      ci: [this.user?.ci || '', Validators.required],
      name: [this.user?.name || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      password: ['', this.user ? [] : [Validators.required, Validators.minLength(8)]], // Password requerido solo si es nuevo
      phone: [this.user?.phone || '', Validators.required],
      gender: [this.user?.gender || '', Validators.required],
      roleId: [this.user?.role.id || '', Validators.required],
      branchId: [this.user?.branch.id || '', Validators.required],
    });

    this.loadRoles();
    this.loadBranches();
  }

  get f() {
    return this.form.controls;
  }

  loadRoles() {
    this.roleService.getAll().subscribe((data) => {
      this.roles = data.data || [];
    });
  }

  loadBranches() {
    this.branchService.getAll().subscribe((data) => {
      this.branches = data.data || [];
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const userData = this.form.value;

    if (this.user) {
      this.userService.update(this.user.id, userData).subscribe((updatedUser) => {
        this.userSaved.emit(updatedUser.data);
        this.closeModal.emit();
      });
    } else {
      this.userService.create(userData).subscribe((newUser) => {
        this.userSaved.emit(newUser.data);
        this.closeModal.emit();
      });
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
