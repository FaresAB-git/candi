import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseService {
  protected readonly apiUrl = 'http://localhost:9090/api';

  constructor(protected http: HttpClient) {}
}
