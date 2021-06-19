import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DeepCloneService } from '../deep-clone.service';
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
  originalCriteriaValue: any;
  criteria: any;
  records: any[];
  loading: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deepCloneService: DeepCloneService) { }

  ngOnInit(): void {
    this.originalCriteriaValue = this.deepCloneService.clone(this.config.criteria);
    const criteria = this.activatedRoute.snapshot.queryParamMap.get('criteria');
    if(criteria){
      this.criteria = JSON.parse(atob(criteria));
    }else{
      this.criteria = this.deepCloneService.clone(this.config.criteria);
    }
    this.search();
  }

  search(){
    this.loading = true;
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.subscription = this.config.search(this.criteria)
    .pipe(finalize(() => this.loading = false))
    .subscribe((result) => this.records = result)
  }

  onCriteriaChange(){
      this.changeUrl(btoa(JSON.stringify(this.criteria)));
      this.search();
  }

  resetFilter = () =>{
    Object.keys(this.criteria).forEach(key => {
      this.criteria[key] = this.deepCloneService.clone(this.originalCriteriaValue[key]);
    })
    this.changeUrl(undefined)
    this.search();
  }

  changeUrl(criteria?: string){
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { criteria: criteria }, 
        queryParamsHandling: 'merge',
      });
  }
}
