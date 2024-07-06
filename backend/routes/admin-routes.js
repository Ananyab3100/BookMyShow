import express from 'express';
import { addAdmin } from '../controllers/admin-controller.js';
import { adminLogin } from '../controllers/admin-controller.js';
import { getAdmins } from '../controllers/admin-controller.js';
import { getAdminById } from '../controllers/admin-controller.js';


const adminRouter = express.Router();

adminRouter.post("/signup",addAdmin);
adminRouter.post("/login",adminLogin);
adminRouter.get("/",getAdmins);
adminRouter.get("/:id", getAdminById);

export default adminRouter;