import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private apiUrl = 'http://localhost:5254/api/Personal';

  constructor(private http: HttpClient) { }

  listarPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
  }

  registrarPersonal(personal: Personal): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrl, personal);
  }

  actualizarPersonal(personal: Personal): Observable<Personal> {
    return this.http.put<Personal>(this.apiUrl, personal);
  }

  eliminarPersonal(id: number): Observable<Personal> {
    return this.http.delete<Personal>(`${this.apiUrl}/${id}`);
  }

}
