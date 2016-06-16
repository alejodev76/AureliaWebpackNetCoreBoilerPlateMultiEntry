import {inject} from 'aurelia-framework';
import {DataAccess} from '../../../Services/DataAccess/DataAccess';

@inject(DataAccess)
export class List
{
    constructor(dataAccess)
	{
        this.dataAccess = dataAccess;
        this.items = [];
    }

    activate()
	{
        this.dataAccess.get();
    }
    
    
}