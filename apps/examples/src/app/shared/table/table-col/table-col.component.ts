import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table-col',
  templateUrl: './table-col.component.html',
  styleUrls: ['./table-col.component.scss']
})
export class TableColComponent {
  @Input() displayName: string;
  @Input() name: string;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
}
