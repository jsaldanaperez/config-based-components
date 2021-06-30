import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';



@NgModule({
  declarations: [
    DialogConfirmComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DialogConfirmComponent]
})
export class DialogConfirmModule { }
