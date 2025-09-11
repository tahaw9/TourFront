import { Component, OnInit } from '@angular/core';
import {ManagementPagingComponent} from '../management-paging/management-paging.component';
import {PersianNumberPipe} from '../../pipes/PersianNumberPipe';
import {ReactiveFormsModule} from '@angular/forms';
import {RolePaginationFilter} from '../../Models/Role/RolePaginationFilter';
import {BasePaginationFilter} from '../../Models/BasePaginationFilter';
import {BaseResponse} from '../../Models/BaseResponse';
import {RoleList} from '../../Models/Role/RoleList';

@Component({
  selector: 'app-manage-role-list',
  templateUrl: './manage-role-list.component.html',
  imports: [
    ManagementPagingComponent,
    PersianNumberPipe,
    ReactiveFormsModule
  ],
  styleUrls: ['./manage-role-list.component.scss']
})
export class ManageRoleListComponent implements OnInit {

  BasePaginationFilter: BasePaginationFilter<RolePaginationFilter> = new BasePaginationFilter<RolePaginationFilter>();
  RoleListBaseResponse: BaseResponse<RoleList[]> = new BaseResponse<RoleList[]>();


  constructor() { }

  ngOnInit() {
  }
  onPageChange(page: number) {
    this.BasePaginationFilter.PageNumber = page;
    // this.BindRoleListPagination();
  }

}
