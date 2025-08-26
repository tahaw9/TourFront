import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BasePaginationFilter} from '../Models/BasePaginationFilter';
import {TourPaginationFilter} from '../Models/Tour/TourPaginationFilter';
import {Observable} from 'rxjs';
import {BaseResponse} from '../Models/BaseResponse';
import {TourList} from '../Models/Tour/TourList';
import {InsLocation} from '../Models/Location/InsLocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  InsertLocation(data : InsLocation): Observable<BaseResponse<boolean>> {
    return this.http.post<BaseResponse<boolean>>(this.baseUrl + "Location/Insert", data, {responseType: 'json'});
  }
}
