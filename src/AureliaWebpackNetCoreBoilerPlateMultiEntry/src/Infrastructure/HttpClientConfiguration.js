import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {SignOutCommand} from '../Services/UserServices/SignOutCommand';

@inject(HttpClient, Router, SignOutCommand)
export class HttpClientConfiguration
{
    constructor(httpClient, router, signOutCommand)
	{
        this.httpClient = httpClient;
        this.router = router;
        this.signOutCommand = signOutCommand;
    }

    configure()
	{ // setup default pipeline for http requests
        this.httpClient.configure(config =>
		{
            config
              .withBaseUrl('/api/')
              .withDefaults(
                  {
                  headers: {
                      'Accept': 'application/json',
                      'X-Requested-With': 'Fetch'
                  }
              })
              .withInterceptor({
                  request(request)
				  {
                      console.log(`Requesting ${request.method} ${request.url}`);

					  let auth = localStorage.Auth;
                      if (auth)
					  {
                          auth = JSON.parse(auth);
                          request.headers.append('Authorization', `Bearer ${auth.Token}`);
                      }

                      return request;
                  },
                  response(response)
				  {
                      debugger;
                      console.log(`Received ${response.status} ${response.url}`);
                      if (response.status === 401)
					  {
                          // security token expired, log them out and return to signin page
                          return this.signOutCommand.execute();
                      }
                      else if (response.status === 403)
					  {
                          // unauthorized
                          alert('You are unauthorized to view the data on this page');
                          return this.router.navigateToRoute('');
                      }
                      else if (response.status !== 200)
					  {
                          return response.text().then(Promise.reject.bind(Promise));
                      }

                      return response.json();
                  }
              });
        });
    }
}