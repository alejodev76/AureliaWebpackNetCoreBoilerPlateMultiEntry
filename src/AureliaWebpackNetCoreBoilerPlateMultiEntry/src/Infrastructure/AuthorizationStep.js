import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class AuthorizationStep
{
    constructor(router)
	{
        this.router = router;
    }

    redirectToSignIn()
    {
        window.location = '/signin/index.html';
    }
    
    run(navigationInstruction, next)
	{
        //validate if user is logged in
        let authKey = localStorage.Auth;
        if (authKey === undefined)
        {
            return next.cancel(this.redirectToSignIn());
        }

        let requiredRoles = navigationInstruction.config.settings.roles;
        if (requiredRoles !== undefined)
		{
            // compare the Users roles to the required roles, if they have 1 of the roles, then grant them access
            let auth = JSON.parse(authKey);            
            for (let i = 0; i < requiredRoles.length; i++)
			{
                if (auth.Roles.indexOf(requiredRoles[i]) >= 0)
				{
					return next();
				}
            }

            // if user does not have one of the required roles then redirect them to the sign page
            return next.cancel(this.redirectToSignIn());
        }

        return next();
    }
}