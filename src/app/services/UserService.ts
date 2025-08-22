import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../Models/User/User';
import { BaseResponse } from '../Models/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  GetUser(userGuid : string): Observable<BaseResponse<User>>{
    return this.http.get<BaseResponse<User>>( this.baseUrl + "User/Get?UserGuid=" + userGuid);
  }

  getValues(): Observable<string[]> {
    // URL کامل را با concat کردن baseUrl و مسیر Endpoint می‌سازیم
    return this.http.get<string[]>(`${this.baseUrl}/Values`);
  }

  getValueById(id: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/Values/${id}`);
  }

  postValue(value: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/Values`, JSON.stringify(value), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // مثال برای یک endpoint دیگر
  // فرض کنید یک endpoint برای کاربران دارید: https://localhost:7001/api/Users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Users`);
  }
}