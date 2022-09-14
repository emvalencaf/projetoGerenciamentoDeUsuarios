export class Fetch {

    static get(url, params = {}) {

        return Fetch.request('GET', url, params)
        
    }

    static delete(url, params = {}) {

        return Fetch.request('DELETE', url, params)
        
    }

    static put(url, params = {}) {

        return Fetch.request('PUT', url, params)
        
    }

    static post(url, params = {}) {

        return Fetch.request('POST', url, params)
        
    }

    static request(method, url, params = {}) {


        return new Promise((resolve, reject) => {

            let request

            switch(method.toLowerCase()){
                case 'get':
                    request = url
                    break
                default:
                    request = new Request(url, {
                        method,
                        body: JSON.stringify(params),
                        headers: new Headers({
                            'Content-Type':"application/json"
                        })
                    })
                    break
            }


            fetch(request)
                .then(response =>{

                    response.json()
                        .then(json =>{

                            resolve(json)

                        })
                        .catch(e =>{
                            reject(e)
                        })

                })
                .catch(e => {
                    reject(e)
                })

            let ajax = new XMLHttpRequest()

            ajax.open(method.toUpperCase(), url)

            ajax.onerror = event => {

                reject(e)

            };
    
            ajax.onload = event => {
    
                let obj = {}
    
                try {
    
                    obj = JSON.parse(ajax.responseText)
    
                } catch (e) {
    
                    reject(e)
                    console.error(e)
    
                }

                resolve(obj)
    
            }

            ajax.setRequestHeader('Content-Type', 'application/json')

            ajax.send(JSON.stringify(params))

        })

    }

}