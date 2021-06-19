import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TableFilterItemComponent } from '../table-filter-item/table-filter-item.component';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  @Input() filterItems: QueryList<TableFilterItemComponent>;
  @Input() criteria: any;
  @Output() criteriaChange = new EventEmitter();
  formGroup: FormGroup;
  subscription: Subscription;
  originalValue: any;
  lastValue: string;

  ngOnInit(){
    this.originalValue = JSON.parse(JSON.stringify(this.criteria));
  }

  onChange = () => {
    const currentValue = JSON.stringify(this.criteria);
    if(this.lastValue !== currentValue){
      this.lastValue = currentValue;
      this.criteriaChange.next(this.criteria);
    }
  }

  resetFilter = () => {
    Object.keys(this.criteria).forEach(key => {
      this.criteria[key] = this.deepCopy(this.originalValue[key]);
    })
    this.onChange();
  }

  private deepCopy(obj: any) {
    let copy: any;
    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.deepCopy(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
}
