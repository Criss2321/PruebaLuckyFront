import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hijo } from '../models/hijos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HijosPersonalService {

  private apiUrl = 'http://localhost:5254/api/HijosPersonal';

  constructor(private http: HttpClient) { }

  listarHijosPersonal(id: number): Observable<Hijo[]> {
    return this.http.get<Hijo[]>(`${this.apiUrl}/${id}`);
  }

  registrarHijo(hijo: Hijo): Observable<Hijo> {
    return this.http.post<Hijo>(this.apiUrl, hijo);
  }

  actualizarHijo(hijo: Hijo): Observable<Hijo> {
    return this.http.put<Hijo>(this.apiUrl, hijo);
  }

  eliminarHijo(id: number): Observable<Hijo> {
    return this.http.delete<Hijo>(`${this.apiUrl}/${id}`);
  }

}
