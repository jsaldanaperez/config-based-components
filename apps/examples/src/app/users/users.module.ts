import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { TableModule } from '../shared/table/table.module';
import { UserTypeLabelComponent } from './user-type-label/user-type-label.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserListComponent,
    UserTypeLabelComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    FormsModule
  ]
})
export class UsersModule { }
