import { Observable } from 'rxjs';
import { Criteria } from '../../models/criteria';

export class TableConfig<TCriteria extends Criteria, TType> {
    search: (criteria: TCriteria) => Observable<TType[]>;
    criteria: TCriteria;

    constructor(data: {
        criteria?: TCriteria,
        search: (criteria: TCriteria) => Observable<TType[]>,
    }){
        this.criteria = data.criteria ?? <TCriteria>{};
        this.search = data.search
    }
}
