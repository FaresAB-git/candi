import { Injectable } from '@angular/core';
import { BaseService } from '../entity/beseService';
import { CandidatureRequest, CandidatureResponse } from '../mapping/candidature.mapping';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CandidatureService extends BaseService {
  private readonly baseUrl = `${this.apiUrl}/candidature`;

  constructor(http: HttpClient) {
    super(http);
  }

  getCandidatures(): Observable<CandidatureResponse[]> {
    return this.http.get<CandidatureResponse[]>(this.baseUrl);
  }

  getCandidature(id: string): Observable<CandidatureResponse> {
    return this.http.get<CandidatureResponse>(`${this.baseUrl}/${id}`);
  }

  createCandidature(request: CandidatureRequest): Observable<CandidatureResponse> {
    return this.http.post<CandidatureResponse>(this.baseUrl, request);
  }

  updateCandidature(id: number, request: CandidatureRequest): Observable<CandidatureResponse> {
    return this.http.put<CandidatureResponse>(`${this.baseUrl}/${id}`, request);
  }

  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
