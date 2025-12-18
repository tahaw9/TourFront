import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BasePaginationFilter} from '../Models/BasePaginationFilter';
import {Observable} from 'rxjs';
import {BaseResponse} from '../Models/BaseResponse';
import {TourInfoPaginationFilter} from '../Models/TourInfo/TourInfoPaginationFilter';
import {TourInfoList} from '../Models/TourInfo/TourInfoList';

@Injectable({
  providedIn: 'root'
})

export class TourInfoService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  GetWithPagination(PaginationFilter: BasePaginationFilter<TourInfoPaginationFilter>): Observable<BaseResponse<TourInfoList[]>> {
    return this.http.get<BaseResponse<TourInfoList[]>>(this.baseUrl + "TourInfo/GetWithPagination?request=" + JSON.stringify(PaginationFilter));
  }
}

