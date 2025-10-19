import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseResponse } from "../Models/BaseResponse";
import {BasePaginationFilter} from '../Models/BasePaginationFilter';
import {RolePaginationFilter} from '../Models/Role/RolePaginationFilter';
import {RoleList} from '../Models/Role/RoleList';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetWithPagination(PaginationFilter : BasePaginationFilter<RolePaginationFilter>): Observable<BaseResponse<RoleList[]>> {
    return this.http.get<BaseResponse<RoleList[]>>(this.baseUrl + "Role/GetWithPagination?request=" + JSON.stringify(PaginationFilter));
  }
}
