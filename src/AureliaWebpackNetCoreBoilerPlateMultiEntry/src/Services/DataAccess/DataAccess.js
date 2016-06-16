import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

/**
 * The class that facilitates API calls with ease
 */
@inject(HttpClient)
export class DataAccess
{
    //static httpClient  = new HttpClient();

    constructor(httpClient)
    {
        this.httpClient = httpClient;
        
    }

    post(url, object, onSuccess, onError)
    {
        let body = {method: 'post', body: json(object)};
        _execute(this.httpClient, url, body, onSuccess, onError);
    }

    get(url, onSuccess, onError)
    {
        let body = {method: 'get'};
        _execute(this.httpClient, url, body, onSuccess, onError);
    }

    delete()
    {

    }

    put()
    {

    }
}

// Private helper method to make the http call
const _execute = function(httpClient, url, body, onSuccess, onError)
{
    if (onSuccess === undefined)
    {
        onSuccess = function(data)
        {
            console.log(`No success method defined. ${data}`);
        };
    }

    if (onError === undefined)
    {
        onError = function(error)
        {
            console.error(`ERROR: ${error}`);
        };
    }

    let result = httpClient.fetch(url, body)
        .then(onSuccess)
        .catch(onError);

    return result;
};