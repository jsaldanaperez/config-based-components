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
      onSave: () => {
        if(config.onSave){
          return config.onSave().pipe(finalize(() => this.confirmSubject.next(true)));
        }
        return undefined;
      },
      onCancel: () => this.confirmSubject.next(false),
      onConfirm: () => this.confirmSubject.next(true)
    });

    return this.confirmSubject.asObservable();
  }
}

export interface DialogConfirmConfig{
  title: string,
  message: string,
  onSave?: () => Observable<unknown> | undefined
  onCancel: () => void,
  onConfirm: () => void
}
