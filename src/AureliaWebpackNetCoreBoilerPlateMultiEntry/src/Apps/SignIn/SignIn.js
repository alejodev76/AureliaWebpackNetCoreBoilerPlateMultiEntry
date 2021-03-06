import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientConfiguration} from '../../Infrastructure/HttpClientConfiguration';
import {Routes} from '../../Infrastructure/Routes';

@inject(HttpClient, EventAggregator, HttpClientConfiguration, Routes)
export class SignIn
{
    constructor(httpClient, eventAggregator, httpClientConfiguration, routes)
    {
        httpClientConfiguration.configure();

        this.httpClient = httpClient;
        this.eventAggregator = eventAggregator;
        this.routes = routes;

        this.module;
        this.page;
    }

    navigationSuccess(event) 
    {
        this.module = event.instruction.config.settings.module;
        this.page = event.instruction.config.settings.page;
    }

    attached() 
    {
        this.subscription = this.eventAggregator.subscribe('router:navigation:success', this.navigationSuccess.bind(this));
    }

    configureRouter(config, router)
    {
        config.title = 'Aurelia';

        let routes = this.routes.get('signin');
        window.Routes = {};
        for (let i = 0; i < routes.length; i++)
        {
            window.Routes[routes[i].name] = routes[i];
        }
        config.map(routes);

        this.router = router;
    }
}

