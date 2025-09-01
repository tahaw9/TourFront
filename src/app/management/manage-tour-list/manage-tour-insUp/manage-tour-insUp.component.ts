import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TourList} from '../../../Models/Tour/TourList';
import {ReactiveFormsModule} from '@angular/forms';
import {TourType} from '../../../Models/TourType/TourType';
import {TourService} from '../../../services/TourService';
import {TourTypeService} from '../../../services/TourTypeService';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-manage-tour-insUp',
  templateUrl: './manage-tour-insUp.component.html',
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  styleUrls: ['./manage-tour-insUp.component.css'],
  providers: [TourTypeService]
})
export class ManageTourInsUpComponent implements OnInit {

  incomingTour: TourList = new TourList();
  PageType : number = 0;
  TourTypeSelect: TourType[] = [];

  constructor(private route: ActivatedRoute, private  TourTypeService: TourTypeService) {
    this.BindTourTypeFilter();
  }

  ngOnInit() {
    this.PageType = parseInt(this.route.snapshot.paramMap.get('PageType') ?? "0");
    this.incomingTour = history.state.tour;
    console.log(this.incomingTour);

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


}
