import {Component, OnInit} from '@angular/core';
import {TourPaginationFilter} from '../../Models/Tour/TourPaginationFilter';
import {TourInfoPaginationFilter} from '../../Models/TourInfo/TourInfoPaginationFilter';
import {BasePaginationFilter} from '../../Models/BasePaginationFilter';
import {TourService} from '../../services/TourService';
import {TourTypeService} from '../../services/TourTypeService';
import {AuthService} from '../../services/AuthService';
import {TourInfoService} from '../../services/TourInfoService';
import {TourInfoList} from '../../Models/TourInfo/TourInfoList';
import {BaseResponse} from '../../Models/BaseResponse';
import {PluginInitializer} from '../../services/plugin-initializer';

@Component({
  selector: 'app-manage-tour-info-list',
  imports: [],
  templateUrl: './manage-tour-info-list.html',
  styleUrl: './manage-tour-info-list.scss',
  providers: [TourInfoService, TourTypeService, AuthService]
})
export class ManageTourInfoListComponent implements OnInit {
  BasePaginationFilter: BasePaginationFilter<TourInfoPaginationFilter> = new BasePaginationFilter<TourPaginationFilter>();
  TourInfoList: TourInfoList[] = [];
  TourInfoListBaseResponse: BaseResponse<TourInfoList[]> = new BaseResponse<TourInfoList[]>();
  BindPagingError: string = "";

  constructor(private tourInfoService: TourInfoService, private PluginInitializer: PluginInitializer) {
  }
  ngOnInit(): void {
    this.BasePaginationFilter.PageSize = 10;
    this.BindTourInfoListPagination();
    // this.BindTourTypeFilter();
  }
  BindTourInfoListPagination() {
    this.tourInfoService.GetWithPagination(this.BasePaginationFilter).subscribe(response => {
      this.BindPagingError = "";
      if (!response.succcess) {
        console.log(response.Message);
        return;
      }
      this.TourInfoList = response.Data || [];
      this.TourInfoListBaseResponse = response;
      (setTimeout(() => {
        this.PluginInitializer.initAOS(true);
      }, 100));
      console.log(this.TourInfoList);
    }, (e) => {
      console.log(e);
      this.BindPagingError = e.error.Message;
    })
  }

}
