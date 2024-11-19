import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../services/users.service';
import { IRole } from '../../../interfaces/role.interface';

@Component({
  selector: 'app-create-role-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-role-modal.component.html',
})
export class CreateRoleModalComponent {
  @Input() role?: IRole;
  @Output() closeModal = new EventEmitter<void>();
  @Output() roleCreated = new EventEmitter<any>();

  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private rolesService: RolesService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.role?.name || '', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.role) {
      this.rolesService.update(this.role.id, this.form.value).subscribe((updatedRole) => {
        this.roleCreated.emit(updatedRole.data);
        this.closeModal.emit();
      });
    } else {
      this.rolesService.create(this.form.value).subscribe((newRole) => {
        this.roleCreated.emit(newRole.data);
        this.closeModal.emit();
      });
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
