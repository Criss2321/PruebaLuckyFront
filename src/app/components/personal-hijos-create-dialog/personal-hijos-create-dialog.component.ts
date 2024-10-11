import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HijosPersonalService } from '../../services/hijos-personal.service';
import { Hijo } from '../../models/hijos.model';

@Component({
  selector: 'app-personal-hijos-create-dialog',
  templateUrl: './personal-hijos-create-dialog.component.html',
  styleUrl: './personal-hijos-create-dialog.component.css'
})
export class PersonalHijosCreateDialogComponent {
  hijoForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private hijosService: HijosPersonalService,
    private dialogRef: MatDialogRef<PersonalHijosCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idPersonal: number, hijo?: Hijo }
  ) {
    this.hijoForm = this.fb.group({
      idHijo: data.hijo?.idHijo ?? 0,
      idPersonal: [data.idPersonal, Validators.required],
      tipoDoc: ['', Validators.required],
      numeroDoc: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      nombre1: ['', Validators.required],
      nombre2: [''],
      fechaNac: ['', Validators.required]
    });

    if (data.hijo) {
      this.isEditMode = true;
      this.hijoForm.patchValue(data.hijo);
    }
  }

  // Registrar o actualizar el hijo
  onSubmit() {
    if (this.hijoForm.valid) {
      const hijoData: Hijo = this.hijoForm.value;

      if (this.isEditMode) {
        // Actualizar hijo
        this.hijosService.actualizarHijo(hijoData).subscribe(() => {
          this.dialogRef.close(true); // Refrescar lista
        });
      } else {
        // Registrar nuevo hijo
        this.hijosService.registrarHijo(hijoData).subscribe(() => {
          this.dialogRef.close(true); // Refrescar lista
        });
      }
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

}
