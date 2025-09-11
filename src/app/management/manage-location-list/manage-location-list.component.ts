import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocationService} from '../../services/LocationService';
import {TourType} from '../../Models/TourType/TourType';
import {BaseResponse} from '../../Models/BaseResponse';
import {LocationPaginationFilter} from '../../Models/Location/LocationPaginationFilter';
import {BasePaginationFilter} from '../../Models/BasePaginationFilter';
import {LocationList} from '../../Models/Location/LocationList';
import {PluginInitializer} from '../../services/plugin-initializer';
import {LocationLevelService} from '../../services/LocationLevelService';
import {LocationLevel} from '../../Models/LocationLevel/LocationLevel';
import {FormsModule} from '@angular/forms';
import {LocationCategorizedCount} from '../../Models/Location/LocationCategorizedCount';
import {DecimalPipe} from '@angular/common';
import {PersianNumberPipe} from '../../pipes/PersianNumberPipe';
import {ManagementPagingComponent} from '../management-paging/management-paging.component';

@Component({
  selector: 'app-manage-location-list',
  templateUrl: './manage-location-list.component.html',
  styleUrls: ['./manage-location-list.component.scss'],
  imports: [HttpClientModule, FormsModule, PersianNumberPipe, ManagementPagingComponent],
  providers: [LocationService, LocationLevelService]
})
export class ManageLocationListComponent implements OnInit {

  BasePaginationFilter: BasePaginationFilter<LocationPaginationFilter> = new BasePaginationFilter<LocationPaginationFilter>();
  LocationList: LocationList[] = [];
  LocationLevelCombo: LocationLevel[] = [];
  LocationListBaseResponse: BaseResponse<LocationList[]> = new BaseResponse<LocationList[]>();
  CategorizedCountList: LocationCategorizedCount[] = [];
  LocationNameFilter: string = "";

  constructor(private LocationService: LocationService,
              private LocationLevelService: LocationLevelService, private PluginInitializer: PluginInitializer) {
  }

  ngOnInit() {
    this.BasePaginationFilter.PageSize = 10;

    this.BindLocationLevelFilter();
    this.BindLocationListPagination();
    this.GetLocationCategorizedCount();
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
  onPageChange(page: number) {
    this.BasePaginationFilter.PageNumber = page;
    this.BindLocationListPagination();
  }


  SearchWithFilters() {
    debugger
    this.BasePaginationFilter.Filters = new LocationPaginationFilter();
    const LocationLevelFilter = document.querySelector('.LocationLevel-cmb li.selected');
    if (LocationLevelFilter) {
      const LocationLevelGuidFilter = LocationLevelFilter.getAttribute('data-value');
      if (LocationLevelGuidFilter != "" && LocationLevelGuidFilter != null) {
        this.BasePaginationFilter.Filters.LocationLevelGuid = LocationLevelGuidFilter;
      }
    }
    if(this.LocationNameFilter != "" && this.LocationNameFilter != null) {
      this.BasePaginationFilter.Filters.Name = this.LocationNameFilter;
    }
    this.BindLocationListPagination();
  }

  BindLocationLevelFilter() {
    this.LocationLevelService.GetAllForCombo().subscribe(response => {
      if (!response.succcess) {
        console.log(response.Message);
      } else {
        this.LocationLevelCombo = response.Data || [];
        (setTimeout(() => {
          ($('.LocationLevel-cmb')).niceSelect('update');
        }, 100));
      }
    })
  }


  ChangePageNumberAndReBind(pageNumber: number) {
    this.BasePaginationFilter.PageNumber = pageNumber;
    this.BindLocationListPagination();
  }


  GetLocationCategorizedCount() {
    this.LocationService.GetLocationCategorizedCount().subscribe(res => {
      if (res.Data)
        this.CategorizedCountList = res.Data;

    })
  }

  protected readonly Array = Array;
  protected readonly Math = Math;
}
