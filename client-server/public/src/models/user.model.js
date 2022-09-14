import { CreateFetch } from "../utils/utis.createFetch.js"
import { HttpRequest } from "../utils/utis.httprequest.js"

export class UserModel{

    #_id
    #_name
    #_gender
    #_birth
    #_country
    #_email
    #_password
    #_photo
    #_admin
    #_registerAt

    constructor(name, gender, birth, country, email, password, photo, admin, registerAt){

        this.#_id
        this.#_name = name
        this.#_gender = gender
        this.#_birth = birth
        this.#_country = country
        this.#_email = email
        this.#_password = password
        this.#_photo = photo
        this.#_admin = admin

        !registerAt? this.#_registerAt = new Date() : this.#_registerAt = new Date(registerAt)
    }

    get id(){
        return this.#_id
    }

    set id(value){
        return this.#_id = value
    }

    get name(){
        return this.#_name
    }

    set name(value){
        return this.#_name = value
    }

    get gender(){
        return this.#_gender
    }
    
    set gender(value){
        return this.#_gender = value
    }

    get birth(){
        return this.#_birth
    }

    set birth(value){
        return this.#_birth = value
    }

    get country(){
        return this.#_country
    }

    set country(value){
        return this.#_country = value
    }

    get email(){
        return this.#_email
    }

    set email(value){
        return this.#_email = value
    }

    get password(){
        return this.#_password
    }

    set password(value){
        return this.#_password = value
    }

    get photo(){
        return this.#_photo
    }

    set photo(photo){
        this.#_photo = photo
    }

    get admin(){
        return this.#_admin
    }

    set admin(value){
        return this.#_admin = value
    }

    get registerAt(){
        return this.#_registerAt
    }

    set registerAt(value){

        if(value instanceof Date) return this.#_registerAt = value

        return this.#_registerAt = new Date(value)
    }

    loadFromJSON(json){

        for(let name in json){

            this[name.replace("_","")] = json[name]

        }

        console.log(json)
    }

    static listGettersAndSetters(instance){
        return Object.entries(Object.getOwnPropertyDescriptors(Reflect.getPrototypeOf(instance)))
            .filter( e => typeof e[1].get === 'function' && e[0] !== '__proto__')
            .map(e => e[0])
    }

    toJSON(db = true){

        let json = {}

        UserModel.listGettersAndSetters(this).forEach(getter =>{

            if(this[getter] !== undefined) {

                let prop

                getter === "id" && db? prop = "_id": prop = getter

                json[prop] = this[getter]
            }

        })

        return json
    }

    static userStringify(data){

        if(data instanceof Array){
            /*
            let newArr = []
            data.forEach(user => {
                let gettersAndSetters = UserModel.listGettersAndSetters(user)

                let obj = {}

                gettersAndSetters.forEach(getter => {
                    obj[getter] = user[getter]
                })

                newArr.push(obj)
            })*/
            
            data.forEach(user =>{
                let obj = {
                    
                    id: user.id,
                    name: user.name,
                    gender: user.gender,
                    birth: user.birth,
                    country: user.country,
                    email: user.email,
                    password: user.password,
                    photo: user.photo,
                    admin: user.admin,
                    registerAt: user.registerAt
                
                }

                newArr.push(obj)
            })

            return JSON.stringify(newArr)
        }

        return JSON.stringify({
            id: data.id,
            name: data.name,
            gender: data.gender,
            birth: data.birth,
            country: data.country,
            email: data.email,
            password: data.password,
            photo: data.photo,
            admin: data.admin,
            registerAt: data.registerAt
        })
    }

    static getUsersDb(){
        return CreateFetch.request('GET','/users')
    }


    save(){

        return new Promise((resolve, reject) => {

            let promise

            if(this.id){
                
                promise = HttpRequest.put(`/users/${this.id}`, this.toJSON())
    
            } else {
    
                promise = HttpRequest.post('/users', this.toJSON())
                
            }

            console.log(promise)
            
            promise.then(data => {
    
                this.loadFromJSON(data)
                
                resolve(this)

                }).catch(e => {

                    reject(e)

                })

        })
    }

    remove(){

        return HttpRequest.delete(`/users/${this.id}`)
    }
}