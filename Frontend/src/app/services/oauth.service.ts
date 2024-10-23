import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  api_base_url = "http://localhost:3000/auth"

  constructor(private http: HttpClient) {}

  connectToGithub(): void {
    window.location.href = `${this.api_base_url}/github`;
  }

  checkGithubUserStatus(id:any): Observable<{ isConnected: boolean }> {
    return this.http.get<{ isConnected: boolean }>(`${this.api_base_url}/status/${id}`);
  }

  getGithubUserData(id:any): Observable<any> {
    return this.http.get<any>(`${this.api_base_url}/get-user-data/${id}`);
  }

  removeGithubUser(id:any): Observable<any> {
    return this.http.delete(`${this.api_base_url}/remove/${id}`);
  }
}
