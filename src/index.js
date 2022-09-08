import { UserController } from "./controllers/user.controller.js"

const userController = new UserController('form-user-create', 'table-users')

console.log(userController)