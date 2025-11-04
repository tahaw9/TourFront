import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseResponse} from "../Models/BaseResponse";
import {BasePaginationFilter} from "../Models/BasePaginationFilter";
import {TourPaginationFilter} from "../Models/Tour/TourPaginationFilter";
import {TourList} from "../Models/Tour/TourList";
import {TourInsUp} from '../Models/Tour/TourInsUp';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  GetWithPagination(PaginationFilter: BasePaginationFilter<TourPaginationFilter>): Observable<BaseResponse<TourList[]>> {
    return this.http.get<BaseResponse<TourList[]>>(this.baseUrl + "Tour/GetWithPagination?request=" + JSON.stringify(PaginationFilter));
  }

  InsertTour(data: TourInsUp): Observable<BaseResponse<string>> {
    const formData = new FormData();

    if (data.TitleFile) {
      formData.append('file', data.TitleFile);
    }

    debugger
    formData.append('command', JSON.stringify(data));
    return this.http.post<BaseResponse<string>>(this.baseUrl + "Tour/Insert", formData);
  }
}
