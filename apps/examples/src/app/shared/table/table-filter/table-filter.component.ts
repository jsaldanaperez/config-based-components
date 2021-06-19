import { Component, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TableFilterItemComponent } from '../table-filter-item/table-filter-item.component';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent {
  @Input() filterItems: QueryList<TableFilterItemComponent>;
  @Input() criteria: any;
  @Output() criteriaChange = new EventEmitter();
  @Output() reset = new EventEmitter();
  formGroup: FormGroup;
  subscription: Subscription;
  lastValue: string;
  resetFilter = () => this.reset.next();

  onChange = () => {
    const currentValue = JSON.stringify(this.criteria);
    if(this.lastValue !== currentValue){
      this.lastValue = currentValue;
      this.criteriaChange.next(this.criteria);
    }
  }
}
