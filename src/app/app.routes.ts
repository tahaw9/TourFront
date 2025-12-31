import {Routes} from '@angular/router';
import {MyComponentComponent} from './my-component/my-component.component';
import {AboutUsComponent} from './AboutUs/AboutUs.component';
import {TourListComponent} from './tour-list/tour-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TourDetailsComponent} from './tour-details/tour-details.component';
import {DashboardComponent} from './management/dashboard/dashboard.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {AdminLayoutComponent} from './management/admin-layout/admin-layout.component';
import {ManageTourListComponent} from './management/manage-tour-list/manage-tour-list.component';
import {ManageTourInsUpComponent} from './management/manage-tour-list/manage-tour-insUp/manage-tour-insUp.component';
import {ManageLocationListComponent} from './management/manage-location-list/manage-location-list.component';
import {LoginComponent} from './auth/login/login.component';
import {ManageRoleListComponent} from './management/manage-role-list/manage-role-list.component';
import ManageTourInfoListComponent from './management/manage-tour-info-list/manage-tour-info-list';
export const routes: Routes = [
  {path: 'login', component: LoginComponent },
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
      { path: 'ManageLocations', component: ManageLocationListComponent },
      { path: 'ManageTours', component: ManageTourListComponent },
      { path: 'ManageTourInfos', component: ManageTourInfoListComponent },
      { path: 'ManageRoles', component: ManageRoleListComponent },
      { path: 'ManageTours/InsUp/:PageType', component: ManageTourInsUpComponent }
      // { path: 'users', component: AdminUsersComponent }, // /admin/users
      // بقیه routeهای پنل ادمین اینجا
    ]
  },
  { path: '**', redirectTo: '' }
];
