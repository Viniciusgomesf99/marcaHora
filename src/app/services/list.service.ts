import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:3000'; // URL do backend

  constructor(private http: HttpClient) { }

  // Criar uma nova lista
  createList(listData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-list`, listData);
  }

  // Buscar uma lista por ID
  getListById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/view-list/${id}`);
  }
  
  reserveTime(listId: string, day: string, time: string, userName: string): Observable<any> {
    const reservationData = { listId, day, time, userName };
    return this.http.post(`${this.apiUrl}/reserve-time`, reservationData);
  }

  accessList(listId: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/access-list`, { listId, password });
  }

  endList(listId: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/end-list`, { listId, password });
  }
}