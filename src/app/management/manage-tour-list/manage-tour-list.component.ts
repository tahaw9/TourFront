import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BasePaginationFilter} from '../../Models/BasePaginationFilter';
import {TourPaginationFilter} from '../../Models/Tour/TourPaginationFilter';
import {TourService} from '../../services/TourService';
import {PluginInitializer} from '../../services/plugin-initializer';
import {TourList} from '../../Models/Tour/TourList';
import {DecimalPipe} from '@angular/common';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BaseResponse} from '../../Models/BaseResponse';
import {TourTypeService} from '../../services/TourTypeService';
import {TourType} from '../../Models/TourType/TourType';
import {AuthService} from '../../services/AuthService';
import {ManagementPagingComponent} from '../management-paging/management-paging.component';
import {PersianNumberPipe} from '../../pipes/PersianNumberPipe';

@Component({
  selector: 'app-manage-tour-list',
  templateUrl: './manage-tour-list.component.html',
  imports: [
    FormsModule,
    DecimalPipe,
    HttpClientModule,
    ManagementPagingComponent,
    PersianNumberPipe
  ],
  styleUrls: ['./manage-tour-list.component.scss'],
  providers: [TourService, TourTypeService, AuthService]
})
export class ManageTourListComponent implements OnInit {

  BasePaginationFilter: BasePaginationFilter<TourPaginationFilter> = new BasePaginationFilter<TourPaginationFilter>();
  TourList: TourList[] = [];
  TourTypeCombo: TourType[] = [];
  TourListBaseResponse: BaseResponse<TourList[]> = new BaseResponse<TourList[]>();
  TourTypeGuidFilter: string = "";
  constructor(private tourService: TourService,private TourTypeService: TourTypeService, private AuthService: AuthService, private PluginInitializer: PluginInitializer,private router: Router) { }

  ngOnInit() {
    this.BasePaginationFilter.PageSize = 10;
    this.BindTourListPagination();
    this.BindTourTypeFilter();
  }

  BindTourListPagination() {
    this.tourService.GetWithPagination(this.BasePaginationFilter).subscribe(response => {
      if (!response.succcess) {
        console.log(response.Message);
        return;
      }
      this.TourList = response.Data || [];
      this.TourListBaseResponse = response;
      (setTimeout(() => {
        this.PluginInitializer.initAOS(true);
      }, 100));
      console.log(this.TourList);
      console.log(response)
    }, (e) => {

    })
  }

  BindTourTypeFilter(){
    this.TourTypeService.GetAll().subscribe(response => {
      if (!response.succcess) {
        console.log(response.Message);
      }
      else{
        this.TourTypeCombo = response.Data || [];
        (setTimeout(() => {
          ($('.TourType-cmb')).niceSelect('update');
        }, 100));
      }
    })
  }
  tourTypeFilterChange(Guid: string) {
    this.TourTypeGuidFilter = Guid;
  }
  ChangePageNumberAndReBind(pageNumber: number) {
    this.BasePaginationFilter.PageNumber = pageNumber;
    this.BindTourListPagination();
  }

  OpenEditForm(tour: TourList){
    this.router.navigate(['/admin/ManageTours/InsUp/2'], {
      state: { tour: tour }
    });
  }
  OpenInsertForm(){
    this.router.navigate(['/admin/ManageTours/InsUp/1'], {
      state: { tour: new TourList() }
    });
  }

  onPageChange(page: number) {
    this.BasePaginationFilter.PageNumber = page;
    this.BindTourListPagination();
  }


  protected readonly Array = Array;
}
