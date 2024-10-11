import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalListComponent } from './components/personal-list/personal-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PersonalCreateDialogComponent } from './components/personal-create-dialog/personal-create-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PersonalHijosDialogComponent } from './components/personal-hijos-dialog/personal-hijos-dialog.component';
import { PersonalHijosCreateDialogComponent } from './components/personal-hijos-create-dialog/personal-hijos-create-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalListComponent,
    PersonalCreateDialogComponent,
    PersonalHijosDialogComponent,
    PersonalHijosCreateDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Para hacer peticiones HTTP
    BrowserAnimationsModule, // Para las animaciones
    MatTableModule, // Para mostrar la tabla
    MatPaginatorModule, // Para paginar la tabla
    MatSortModule, // Para ordenar las columnas
    MatIconModule, // Para los iconos
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule // Para las rutas
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
