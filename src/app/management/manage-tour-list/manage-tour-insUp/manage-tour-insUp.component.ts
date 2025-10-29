import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TourList} from '../../../Models/Tour/TourList';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TourType} from '../../../Models/TourType/TourType';
import {TourService} from '../../../services/TourService';
import {TourTypeService} from '../../../services/TourTypeService';
import {HttpClientModule} from '@angular/common/http';
import {DatepickerDirective} from '../../../directives/datepicker.directive';
import {TourInsUp} from '../../../Models/Tour/TourInsUp';
import {FileUrlPipe} from '../../../pipes/FileUrlPipe';
import {LocationSearchResultCmb} from '../../../Models/Location/LocationSearchResultCmb';
import {catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, tap} from 'rxjs';
import {filter} from 'rxjs/operators';
import {LocationService} from '../../../services/LocationService';

@Component({
  selector: 'app-manage-tour-insUp',
  templateUrl: './manage-tour-insUp.component.html',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    DatepickerDirective,
    FormsModule,
    FileUrlPipe
  ],
  styleUrls: ['./manage-tour-insUp.component.css'],
  providers: [TourTypeService, LocationService]
})
export class ManageTourInsUpComponent implements OnInit {

  incomingTour: TourList = new TourList();
  insertTourModel: TourInsUp = new TourInsUp();
  PageType : number = 0;
  TourTypeSelect: TourType[] = [];

  destinationSearchControl: FormControl = new FormControl('');
  destinationSearchResult: LocationSearchResultCmb[] | null = [];
  destinationSearchOnBind: boolean = false;

  originSearchControl: FormControl = new FormControl('');
  originSearchResult: LocationSearchResultCmb[] | null = [];
  originSearchOnBind: boolean = false;
  @ViewChild('dp1') dp1!: DatepickerDirective;

  constructor(private route: ActivatedRoute, private  TourTypeService: TourTypeService, private LocationService: LocationService) {
    this.BindTourTypeFilter();
  }

  ngOnInit() {
    this.PageType = parseInt(this.route.snapshot.paramMap.get('PageType') ?? "0");
    this.incomingTour = history.state.tour;
    console.log(this.incomingTour);

    this.originSearchControl.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      filter(v => v && v.length >= 2),
      tap(() => { this.originSearchOnBind = true;}),
      switchMap(v => this.LocationService.SearchLocationsByName(v).pipe(
        catchError(err => { this.originSearchResult = []; this.insertTourModel.OriginGuid = ""; return []; })
      )),
      finalize(() => this.originSearchOnBind = false)
    ).subscribe(results => this.originSearchResult = results.Data);


    this.destinationSearchControl.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      filter(v => v && v.length >= 2),
      tap(() => { this.destinationSearchOnBind = true;}),
      switchMap(v => this.LocationService.SearchLocationsByName(v).pipe(
        catchError(err => { this.destinationSearchResult = []; this.insertTourModel.DestinationGuid = ""; return []; })
      )),
      finalize(() => this.destinationSearchOnBind = false)
    ).subscribe(results => this.destinationSearchResult = results.Data);




  }
  ngOnChanges() {
    (setTimeout(() => {
      ($('.TourType-cmb, .TourDifficulty-cmb')).niceSelect('update');
    }, 100));
  }

  SearchOriginLocationByName(item : FormControl){
    if(item.value.length >= 2){
      this.originSearchOnBind = true
      this.LocationService.SearchLocationsByName(item.value).subscribe(results => {
        this.originSearchOnBind = false
        if(results.Data != null && results.Data.length > 0){
          this.originSearchResult = results.Data;
        }
        else{
          this.originSearchResult = []; this.insertTourModel.OriginGuid = "";

        }
      }, (e) =>{
        this.originSearchResult = []; this.insertTourModel.OriginGuid = "";
        this.originSearchOnBind = false
      })
    }
  }
  SearchDestLocationByName(item : FormControl){
    if(item.value.length >= 2){
      this.destinationSearchOnBind = true
      this.LocationService.SearchLocationsByName(item.value).subscribe(results => {
        this.destinationSearchOnBind = false
        if(results.Data != null && results.Data.length > 0){
          this.destinationSearchResult = results.Data
        }
        else{
          this.destinationSearchResult = []; this.insertTourModel.DestinationGuid = "";


        }
      }, (e) => {
        this.destinationSearchResult = []; this.insertTourModel.DestinationGuid = "";
        this.destinationSearchOnBind = false

      })
    }
  }

  BindTourTypeFilter(){
    this.TourTypeService.GetAll().subscribe(response => {
      if (!response.succcess) {
        console.log(response.Message);
      }
      else{
        this.TourTypeSelect = response.Data || [];
        (setTimeout(() => {
          ($('.TourType-cmb')).niceSelect('update');
        }, 100));
      }
    })
  }

  tourTypeSelectChange(Guid: string) {
    this.incomingTour.TourTypeGuid = Guid;
  }

  readDate() {
    if (!this.dp1) {
      console.warn('Datepicker instance not found!');
    }

    const selectedDate = this.dp1.getDate();
    console.log('تاریخ انتخاب شده:', selectedDate);
  }


  titleFileError: string | null = null;
  onTitleFileChange(event: any): void {
    const file: File = event.target.files[0];
    this.titleFileError = null;

    if (!file) {
      this.insertTourModel.TitleFile = null;
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.titleFileError = 'فرمت فایل فقط باید JPG یا PNG یا WEBP باشد.';
      this.insertTourModel.TitleFile = null;
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      this.titleFileError = 'حجم فایل نباید بیشتر از 5 مگابایت باشد.';
      this.insertTourModel.TitleFile = null;
      return;
    }

    this.insertTourModel.TitleFile = file;
  }
}
