import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '../Models/BaseResponse';
import {Combo} from '../Models/GenericModels/Combo';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  GetForCombo(EntityName: string): Observable<BaseResponse<Combo[]>> {
    return this.http.get<BaseResponse<Combo[]>>(this.baseUrl + `Base/combo/${EntityName}`);
  }
}
