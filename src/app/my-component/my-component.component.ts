import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { UserService } from '../services/UserService';
import { HttpClientModule } from '@angular/common/http';
import { TourTypeService } from '../services/TourTypeService';
import { TourType } from '../Models/TourType/TourType';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { QeydarDatePickerModule } from '@qeydar/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [FormsModule, QeydarDatePickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, CommonModule, HttpClientModule],
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss'],
  providers: [UserService, TourTypeService]
})
export class MyComponentComponent implements OnInit {

  boolean: boolean = false;
  TourTypes: TourType[] = [];
  numbers: number[] = [];
  SearchDate: Date = new Date();
  today = new Date();
  FullName: string = "";

  constructor(private router: Router,private UserService: UserService, private TourTypeService: TourTypeService, private cd: ChangeDetectorRef) {
    this.GetUser();
    this.GetAllTourTypes();
  }
  ngOnInit() {
  }


  GetUser() {
    this.UserService.GetUser('005f2646-b745-445d-a7b1-af1b0c6a6450').subscribe(res => {
      if (res.Data != null)
        this.FullName = res.Data?.FullName;

      (setTimeout(() => {
        ($('.bade')).niceSelect('update');
      }, 100));
    }, (e) => {

    })

  }
  GetAllTourTypes() {
    this.TourTypeService.GetAll().subscribe(res => {
      if (res.Data != null) {
        this.TourTypes = res.Data;
      }
      (setTimeout(() => {
        ($('.TourType-cmb')).niceSelect('update');
      }, 100));
    }, (e) => {

    })
  }

}
