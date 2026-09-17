import { Injectable } from '@angular/core';
import { BaseService } from '../entity/beseService';
import { HttpClient } from '@angular/common/http';
import {Utilisateur} from '../mapping/utilisateur.mapping';
import {CandidatureResponse} from '../mapping/candidature.mapping';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilisateurService extends BaseService {
  private readonly baseUrl = `${this.apiUrl}/users`;

  constructor(http: HttpClient) {
    super(http);
  }

  getMe(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/me`);
  }
}
