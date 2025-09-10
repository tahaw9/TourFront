import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '../Models/BaseResponse';
import {LocationLevel} from '../Models/LocationLevel/LocationLevel';

@Injectable({
  providedIn: 'root'
})
export class LocationLevelService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  GetAllForCombo(): Observable<BaseResponse<LocationLevel[]>> {
    return this.http.get<BaseResponse<LocationLevel[]>>(this.baseUrl + "LocationLevel/GetAll");
  }
}
