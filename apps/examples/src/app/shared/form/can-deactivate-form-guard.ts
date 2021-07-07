import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DialogConfirmService } from '../../core/dialog-confirm/dialog-confirm.service';
import { FormComponent } from '../form/form.component';
import { FormService } from './form.service';

@Injectable({ providedIn: 'root'})
export class CanDeactivateFormGuard implements CanDeactivate<FormComponent>{

    constructor(private formService: FormService, private dialogConfirmService: DialogConfirmService){}

    canDeactivate(): Observable<boolean> {
        
        if(this.formService.dirty){
            return this.dialogConfirmService.show({
                title: 'Unsaved changes',
                message: 'You have unsaved changes. Save them?',
                onSave: this.formService.save ?? undefined
            })
        }
        return of(true);
    }
}
