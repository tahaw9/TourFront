import {Component, OnInit} from '@angular/core';
import {TourPaginationFilter} from '../../Models/Tour/TourPaginationFilter';
import {TourInfoPaginationFilter} from '../../Models/TourInfo/TourInfoPaginationFilter';
import {BasePaginationFilter} from '../../Models/BasePaginationFilter';
import {TourTypeService} from '../../services/TourTypeService';
import {AuthService} from '../../services/AuthService';
import {TourInfoService} from '../../services/TourInfoService';
import {TourInfoList} from '../../Models/TourInfo/TourInfoList';
import {BaseResponse} from '../../Models/BaseResponse';
import {PluginInitializer} from '../../services/plugin-initializer';
import {ManagementPagingComponent} from '../management-paging/management-paging.component';
import {PersianNumberPipe} from '../../pipes/PersianNumberPipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ShamsiDatePipe} from '../../pipes/ShamsiDatePipe';
import {BaseSelectNiceComponent} from '../../Base/base-select-nice/base-select-nice';
import {TourType} from '../../Models/TourType/TourType';
import {DatePickerComponent, Placement} from '@qeydar/datepicker';
type DateFields = 'startDateFrom' | 'startDateTo' | 'endDateFrom' | 'endDateTo';

@Component({
  selector: 'app-manage-tour-info-list',
  imports: [
    ManagementPagingComponent,
    PersianNumberPipe,
    ReactiveFormsModule,
    FormsModule,
    ShamsiDatePipe,
    BaseSelectNiceComponent,
    DatePickerComponent
  ],
  templateUrl: './manage-tour-info-list.html',
  styleUrl: './manage-tour-info-list.scss',
  providers: [TourInfoService, TourTypeService, AuthService]
})
class ManageTourInfoListComponent implements OnInit {
  BasePaginationFilter: BasePaginationFilter<TourInfoPaginationFilter> = new BasePaginationFilter<TourPaginationFilter>();
  filter: TourInfoPaginationFilter = new TourInfoPaginationFilter();
  TourInfoList: TourInfoList[] = [];
  TourInfoListBaseResponse: BaseResponse<TourInfoList[]> = new BaseResponse<TourInfoList[]>();
  BindPagingError: string = "";

  tourTypeCombo: TourType[] = [];
  transportTypeCombo: any[] = [];
  locationCombo: any[] = [];

  statusOptions = [
    { value: 0, label: 'پیش‌نویس' },
    { value: 1, label: 'منتشر شده' },
    { value: 2, label: 'تکمیل ظرفیت' }
  ];

  constructor(private tourInfoService: TourInfoService, private PluginInitializer: PluginInitializer, private router: Router) {
  }
  ngOnInit(): void {
    this.BasePaginationFilter.PageSize = 10;
    this.BindTourInfoListPagination();
    // this.BindTourTypeFilter();
  }

  SearchWithFilters() {
    this.BasePaginationFilter.Filters = this.filter;
    this.BindTourInfoListPagination();
  }



  onDateChange(field: DateFields) {
    return (value: string) => {
      debugger
      this.filter[field] = value ? new Date(value) : null;
    };
  }


  ClearFilters() {
    this.filter = new TourInfoPaginationFilter(); // Reset object
    this.BasePaginationFilter.Filters = null;
    this.SearchWithFilters(); // Reload all
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

  OpenEditForm(tourInfo: TourInfoList){
    this.router.navigate(['/admin/ManageTours/InsUp/2'], {
      state: { tourInfo: tourInfo }
    });
  }
  OpenInsertForm(){
    this.router.navigate(['/admin/ManageTours/InsUp/1'], {
      state: { tourInfo: new TourInfoList() }
    });
  }

  onPageChange(page: number) {
    this.BasePaginationFilter.PageNumber = page;
    this.BindTourInfoListPagination();
  }


  tourTypeFilterChange(Guid: string) {
    this.filter.tourTypeGuid = Guid;
  }

  protected readonly console = console;
}

export default ManageTourInfoListComponent
