import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TableColComponent } from './table-col/table-col.component';
import { TableConfig } from './table-config';
import { TableFilterItemComponent } from './table-filter-item/table-filter-item.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() config: TableConfig<any, any>;
  @ContentChildren(TableColComponent) cols: QueryList<TableColComponent>;
  @ContentChildren(TableFilterItemComponent) filterItems: QueryList<TableFilterItemComponent>;
  subscription: Subscription;
  criteria: any;
  records: any[];
  loading: boolean;
  constructor() { }

  ngOnInit(): void {
    this.criteria = this.config.criteria;
    this.onSearch();
  }

  onSearch(){
    this.loading = true;
    if(this.subscription){
      this.subscription.unsubscribe();
    }

    this.subscription = this.config.search(this.criteria)
    .pipe(finalize(() => this.loading = false))
    .subscribe((result) => this.records = result)
  }

}
