import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BasePaginationFilter} from '../Models/BasePaginationFilter';
import {TourPaginationFilter} from '../Models/Tour/TourPaginationFilter';
import {Observable} from 'rxjs';
import {BaseResponse} from '../Models/BaseResponse';
import {TourList} from '../Models/Tour/TourList';
import {InsLocation} from '../Models/Location/InsLocation';
import {LocationPaginationFilter} from '../Models/Location/LocationPaginationFilter';
import {LocationList} from '../Models/Location/LocationList';
import {LocationCategorizedCount} from '../Models/Location/LocationCategorizedCount';
import {LocationSearchResultCmb} from '../Models/Location/LocationSearchResultCmb';
import {PaginationFilter} from '../Models/GenericModels/PaginationFilter';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  InsertLocation(data: InsLocation): Observable<BaseResponse<boolean>> {
    return this.http.post<BaseResponse<boolean>>(this.baseUrl + "Location/Insert", data, {responseType: 'json'});
  }

  GetWithPagination(PaginationFilter: BasePaginationFilter<LocationPaginationFilter>): Observable<BaseResponse<LocationList[]>> {
    return this.http.get<BaseResponse<LocationList[]>>(this.baseUrl + "Location/GetWithPagination?request=" + JSON.stringify(PaginationFilter));
  }

  GetLocationCategorizedCount(): Observable<BaseResponse<LocationCategorizedCount[]>> {
    return this.http.get<BaseResponse<LocationCategorizedCount[]>>(this.baseUrl + "Location/CategorizedCount");
  }

  SearchLocationsByName(searchInput: string): Observable<BaseResponse<LocationSearchResultCmb[]>> {
    return this.http.get<BaseResponse<LocationSearchResultCmb[]>>(this.baseUrl + "Location/SearchLocationsByName?input=" + searchInput);
  }
}
