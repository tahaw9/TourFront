import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseResponse } from "../Models/BaseResponse";
import { BasePaginationFilter } from "../Models/BasePaginationFilter";
import { TourPaginationFilter } from "../Models/Tour/TourPaginationFilter";
import { TourList } from "../Models/Tour/TourList";

@Injectable({
    providedIn: 'root'
})
export class TourService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    GetWithPagination(PaginationFilter : BasePaginationFilter<TourPaginationFilter>): Observable<BaseResponse<TourList[]>> {
        return this.http.get<BaseResponse<TourList[]>>(this.baseUrl + "Tour/GetWithPagination?request=" + JSON.stringify(PaginationFilter));
    }
}