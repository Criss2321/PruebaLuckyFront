import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Personal } from '../../models/personal.model';
import { PersonalService } from '../../services/personal.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PersonalCreateDialogComponent } from '../personal-create-dialog/personal-create-dialog.component';
import { PersonalHijosDialogComponent } from '../personal-hijos-dialog/personal-hijos-dialog.component';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrl: './personal-list.component.css'
})
export class PersonalListComponent implements OnInit {
  
  displayedColumns: string[] = ['idPersonal', 'tipoDoc', 'numeroDoc', 'nombreCompleto', 'fechaNac', 'fechaIngreso', 'editar', 'eliminar', 'verHijos'];
  dataSource!: MatTableDataSource<Personal>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private personalService: PersonalService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarPersonal();
  }

  cargarPersonal(): void {
    this.personalService.listarPersonal().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
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

  registrar(): void {
    const dialogRef = this.dialog.open(PersonalCreateDialogComponent, {
      width: '550px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPersonal();
      }
    });
  }

  editar(personal: Personal): void {
    const dialogRef = this.dialog.open(PersonalCreateDialogComponent, {
      width: '550px',
      data: personal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPersonal();
      }
    });
  }

  eliminar(personal: Personal): void {
    if (confirm(`¿Está seguro de eliminar a ${personal.nombreCompleto}?`)) {
      this.personalService.eliminarPersonal(personal.idPersonal).subscribe(() => {
        this.cargarPersonal();
      });
    }
  }

  verHijos(idPersonal: number): void {
    const dialogRef = this.dialog.open(PersonalHijosDialogComponent, {
      width: '60%',
      data: { idPersonal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPersonal();
      }
    });
  }

}
