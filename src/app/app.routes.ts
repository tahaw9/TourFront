import {Routes} from '@angular/router';
import {MyComponentComponent} from './my-component/my-component.component';
import {AboutUsComponent} from './AboutUs/AboutUs.component';
import {TourListComponent} from './tour-list/tour-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TourDetailsComponent} from './tour-details/tour-details.component';

export const routes: Routes = [
  {path: "", component: MyComponentComponent},
  {path: "AboutUs", component: AboutUsComponent},
  {path: "TourList", component: TourListComponent},
  {path: "404", component: NotFoundComponent},
  {path: "TourDetails", component: TourDetailsComponent}

];
