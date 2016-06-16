export class Routes
{
    routes ={
        site:
            [
                {
                    route: ['', 'Apps/Site/IISServers/List'],
                    name: 'Site_IISServers_List',
                    moduleId: './IISServers/List',
                    title: 'IIS Servers',
                    settings: { roles: ['Admin'], module: 'iisservers', page: 'list' }
                }
            ],
        signin:
            [
                {
                    route: ['', 'Apps/SignIn/Authentication/SignIn'],
                    name: 'Users_Authentication_SignIn',
                    moduleId: './Authentication/SignIn',
                    title: 'Sign In',
                    settings: { module: 'authentication', page: 'signin' }
                }
            ]
    }

    get(routeKey)
    {
        let routes = this.routes[routeKey];
        if (routes === undefined)
        {
            throw new Error(`No routes defined for application ${routeKey}`);
        }

        return routes;
    }
}