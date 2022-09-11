export class UserModel{
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

            this[name] = json[name]

        }

        console.log(this)
    }
}