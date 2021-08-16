import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlDirective } from './form-control.directive';
import { FormControlHolderComponent } from './form-control-holder/form-control-holder.component';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';

@NgModule({
  declarations: [
    FormComponent,
    FormControlDirective,
    FormControlHolderComponent,
    FormControlErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormComponent,
    FormControlDirective,
    FormControlHolderComponent,
    FormControlErrorComponent
  ]
})
export class FormModule { }
