import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableColComponent } from './table-col/table-col.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TableFilterItemComponent } from './table-filter-item/table-filter-item.component';



@NgModule({
  declarations: [
    TableComponent,
    TableColComponent,
    TableFilterComponent,
    TableFilterItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent,
    TableColComponent,
    TableFilterItemComponent
  ]
})
export class TableModule { }
