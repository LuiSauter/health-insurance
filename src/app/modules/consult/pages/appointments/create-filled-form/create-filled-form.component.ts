import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilledFormsService, FormTemplatesService } from '../../../../clinic/services/medics.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PatientService } from '../../../../clinic/services/patient.service';
import { FormTemplateApi } from '../../../../clinic/interfaces/medic.interface';

@Component({
  selector: 'app-create-filled-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './create-filled-form.component.html'
})
export class CreateFilledFormComponent {
  @Input() appointmentId: string = ''  // ID de la cita
  @Input() patientId: string = ''      // ID del paciente
  formTemplates: FormTemplateApi[] = [] as FormTemplateApi[];

  @Output() closeModal = new EventEmitter<void>();

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private filledFormService: FilledFormsService,
    private formsTemplateService: FormTemplatesService,
  ) { }

  ngOnInit(): void {
    console.log(this.appointmentId)
    console.log(this.patientId)
    this.form = this.fb.group({
      formTemplateId: ['', Validators.required],
      appointmentId: ['', Validators.required],
      filledData: this.fb.array([]),
      patientId: ['', Validators.required],
    });

    this.loadFormTemplateStructure();

    console.log(this.formTemplates)
  }

  loadFormTemplateStructure(): void {
    this.formsTemplateService.getAll().subscribe((response) => {
      this.formTemplates = response.data?.map((template: any) => ({
        ...template,
        formStructure: JSON.parse(template.formStructure),
      })) ?? [] as FormTemplateApi[];
    });
  }


  /**
   * Crea controles dinámicos basados en la estructura del formulario.
   */
  createFilledDataControls(): any {
    // const controls: any = {};
    // if (this.formTemplateStructure?.fields) {
    //   this.formTemplateStructure.fields.forEach((field: any) => {
    //     controls[field.name] = [
    //       '',
    //       field.required ? Validators.required : null,
    //     ];
    //   });
    // }
    // return controls;
  }

  /**
   * Enviar datos llenados al backend.
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      console.error('Formulario inválido:', this.form);
      return;
    }

    const filledForm = {
      formTemplateId: this.form.value.formTemplateId,
      appointmentId: this.form.value.appointmentId,
      filledData: JSON.stringify(this.form.value.filledData), // Serializa los datos llenados
      patientId: this.form.value.patientId,
    };

    console.log('Enviando datos:', filledForm);

    this.filledFormService.create(filledForm).subscribe(() => {
      this.closeModal.emit();
    });
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
