import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class GetNavigation 
{
    constructor(httpClient)
	{
        this.httpClient = httpClient;
    }

    get()
	{
		let getJson = response =>
		{
			return response.json();
		};

		let error = errorMessage =>
		{
			alert(errorMessage);
		};

        let result = this.httpClient
            .fetch('Components/Navigation/GetNavigation',
            {
                method: 'get'
            })
            .then(getJson)
            .catch(error);

		return result;
    }
}