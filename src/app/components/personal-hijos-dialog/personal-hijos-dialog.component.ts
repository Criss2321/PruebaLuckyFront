import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HijosPersonalService } from '../../services/hijos-personal.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Hijo } from '../../models/hijos.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PersonalHijosCreateDialogComponent } from '../personal-hijos-create-dialog/personal-hijos-create-dialog.component';

@Component({
  selector: 'app-personal-hijos-dialog',
  templateUrl: './personal-hijos-dialog.component.html',
  styleUrl: './personal-hijos-dialog.component.css'
})
export class PersonalHijosDialogComponent implements OnInit {

  displayedColumns: string[] = ['idHijo', 'tipoDoc', 'numeroDoc', 'nombreCompleto', 'fechaNac', 'editar', 'eliminar'];
  dataSource!: MatTableDataSource<Hijo>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private hijosService: HijosPersonalService,
    private dialog: MatDialog,
    @Inject (MAT_DIALOG_DATA) public data: { idPersonal: number },
  ) {}

  ngOnInit(): void {
    this.cargarHijosPersonal(this.data.idPersonal);
  }

  cargarHijosPersonal(id: number): void {
    this.hijosService.listarHijosPersonal(id).subscribe(hijos => {
      this.dataSource = new MatTableDataSource(hijos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  registrarHijo(): void {
    const dialogRef = this.dialog.open(PersonalHijosCreateDialogComponent, {
      width: '550px',
      data: { idPersonal: this.data.idPersonal }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarHijosPersonal(this.data.idPersonal);
      }
    });
  }

  editarHijo(hijo: Hijo): void {
    const dialogRef = this.dialog.open(PersonalHijosCreateDialogComponent, {
      width: '550px',
      data: { idPersonal: this.data.idPersonal, hijo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarHijosPersonal(this.data.idPersonal);
      }
    });
  }

  eliminarHijo(hijo: Hijo) {
    if (confirm(`¿Está seguro de eliminar al hijo ${hijo.nombreCompleto}?`)) {
      this.hijosService.eliminarHijo(hijo.idHijo).subscribe(() => {
        this.cargarHijosPersonal(this.data.idPersonal);
      });
    }
  }

}
