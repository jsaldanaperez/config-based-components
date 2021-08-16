import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableColComponent } from './table-col/table-col.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TableFilterItemComponent } from './table-filter-item/table-filter-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent,
    TableColComponent,
    TableFilterComponent,
    TableFilterItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    TableComponent,
    TableColComponent,
    TableFilterItemComponent
  ]
})
export class TableModule { }
