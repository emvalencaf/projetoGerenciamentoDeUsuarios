import { UserModel } from "../models/user.model.js"
import { Utils } from "../utils/utis.dateform.js"

export class UserController{

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)

        this.onSubmit()

    }
    
    onSubmit(){
        
        this.formEl.addEventListener("submit", e => {
            
            e.preventDefault()

            const btn = this.formEl.querySelector('[type=submit]')

            btn.disabled = true
            
            let values = this.getValues()

            this.getPhoto()
                .then(content =>{
                    values.photo = content
                    this.addLine(values)

                    this.formEl.reset()

                    btn.disabled = false
                })
                .catch(e => console.log(e))
        })
        
    }

    getPhoto(){

        return new Promise( (resolve, reject) => {

            let fileReader = new FileReader()
    
            let elements = [...this.formEl.elements].filter( element => element.name === "photo")
    
            const file = elements[0].files[0]

            console.log(file)

            fileReader.onload = () => {

                resolve(fileReader.result)

            }
            
            fileReader.onerror = (e) => {

                reject(e)

            }

            if(!file) return resolve("dist/img/boxed-bg.jpg")
            
            fileReader.readAsDataURL(file)

            
        })
    }

    getValues(){

        let user = {}
        let isValid = true

        const elements = [...this.formEl.elements]

        elements.forEach( field => {

            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add("has-error")
                return isValid = false
            }

            if(field.name === "gender" && field.checked) return user[field.name] = field.value

            if(field.name === "admin") return user[field.name] = field.checked
    
            user[field.name] = field.value
    
        })
        
        if(!isValid) return

        return new UserModel(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        )
    }

    
    addLine(dataUser){

        const tr = document.createElement('tr')

        tr.innerHTML = `
            <td>
                <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
            </td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin? 'Sim':'Não'}</td>
            <td>${Utils.dateFormat(dataUser.registerAt)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
    `
        this.tableEl.appendChild(tr)
    }
}