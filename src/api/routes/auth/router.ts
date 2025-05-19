import express from "express"
import { registerCustomer } from "./customer/controllers/register"
import { loginCustomer } from "./customer/controllers/login"
import { loginadmin } from "./admin/controllers/login"
import { registerAdmin } from "./admin/controllers/register" // New
import { getAllAdmins } from "./admin/controllers/getAllAdmins" // New
import { getOneAdmin } from "./admin/controllers/getOneAdmin"   // New
import { updateAdmin } from "./admin/controllers/updateAdmin"   // New
import { deleteAdmin } from "./admin/controllers/deleteAdmin"   // New
// changeAdminPassword import removed
import { registerDeliveryMan } from "./delivery/controllers/register"
import { loginDeliveryMan } from "./delivery/controllers/login"
import { getAllcustomers } from "./customer/controllers/all-customer"
import { getOneCustomer } from "./customer/controllers/one-customer"
import { getAllDeliveryMans } from "./delivery/controllers/all-DeliveryMans"
import { getOneDeliveryMan } from "./delivery/controllers/one-DeliveryMan"
import { updateCustomer } from "./customer/controllers/update-cutomer"
import { deleteCustomer } from "./customer/controllers/delete-customer"
import { updateDeliveryMan } from "./delivery/controllers/update-DeliveryMan"
import { deleteDeliveryMan } from "./delivery/controllers/delete-DeliveryMan"
import { sendEmail } from "./customer/controllers/forgotPassword"
import { resetPassword } from "./customer/controllers/resetPassword"
import { changePassword} from "./customer/controllers/update-password"
import { signOut } from "./customer/controllers/LogoutCustomer"
import { signOutDeliveryMan } from "./delivery/controllers/signOutDeliveryMan"
import { getOrdersCount, getOrdersSummary } from './delivery/controllers/statics-DeliveryMan';
const UsersRouter = express.Router()

UsersRouter.post("/auth/register", registerCustomer)
UsersRouter.post("/auth/registerDeliveryMan", registerDeliveryMan)
UsersRouter.post("/auth/login",loginCustomer)
UsersRouter.post("/auth/loginAdmin",loginadmin)

// Admin Management Routes
UsersRouter.post("/auth/admins", registerAdmin);       // Create a new admin
UsersRouter.get("/auth/admins", getAllAdmins);         // Get all admins
UsersRouter.get("/auth/admins/:id", getOneAdmin);      // Get a single admin by ID
UsersRouter.put("/auth/admins/:id", updateAdmin);      // Update an admin by ID
UsersRouter.delete("/auth/admins/:id", deleteAdmin);   // Delete an admin by ID
// change-password route removed

UsersRouter.post("/auth/loginDeliveryMan",loginDeliveryMan)
UsersRouter.get("/auth/customers",getAllcustomers)
UsersRouter.get("/auth/customer/:id",getOneCustomer)
UsersRouter.put("/auth/customer/:id",updateCustomer)
UsersRouter.post("/auth/signout",signOut)

UsersRouter.delete("/auth/customer/:id",deleteCustomer)
UsersRouter.get("/auth/DeliveryMan",getAllDeliveryMans)
UsersRouter.get("/auth/DeliveryMan/:id",getOneDeliveryMan)
UsersRouter.put("/auth/DeliveryMan/:id",updateDeliveryMan)
UsersRouter.delete("/auth/DeliveryMan/:id",deleteDeliveryMan)
UsersRouter.post("/auth/signout-DeliveryMan",signOutDeliveryMan)


UsersRouter.post("/auth/sendVerificationCode",sendEmail)
UsersRouter.post("/auth/resetPassword",resetPassword)
UsersRouter.post("/auth/updatePasswordByEmail",changePassword)

UsersRouter.get('/orders-count/:id', getOrdersCount);
UsersRouter.get('/orders-summary/:id', getOrdersSummary);
export default UsersRouter
