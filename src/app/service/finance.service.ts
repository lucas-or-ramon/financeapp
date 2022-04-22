import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Registry } from '../interface/registry';
import { Resume } from '../interface/resume';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

    public getRegistries(type: string, year: number, month: number): Observable<Resume> {
      return this.http.get<Resume>(`${this.apiServerUrl}/${type}/resume/${year}/${month}`);
    }
  
    public addRegistry(type: string, registry: Registry): Observable<Registry> {
      return this.http.post<Registry>(`${this.apiServerUrl}/${type}`, registry)
    }
  
    public updateRegistry(type: string, registry: Registry): Observable<Registry> {
      return this.http.put<Registry>(`${this.apiServerUrl}/${type}/${registry.id}`, registry)
    }
  
    public deleteRegistry(type: string, registryId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/${type}/${registryId}`)
    }
}
