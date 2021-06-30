import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DialogConfirmConfig, DialogConfirmService } from './dialog-confirm.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  show: boolean;
  config: DialogConfirmConfig;
  showSave: boolean;

  constructor(private dialogConfirmService: DialogConfirmService) { }

  ngOnInit(): void {
    this.dialogConfirmService.onShow.subscribe((config) => {
      this.config = config;
      this.show = true;
      this.showSave = this.config.onSave != null;
    });
  }

  onCancel(){
    this.show = false;
    this.config.onCancel();
  }

  onConfirm(){
    this.show = false;
    this.config.onConfirm();
  }

  onSave(){
    if(this.config.onSave){
      this.config.onSave()?.pipe(finalize(() => this.show = false)).subscribe();
    }
  }
}
