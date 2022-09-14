import { UserController } from "./controllers/user.controller.js"

const userController = new UserController('form-user-create', 'form-user-update', 'table-users')

console.log(userController)