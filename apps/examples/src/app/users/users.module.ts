import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { TableModule } from '../shared/table/table.module';
import { UserTypeLabelComponent } from './user-type-label/user-type-label.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserTypeLabelComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule
  ]
})
export class UsersModule { }
