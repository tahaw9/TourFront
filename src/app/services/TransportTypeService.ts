import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '../Models/BaseResponse';
import {TransportType} from '../Models/TransportType/TransportType';

@Injectable({
  providedIn: 'root'
})
export class TransportTypeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAll(): Observable<BaseResponse<TransportType[]>> {
    return this.http.get<BaseResponse<TransportType[]>>(this.baseUrl + "TransportType/GetAll");
  }
}
