import {Routes} from '@angular/router';
import {MyComponentComponent} from './my-component/my-component.component';
import {AboutUsComponent} from './AboutUs/AboutUs.component';
import {TourListComponent} from './tour-list/tour-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TourDetailsComponent} from './tour-details/tour-details.component';
import {DashboardComponent} from './management/dashboard/dashboard.component';
import {App} from './app.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {AdminLayoutComponent} from './management/admin-layout/admin-layout.component';
import {LocationListComponent} from './management/location-list/location-list.component';
import {ManageTourListComponent} from './management/manage-tour-list/manage-tour-list.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MyComponentComponent },
      { path: 'AboutUs', component: AboutUsComponent },
      { path: 'TourList', component: TourListComponent },
      { path: '404', component: NotFoundComponent },
      { path: 'TourDetails', component: TourDetailsComponent },
      // سایر صفحات عمومی اینجا...
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }, // /admin
      { path: 'ManageLocations', component: LocationListComponent },
      { path: 'ManageTours', component: ManageTourListComponent }
      // { path: 'users', component: AdminUsersComponent }, // /admin/users
      // بقیه routeهای پنل ادمین اینجا
    ]
  },
  { path: '**', redirectTo: '' }
];
