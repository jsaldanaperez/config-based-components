import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss']
})
export class FormControlErrorComponent  { 
  @Input() id: string;
  @Input() error: string;
}
