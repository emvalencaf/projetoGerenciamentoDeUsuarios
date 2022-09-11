import { UserModel } from "../models/user.model.js"
import { Utils } from "../utils/utis.dateform.js"

export class UserController{

    constructor(formId, formIdUpdate, tableId){

        this.formEl = document.getElementById(formId)
        this.formUpdateEl = document.getElementById(formIdUpdate)
        this.tableEl = document.getElementById(tableId)

        this.onSubmit()
        this.onEdit()

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

            console.log(values)
            
            values = JSON.parse(this.userModelStrinfigy(values))

            let index = this.formUpdateEl.dataset.trIndex

            let tr = this.tableEl.rows[index]

            let userOld = JSON.parse(tr.dataset.user)

            let result = Object.assign({}, userOld, values)
            
            const {name, gender, birth, country, email, password, photo, admin, registerAt} = result

            result = new UserModel(name,
                gender,
                birth,
                country,
                email,
                password,
                photo,
                admin,
                registerAt)

            this.getPhoto(this.formUpdateEl)
            .then(content =>{
                
                if(!values.photo) {
                    result.photo = userOld.photo
                } else {
                    result.photo = content
                }

                tr.dataset.user = this.userModelStrinfigy(result)

                console.log(result.registerAt instanceof Date)

                tr.innerHTML = `
                <td>
                <img src="${result.photo}" alt="User Image" class="img-circle img-sm">
                </td>
                <td>${result.name}</td>
                <td>${result.email}</td>
                <td>${result.admin? 'Sim':'Não'}</td>
                <td>${Utils.dateFormat(result.registerAt)}</td>
                <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
                `

                this.addEventsTr(tr)

                this.updateCount()

                this.formUpdateEl.reset()

                this.showPanelCreate()

                btn.disabled = false
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

            console.log(values)
            
            if(!values) return

            this.getPhoto(this.formEl)
                .then(content =>{
                    values.photo = content
                    this.addLine(values)

                    this.formEl.reset()

                    btn.disabled = false
                })
                .catch(e => console.log(e))
        })
        
    }

    getPhoto(formEl){

        return new Promise( (resolve, reject) => {

            let fileReader = new FileReader()
    
            let elements = [...formEl.elements].filter( element => element.name === "photo")
    
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

    getValues(formEl){

        let user = {}
        let isValid = true

        const elements = [...formEl.elements]

        console.log(elements)

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

    
    addLine(dataUser){

        console.log(dataUser)

        const tr = document.createElement('tr')

        tr.dataset.user = this.userModelStrinfigy(dataUser)

        console.log(tr.dataset.user)

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

        this.tableEl.appendChild(tr)
        
        this.updateCount()
    }

    userModelStrinfigy(dataUser){
        return JSON.stringify({
            name: dataUser.name,
            gender: dataUser.gender,
            birth: dataUser.birth,
            country: dataUser.country,
            email: dataUser.email,
            password: dataUser.password,
            photo: dataUser.photo,
            admin: dataUser.admin,
            registerAt: dataUser.registerAt
        })
    }

    addEventsTr(tr){

        tr.querySelector(".btn-delete").addEventListener("click", e =>{

            if(!confirm("Deseja realmente excluir?")) return

            tr.remove()

            this.updateCount()

        })

        tr.querySelector(".btn-edit").addEventListener("click", e =>{
            let json = JSON.parse(tr.dataset.user)


            for(let prop in json){
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
                }
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
            console.log(user)

            if(user.admin) numberAdmins++

        })

        document.querySelector("#number-users").innerHTML = numberUsers
        document.querySelector("#number-users-admin").innerHTML = numberAdmins
    }
}