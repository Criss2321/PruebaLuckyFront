import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalService } from '../../services/personal.service';
import { Personal } from '../../models/personal.model';

@Component({
  selector: 'app-personal-create-dialog',
  templateUrl: './personal-create-dialog.component.html',
  styleUrl: './personal-create-dialog.component.css'
})
export class PersonalCreateDialogComponent {
  personalForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    public dialogRef: MatDialogRef<PersonalCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personal
  ) {
    this.personalForm = this.fb.group({
      idPersonal: data?.idPersonal ?? 0,
      tipoDoc: ['', Validators.required],
      numeroDoc: ['', Validators.required],
      apPaterno: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]*$')]],
      apMaterno: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]*$')]],
      nombre1: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]*$')]],
      nombre2: ['', [Validators.pattern('^[A-Z][a-z]*$')]],
      fechaNac: ['', Validators.required],
      fechaIngreso: ['', Validators.required]
    });

    if (data) {
      this.isEditMode = true;
      this.personalForm.patchValue(data);
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.personalForm.patchValue(this.data);
    }

    // Validación condicional
    this.personalForm.get('tipoDoc')?.valueChanges.subscribe(tipoDoc => {
      const numeroDocControl = this.personalForm.get('numeroDoc');
      const pattern = tipoDoc === 'DNI' ? '^[0-9]{8}$' : '^[A-Z0-9]{12}$';
      numeroDocControl?.setValidators([Validators.required, Validators.pattern(pattern)]);
      numeroDocControl?.updateValueAndValidity();
    });

    // Lógica para activar la validación condicional de apMaterno y nombre2
    const controlGroups = [
      { control: 'apPaterno', relatedControl: 'apMaterno' },
      { control: 'nombre1', relatedControl: 'nombre2' },
    ];

    controlGroups.forEach(({ control, relatedControl }) => {
      this.personalForm.get(control)?.valueChanges.subscribe(value => {
        const relatedControlInstance = this.personalForm.get(relatedControl);
        if (value) {
          relatedControlInstance?.setValidators([Validators.required, Validators.pattern('^[A-Z][a-z]*$')]);
        } else {
          relatedControlInstance?.clearValidators();
        }
        relatedControlInstance?.updateValueAndValidity();
      });
    });

  }

  onSubmit() {
    // Si el formulario es válido
    if (this.personalForm.valid) {
      // Se obtiene el objeto personal a partir de los datos del formulario
      const personal: Personal = this.personalForm.value;
      // Si se está en modo edición
      if(this.isEditMode) {
        // Actualizar el personal
        this.personalService.actualizarPersonal(personal).subscribe(response => {
          this.dialogRef.close(true);
        });
      } else {
        // Registrar el personal
        this.personalService.registrarPersonal(personal).subscribe(response => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}