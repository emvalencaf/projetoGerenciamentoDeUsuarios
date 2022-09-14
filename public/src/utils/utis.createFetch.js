export class CreateFetch{

    static handleError(response){
        if(!response.ok) throw Error(response.status + ':' + response. statusText)

        return response
    }


    static request(method, url, body = null){

        return fetch(url, {
            method,
            body,
            headers:{
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then(response => CreateFetch.handleError(response))
            .then(response => response.json())

    }
}