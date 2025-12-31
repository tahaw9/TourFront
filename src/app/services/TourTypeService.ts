import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {BaseResponse} from "../Models/BaseResponse";
import {TourType} from "../Models/TourType/TourType";
import {Observable} from "rxjs";
import {Combo} from '../Models/GenericModels/Combo';

@Injectable({
  providedIn: 'root'
})
export class TourTypeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  GetAll(): Observable<BaseResponse<TourType[]>> {
    return this.http.get<BaseResponse<TourType[]>>(this.baseUrl + "TourType/GetAll");
  }
}
