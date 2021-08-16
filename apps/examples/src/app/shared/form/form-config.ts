import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class FormConfig<T> {

    private constructor(
        public controls: { [key: string]: FormControl },
        public load: (id: number) => Observable<T>, 
        public create: (value: T) => Observable<unknown>, 
        public update: (value: T) => Observable<unknown>){
        }

    static create<TRef>(config: {
        controls: { [key: string]: FormControl },
        load: (id: number) => Observable<TRef>,
        create: (value: TRef) => Observable<any>,
        update: (value: TRef) => Observable<any>,
    }): FormConfig<TRef>{
        return new FormConfig<TRef>(config.controls, config.load, config.create, config.update);
    }
}
