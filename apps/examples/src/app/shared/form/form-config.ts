import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

export class FormConfig<T> {

    private constructor(
        public load: (id: number) => Observable<T>, 
        public create: (value: T) => Observable<unknown>, 
        public update: (value: T) => Observable<unknown>,
        public validate?: (value: NgForm) => void){
        }

    static create<TRef>(config: {
        load: (id: number) => Observable<TRef>,
        create: (value: TRef) => Observable<unknown>,
        update: (value: TRef) => Observable<unknown>,
        validate?: (form: NgForm) => void
    }): FormConfig<TRef>{
        return new FormConfig<TRef>(config.load, config.create, config.update, config.validate);
    }
}
