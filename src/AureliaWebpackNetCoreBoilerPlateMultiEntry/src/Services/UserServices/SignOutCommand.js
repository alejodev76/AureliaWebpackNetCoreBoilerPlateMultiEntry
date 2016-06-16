import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class SignOutCommand
{
    constructor(httpClient, router)
	{
        this.httpClient = httpClient;
        this.router = router;
    }

    execute()
	{
        localStorage.AuthToken = null;
        return this.router.navigateToRoute('Users_Authentication_SignIn');
    }
}