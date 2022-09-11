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

        !registerAt? this.#_registerAt = new Date() : this.#_registerAt = Date.parse(registerAt)
    }

    get name(){
        return this.#_name
    }

    get gender(){
        return this.#_gender
    }

    get birth(){
        return this.#_birth
    }

    get country(){
        return this.#_country
    }

    get email(){
        return this.#_email
    }

    get password(){
        return this.#_password
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

    get registerAt(){
        return this.#_registerAt
    }
}