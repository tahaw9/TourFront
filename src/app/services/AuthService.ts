import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(dto: { PhoneNumber: string; Password: string }) {
    return this.http.post(this.baseUrl + "Auth/Login", dto, { withCredentials: true });
  }

  logout() {
    return this.http.post(this.baseUrl + "Auth/Logout", {}, { withCredentials: true });
  }

  getMe() {
    return this.http.get(this.baseUrl + "Auth/me", { withCredentials: true });
  }
}
