import {inject} from 'aurelia-framework';
import {GetNavigation} from '../../Services/NavigationServices/GetNavigation';

@inject(GetNavigation)
export class Navigation
{
    constructor(getNavigation)
	{
        this.getNavigation = getNavigation;
    }

    attached()
	{
		return this.navigationItems;
    }
}