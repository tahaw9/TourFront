import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../services/LocationService';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
  providers: [LocationService]
})
export class LocationListComponent implements OnInit {

  constructor(private LocationService : LocationService) { }

  ngOnInit() {
  }

}
