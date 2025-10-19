import { Component, OnInit } from '@angular/core';
import {ManagementPagingComponent} from '../management-paging/management-paging.component';
import {PersianNumberPipe} from '../../pipes/PersianNumberPipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RolePaginationFilter} from '../../Models/Role/RolePaginationFilter';
import {BasePaginationFilter} from '../../Models/BasePaginationFilter';
import {BaseResponse} from '../../Models/BaseResponse';
import {RoleList} from '../../Models/Role/RoleList';
import {RoleService} from '../../services/RoleService';
import {PluginInitializer} from '../../services/plugin-initializer';
import {LocationPaginationFilter} from '../../Models/Location/LocationPaginationFilter';

@Component({
  selector: 'app-manage-role-list',
  templateUrl: './manage-role-list.component.html',
  imports: [
    ManagementPagingComponent,
    PersianNumberPipe,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./manage-role-list.component.scss'],
  providers: [RoleService]
})
export class ManageRoleListComponent implements OnInit {

  BasePaginationFilter: BasePaginationFilter<RolePaginationFilter> = new BasePaginationFilter<RolePaginationFilter>();
  RoleListBaseResponse: BaseResponse<RoleList[]> = new BaseResponse<RoleList[]>();
  roleList: RoleList[] = [];
  RoleNameFilter: string = "";
  RoleCodeFilter: number|null = null;


  constructor(private roleService: RoleService, private PluginInitializer: PluginInitializer) { }

  ngOnInit() {
    this.BasePaginationFilter.PageSize = 10;
    this.BindRoleListPagination();
  }
  onPageChange(page: number) {
    this.BasePaginationFilter.PageNumber = page;
    this.BindRoleListPagination();
  }
  SearchWithFilters() {
    this.BasePaginationFilter.Filters = new RolePaginationFilter();
    if(this.RoleNameFilter != "" && this.RoleNameFilter != null) {
      this.BasePaginationFilter.Filters.Name = this.RoleNameFilter;
    }
    if(this.RoleCodeFilter != null && this.RoleCodeFilter != 0) {
      this.BasePaginationFilter.Filters.RoleCode = this.RoleCodeFilter;
    }
    this.BindRoleListPagination();
  }

  BindRoleListPagination() {
    this.roleService.GetWithPagination(this.BasePaginationFilter).subscribe(response => {
      if (!response.succcess) {
        console.log(response.Message);
        return;
      }
      this.roleList = response.Data || [];
      this.RoleListBaseResponse = response;
      (setTimeout(() => {
        this.PluginInitializer.initAOS(true);
      }, 100));
    }, (e) => {

    })
  }

}
