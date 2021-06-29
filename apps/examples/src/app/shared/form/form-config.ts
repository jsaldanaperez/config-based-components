import { Observable } from 'rxjs';

export class FormConfig<T> {

    private constructor(
        public value: (value: T) => void,
        public newValue: () => T,
        public load: (id: number) => Observable<T>, 
        public create: (value: T) => Observable<unknown>, 
        public update: (value: T) => Observable<unknown>,
        public validate?: (value: T) => boolean){
        }

    static create<TRef>(config: {
        value: (value: TRef) => void,
        new: () => TRef,
        load: (id: number) => Observable<TRef>,
        create: (value: TRef) => Observable<unknown>,
        update: (value: TRef) => Observable<unknown>,
        validate?: (value: TRef) => boolean
    }): FormConfig<TRef>{
        return new FormConfig<TRef>(config.value, config.new, config.load, config.create, config.update, config.validate);
    }
}
