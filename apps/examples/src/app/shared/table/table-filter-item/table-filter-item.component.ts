import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table-filter-item',
  templateUrl: './table-filter-item.component.html',
  styleUrls: ['./table-filter-item.component.scss']
})
export class TableFilterItemComponent {
  @Input() name: string;
  @ContentChild(TemplateRef) template: TemplateRef<any>
}
