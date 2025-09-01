import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocationService} from '../../services/LocationService';
import {TourPaginationFilter} from '../../Models/Tour/TourPaginationFilter';
import {TourType} from '../../Models/TourType/TourType';
import {BaseResponse} from '../../Models/BaseResponse';
import {LocationPaginationFilter} from '../../Models/Location/LocationPaginationFilter';
import {BasePaginationFilter} from '../../Models/BasePaginationFilter';
import {LocationList} from '../../Models/Location/LocationList';
import {PluginInitializer} from '../../services/plugin-initializer';

@Component({
  selector: 'app-manage-location-list',
  templateUrl: './manage-location-list.component.html',
  styleUrls: ['./manage-location-list.component.scss'],
  imports:[HttpClientModule],
  providers:[LocationService]
})
export class ManageLocationListComponent implements OnInit {

  BasePaginationFilter: BasePaginationFilter<LocationPaginationFilter> = new BasePaginationFilter<LocationPaginationFilter>();
  LocationList: LocationList[] = [];
  TourTypeCombo: TourType[] = [];
  LocationListBaseResponse: BaseResponse<LocationList[]> = new BaseResponse<LocationList[]>();
  TourTypeGuidFilter: string = "";
  constructor(private LocationService: LocationService, private PluginInitializer: PluginInitializer) { }

  ngOnInit() {
    this.BasePaginationFilter.PageSize = 10;

    this.BindLocationListPagination();
  }

  BindLocationListPagination() {
    this.LocationService.GetWithPagination(this.BasePaginationFilter).subscribe(response => {
      if (!response.succcess) {
        console.log(response.Message);
        return;
      }
      this.LocationList = response.Data || [];
      this.LocationListBaseResponse = response;
      (setTimeout(() => {
        this.PluginInitializer.initAOS(true);
      }, 100));
      console.log(this.LocationList);
      console.log(response)
    }, (e) => {

    })
  }

}
