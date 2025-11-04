import {Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TourList} from '../../../Models/Tour/TourList';
import {FormControl, FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {TourType} from '../../../Models/TourType/TourType';
import {TourTypeService} from '../../../services/TourTypeService';
import {HttpClientModule} from '@angular/common/http';
import {DatepickerDirective} from '../../../directives/datepicker.directive';
import {TourInsUp} from '../../../Models/Tour/TourInsUp';
import {FileUrlPipe} from '../../../pipes/FileUrlPipe';
import {LocationSearchResultCmb} from '../../../Models/Location/LocationSearchResultCmb';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap} from 'rxjs';
import {filter} from 'rxjs/operators';
import {LocationService} from '../../../services/LocationService';
import {PersianCurrencyDirective} from '../../../directives/persian-currency-directive';
import {TransportTypeService} from '../../../services/TransportTypeService';
import {TransportType} from '../../../Models/TransportType/TransportType';
import {TourService} from '../../../services/TourService';
import {environment} from '../../../environments/environment';
import {BaseResponse} from '../../../Models/BaseResponse';

@Component({
  selector: 'app-manage-tour-insUp',
  templateUrl: './manage-tour-insUp.component.html',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    // DatepickerDirective,
    FormsModule,
    PersianCurrencyDirective,
  ],
  styleUrls: ['./manage-tour-insUp.component.css'],
  providers: [TourTypeService, LocationService, TransportTypeService, TourService, FileUrlPipe]
})
export class ManageTourInsUpComponent implements OnInit {

  incomingTour: TourList = new TourList();
  insertTourModel: TourInsUp = new TourInsUp();
  PageType : number = 0;
  TourTypeSelect: TourType[] = [];
  TransportTypeSelect: TransportType[] = [];

  destinationSearchControl: FormControl = new FormControl('');
  destinationSearchResult: LocationSearchResultCmb[] | null = [];
  destinationSearchOnBind: boolean = false;

  originSearchControl: FormControl = new FormControl('');
  originSearchResult: LocationSearchResultCmb[] | null = [];
  originSearchOnBind: boolean = false;
  @ViewChild('dp1') dp1!: DatepickerDirective;

  constructor(private route: ActivatedRoute,private router: Router,private el: ElementRef,private renderer: Renderer2
              ,private  TourService: TourService,private FileUrlPipe: FileUrlPipe, private  TourTypeService: TourTypeService, private LocationService: LocationService, private TransportTypeService: TransportTypeService) {
    this.BindTourTypeFilter();
    this.BindTransportTypeFilter();
  }

  ngOnInit() {
    this.PageType = parseInt(this.route.snapshot.paramMap.get('PageType') ?? "0");
    if(this.PageType == 2){
      this.incomingTour = history.state.tour;
      Object.keys(this.insertTourModel).forEach((key) => {
        const k = key as keyof TourInsUp;

        if (k in this.incomingTour) {
          (this.insertTourModel as any)[k] = (this.incomingTour as any)[k];
        }
      });
      if(this.insertTourModel.OriginGuid != null && this.insertTourModel.OriginGuid != ""){
        this.BindLocation(this.insertTourModel.OriginGuid, true, false);
      }
      if(this.insertTourModel.DestinationGuid != null && this.insertTourModel.DestinationGuid != ""){
        this.BindLocation(this.insertTourModel.DestinationGuid, false, true);
      }
    }

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
      ($('.TourType-cmb, .TransportType-cmb, .TourStatus-cmb')).niceSelect('update');
      this.importClickEvent();
    }, 100));
  }

  importClickEvent() {
    const lis1 = this.el.nativeElement.querySelectorAll('div.TransportType-cmb ul li');
    const lis2 = this.el.nativeElement.querySelectorAll('div.TourType-cmb ul li');
    lis1.forEach((li: HTMLElement) => {
      this.renderer.listen(li, 'click', () => {
        const dataValue = li.getAttribute('data-value');
        this.transportTypeSelectChange(dataValue ?? "");
      });
    });
    lis2.forEach((li: HTMLElement) => {
      this.renderer.listen(li, 'click', () => {
        const dataValue = li.getAttribute('data-value');
        this.tourTypeSelectChange(dataValue ?? "");
      });
    });
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
          this.importClickEvent();
        }, 100));
      }
    })
  }

  BindTransportTypeFilter(){
    this.TransportTypeService.GetAll().subscribe(response => {
      if (!response.succcess) {
        console.log(response.Message);
      }
      else{
        this.TransportTypeSelect = response.Data || [];
        (setTimeout(() => {
          ($('.TransportType-cmb')).niceSelect('update');
          this.importClickEvent();
        }, 100));
      }
    })
  }

  tourTypeSelectChange(Guid: string) {
    this.insertTourModel.TourTypeGuid = Guid;
  }
  transportTypeSelectChange(Guid: string) {
    this.insertTourModel.TransportTypeGuid = Guid;
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
    this.insertTourModel.ImageUrl = "";
  }

  GetImageSrc() : string {
    if(this.PageType == 2 && this.insertTourModel.ImageUrl != "" && this.insertTourModel.ImageUrl != null){
      return environment.FilesDirectory + this.insertTourModel.ImageUrl;
    }
    else if(this.insertTourModel.TitleFile != null &&  this.insertTourModel.ImageUrl == "" ){
      return this.FileUrlPipe.transform( this.insertTourModel.TitleFile);
    }
    return "";
  }

  BindLocation(Guid: string, isOrigin:boolean = false, isDestination:boolean = false){
    this.LocationService.GetLocationByGuid(Guid).subscribe(res => {
      debugger
      let location = new LocationSearchResultCmb();
      if(res.Data){
        location.Guid = res.Data?.Guid;
        location.LocationName = res.Data?.Name ?? "";
        if(isOrigin == true){
          this.originSearchResult?.push(location);
        }
        if(isDestination == true){
          this.destinationSearchResult?.push(location);
        }
      }
    }, (e) => {
      console.log(e.error)
    })
  }

  formSubmitted: boolean = false;
  SubmitForm(form: NgForm) {
    this.formSubmitted = true;

    if (!form.valid) {
      return;
    }
    debugger
    this.TourService.InsertTour(this.insertTourModel).subscribe(response => {
      this.router.navigate(['/admin', 'ManageTours']);
    }, (e) => {
      console.log(e);
    })
  }
}
