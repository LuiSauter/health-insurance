import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormField, FormTemplate, FormTemplateApi } from '../../../interfaces/medic.interface';
import { FormTemplatesService } from '../../../services/medics.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateFormModalComponent } from "../create-form-modal/create-form-modal.component";
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-list-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SvgIconComponent, CreateFormModalComponent],
  templateUrl: './list-form.component.html',
})
export class ListFormComponent {
  public formTemplates: FormTemplateApi[] | undefined = [];
  public showModal = false;
  public selectedTemplate: FormTemplateApi = {} as FormTemplateApi;

  constructor(private formTemplatesService: FormTemplatesService) { }

  ngOnInit(): void {
    this.loadFormTemplates();
  }

  loadFormTemplates(): void {
    this.formTemplatesService.getAll().subscribe((response) => {
      this.formTemplates = response?.data?.map((template: any) => ({
        ...template,
        formStructure: JSON.parse(template.formStructure),
      }));
    });
  }

  openCreateFormModal(): void {
    this.selectedTemplate = {} as FormTemplateApi;
    this.showModal = true;
  }

  closeCreateFormModal(): void {
    this.showModal = false;
  }

  addOrUpdateFormTemplate(template: FormTemplateApi): void {
    // if (template?.id) {
    //   const index = this.formTemplates.findIndex((t) => t.id === template.id);
    //   this.formTemplates[index] = template;
    // } else {
    //   this.formTemplates.push(template);
    // }
    // this.closeCreateFormModal();
  }

  onEdit(template: FormTemplateApi): void {
    this.selectedTemplate = template;
    this.showModal = true;
  }

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
  }
}
