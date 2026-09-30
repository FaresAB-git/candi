// candidatures/candidature.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CandidatureRequest, CandidatureResponse} from '../mapping/candidature.mapping';
import {BaseService} from '../entity/beseService';


@Injectable({ providedIn: 'root' })
export class CandidatureService extends BaseService {
  private readonly baseUrl = `${this.apiUrl}/candidature`;

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<CandidatureResponse[]> {
    return this.http.get<CandidatureResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<CandidatureResponse> {
    return this.http.get<CandidatureResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: CandidatureRequest): Observable<CandidatureResponse> {
    return this.http.post<CandidatureResponse>(this.baseUrl, request);
  }

  update(id: number, request: CandidatureRequest): Observable<CandidatureResponse> {
    return this.http.put<CandidatureResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadCv(id: number, file: File): Observable<CandidatureResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CandidatureResponse>(`${this.baseUrl}/${id}/cv`, formData);
  }

  // Endpoint de génération IA à brancher une fois disponible côté back
  genererCv(id: number): Observable<CandidatureResponse> {
    return this.http.post<CandidatureResponse>(`${this.baseUrl}/${id}/cv/generate`, {});
  }
}
