import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TableColComponent } from './table-col/table-col.component';
import { TableConfig } from './table-config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() config: TableConfig<any, any>;
  @ContentChildren(TableColComponent) cols: QueryList<TableColComponent>;
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
    this.config.search(this.criteria)
    .pipe(finalize(() => this.loading = false))
    .subscribe((result) => this.records = result)
  }

}
