import {inject} from 'aurelia-framework';
import {DataAccess} from '../../../Services/DataAccess/DataAccess';
import APIRoutes from '../../../Services/DataAccess/APIRoutes';

@inject(DataAccess)
export class Signin
{
    constructor(dataAccess)
    {
        this.dataAccess = dataAccess;
        this.user = {userName: '', password: ''};
        this.returnUrl = '/site/index.html';
    }

    canActivate(params)
    {
        //TODO: Look for a better way to redirect to default signed in page to avoid view from rendering creating a flash
        if (localStorage.Auth)// if user is logged in redirect to logged in landing page
        {
            this.redirect();
            return;
        }

        //TODO: set return url if there is any in the params

    }

    redirect()
    {
        window.location = this.returnUrl;
    }

    signIn()
    {
        let onSuccess = (data) =>
        {
            localStorage.Auth = JSON.stringify(data);
            this.redirect();
        };

        this.dataAccess.post(APIRoutes.LOGIN, this.user, onSuccess);
    }
}

