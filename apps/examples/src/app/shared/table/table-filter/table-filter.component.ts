import { Component, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TableFilterItemComponent } from '../table-filter-item/table-filter-item.component';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit{
  @Input() filterItems: QueryList<TableFilterItemComponent>;
  @Input() criteria: any;
  @Output() criteriaChange = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Input() originalCriteria: any;
  formGroup: FormGroup;
  subscription: Subscription;
  lastValue: string;
  usedFilterItems: number;

  ngOnInit() {
    this.updateUsedFilterItems();
  }

  onChange(){
    const currentValue = JSON.stringify(this.criteria);
    if(this.lastValue !== currentValue){
      this.lastValue = currentValue;
      this.criteriaChange.next(this.criteria);
    }
    this.updateUsedFilterItems();
  }

  resetFilter(){
    this.reset.next();
    this.updateUsedFilterItems();
  }

  private updateUsedFilterItems(): void {
    const keys = [...new Set(Object.keys(this.originalCriteria).concat(Object.keys(this.criteria)))]
    this.usedFilterItems =  keys
    .filter(key => JSON.stringify(this.originalCriteria[key]) !== JSON.stringify(this.criteria[key])).length
  }
}
