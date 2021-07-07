import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {
  private showSubject = new Subject<DialogConfirmConfig>();

  private confirmSubject = new Subject<boolean>();
  

  onShow = this.showSubject.asObservable();

  show(config: {
    title: string,
    message: string,
    onSave?: () => Observable<unknown>
  }): Observable<boolean>{
    
    
    this.showSubject.next({...config,
      onSave: this.onSave(config.onSave),
      onCancel: () => this.confirmSubject.next(false),
      onConfirm: () => this.confirmSubject.next(true)
    });

    return this.confirmSubject.asObservable();
  }

  private onSave(save?: () => Observable<unknown>) : (() => Observable<unknown>) | undefined{
    if(save){
      return () => save().pipe(finalize(() => this.confirmSubject.next(true)));
    }
    return undefined;
  }
}

export interface DialogConfirmConfig{
  title: string,
  message: string,
  onSave?: () => Observable<unknown> | undefined
  onCancel: () => void,
  onConfirm: () => void
}
