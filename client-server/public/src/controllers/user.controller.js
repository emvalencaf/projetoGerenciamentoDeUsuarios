import { UserModel } from "../models/user.model.js"
import { Utils } from "../utils/utis.dateform.js"
import { HttpRequest } from "../utils/utis.httprequest.js"

export class UserController{

    constructor(formId, formIdUpdate, tableId){

        this.formEl = document.getElementById(formId)
        this.formUpdateEl = document.getElementById(formIdUpdate)
        this.tableEl = document.getElementById(tableId)

        this.onSubmit()
        this.onEdit()
        this.selectAll()
    }
    
    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e =>{
            this.showPanelCreate()
        })

        this.formUpdateEl.addEventListener("submit", evt =>{

            evt.preventDefault()

            let btn = this.formUpdateEl.querySelector("[type='submit'")

            btn.disabled = true

            let values = this.getValues(this.formUpdateEl)
            
            values = JSON.parse(UserModel.userStringify(values))

            let index = this.formUpdateEl.dataset.trIndex

            let tr = this.tableEl.rows[index]

            let userOld = JSON.parse(tr.dataset.user)

            let result = Object.assign({}, userOld, values)
            /*
            const {name, gender, birth, country, email, password, photo, admin, registerAt, id} = result

            result = new UserModel(name,
                gender,
                birth,
                country,
                email,
                password,
                photo,
                admin,
                registerAt)
            
            console.log(result)*/
            this.getPhoto(this.formUpdateEl)
            .then(content =>{
            
                if(!values.photo) {
                    result.photo = userOld.photo
                } else {
                    result.photo = content
                }

                let user = new UserModel()

                user.loadFromJSON(result)

                user.save().then(user => {

                    tr = this.getTr(user, tr)
    
                    this.updateCount()
    
                    this.formUpdateEl.reset()
    
                    this.showPanelCreate()
    
                    btn.disabled = false

                })

            })
            .catch(e => console.log(e))


            
            this.updateCount()

            btn.disabled = false

            this.showPanelCreate()
        })

    }

    onSubmit(){
        
        this.formEl.addEventListener("submit", e => {
            
            e.preventDefault()

            const btn = this.formEl.querySelector('[type=submit]')

            btn.disabled = true
            
            let values = this.getValues(this.formEl)
            
            if(!values) return

            this.getPhoto(this.formEl)
                .then(content =>{
                    
                    values.photo = content
                    console.log(values)
                    values.save().then(user =>{
                        
                        this.addLine(user)
    
                        this.formEl.reset()
    
                        btn.disabled = false
                        
                    })

                })
                .catch(e => console.log(e))
        })
        
    }

    getPhoto(formEl){

        return new Promise( (resolve, reject) => {

            let fileReader = new FileReader()
    
            let elements = [...formEl.elements].filter( element => element.name === "photo")
    
            const file = elements[0].files[0]

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

    getValues(formEl){

        let user = {}
        let isValid = true

        const elements = [...formEl.elements]

        elements.forEach( field => {

            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add("has-error")
                return isValid = false
            }
            
            if (field.name === "gender") {
    
                if (field.checked) {
                    user[field.name] = field.value
                }
    
            } else if(field.name == "admin") {

                user[field.name] = field.checked;

            } else {
    
                user[field.name] = field.value
    
            }
    
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

    selectAll(){
        
        UserModel.getUsersDb()
            .then(data => {

                data.users.forEach(dataUser => {

                    let user = new UserModel()

                    user.loadFromJSON(dataUser)

                    this.addLine(user)

                    console.log(user)

                })

            })

    }

    getTr(dataUser, tr = null){

        if(!tr) tr = document.createElement('tr')

        console.log(tr)

        tr.dataset.user = JSON.stringify(dataUser.toJSON(false))

        tr.innerHTML = `
        <td>
            <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm">
        </td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin? 'Sim':'Não'}</td>
        <td>${Utils.dateFormat(dataUser.registerAt)}</td>
        <td>
            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
        </td>
        `

        this.addEventsTr(tr) 

        return tr
    }

    addLine(dataUser){

        const tr = this.getTr(dataUser)

        this.tableEl.appendChild(tr)
        
        this.updateCount()
    }

    addEventsTr(tr){

        tr.querySelector(".btn-delete").addEventListener("click", e =>{

            if(!confirm("Deseja realmente excluir?")) return

            let user = new UserModel()

            user.loadFromJSON(JSON.parse(tr.dataset.user))

            user.remove().then(data =>{

                tr.remove()
    
                this.updateCount()
            
            })
        
        })

        tr.querySelector(".btn-edit").addEventListener("click", e =>{
            console.log("botão de editar")

            let json = JSON.parse(tr.dataset.user)
            console.log(json)
            for(let prop in json){
                let field = this.formUpdateEl.querySelector(`[name="${prop}"]`)

                this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex

                if(field) switch(field.type){

                    case 'file':
                        continue
                        break
                    case 'radio':
                        field = document.querySelector(`[value="${json[prop]}"]`)
                        field.checked = true
                        break
                    case 'checkbox':
                        field.checked = json[prop]
                        break
                    default:
                        field.value = json[prop]
                }
                /*
                let field = this.formUpdateEl.querySelector(`[name="${prop}"]`)

                this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex

                if(!field) break

                switch(field.type){
                    case 'file':
                        continue
                        break
                    case 'radio':
                        field = document.querySelector(`[name="${prop}"][value="${json[prop]}"]`)
                        field.checked = true
                        console.log(field)
                        break
                    case 'checkbox':
                        field.checked = json[prop]
                        break
                    default:
                        field.value = json[prop]
                }*/
            }

            this.formUpdateEl.querySelector(".photo").src = json.photo

            this.showPanelUpdate()
        })
    }

    showPanelCreate(){
        document.querySelector("#box-user-create").style.display = "block"
        document.querySelector("#box-user-update").style.display = "none"
    }

    showPanelUpdate(){
        document.querySelector("#box-user-create").style.display = "none"
        document.querySelector("#box-user-update").style.display = "block"
    }

    updateCount(){

        let numberUsers = 0
        let numberAdmins = 0

        
        Array.from(this.tableEl.children).forEach(tr => {
            numberUsers ++

            const user = JSON.parse(tr.dataset.user)

            if(user.admin) numberAdmins++

        })

        document.querySelector("#number-users").innerHTML = numberUsers
        document.querySelector("#number-users-admin").innerHTML = numberAdmins
    }
}