import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormField, FormFieldType, FormTemplate, FormTemplateApi } from '../../../interfaces/medic.interface';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormTemplatesService } from '../../../services/medics.service';

@Component({
  selector: 'app-create-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './create-form-modal.component.html',
})
export class CreateFormModalComponent {
  @Input() formTemplate?: FormTemplateApi = {} as FormTemplateApi;
  @Output() closeModal = new EventEmitter<void>();
  @Output() formCreated = new EventEmitter<FormTemplateApi>();

  form!: FormGroup;
  submitted = false;

  availableComponents = [
    { type: FormFieldType.TEXT, label: 'Input' },
    { type: FormFieldType.NUMBER, label: 'Número' },
    { type: FormFieldType.TEXTAREA, label: 'Textarea' },
    { type: FormFieldType.CHECKBOX, label: 'Checkbox' },
    { type: FormFieldType.RADIO, label: 'Radio' },
    { type: FormFieldType.SELECT, label: 'Select' },
    { type: FormFieldType.DATE, label: 'Fecha' },
  ];

  constructor(
    private fb: FormBuilder,
    private formTemplateService: FormTemplatesService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      formName: [this.formTemplate?.formName || '', Validators.required],
      fields: this.fb.array([]),
    });

    if (this.formTemplate?.formStructure) {
      this.loadExistingFields();
    }
  }

  loadExistingFields(): void {
    const existingFields = JSON.parse(JSON.stringify(this.formTemplate?.formStructure)).fields
    existingFields.forEach((field: FormField) => {
      this.fields.push(this.fb.group({
        name: [field.name, Validators.required],
        label: [field.label, Validators.required],
        type: [field.type, Validators.required],
        required: [field.required || false],
        options: [field.options?.join(', ') || ''] // Convert options to string if applicable
      }));
    });
  }

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  createFieldGroup(field?: FormField) {
  }

  addField(component: { type: FormFieldType; label: string }): void {
    this.fields.push(this.fb.group(
      {
        name: ['', Validators.required],
        label: ['', Validators.required],
        type: [component.type, Validators.required],
        required: [false],
      }
    ))
  }

  removeField(index: number): void {
    this.fields.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      console.error('Formulario inválido:', this.form);
      return;
    }

    const formTemplate = {
      formName: this.form.value.formName,
      formStructure: JSON.stringify({
        fields: this.form.value.fields
      }),
    };

    if (this.formTemplate?.id) {
      // this.formTemplateService.update(this.formTemplate?.id, formTemplate).subscribe(() => {
      this.closeModal.emit();
      // });
    } else {
      this.formTemplateService.create(formTemplate).subscribe(() => {
        this.closeModal.emit();
        // this.formCreated.emit(formTemplate);
      });
    }

  }

  onClose(): void {
    this.closeModal.emit();
  }
}
