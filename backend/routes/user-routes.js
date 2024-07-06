import express from 'express';
import {getAllUsers} from '../controllers/user-controller.js';
import { signUp } from '../controllers/user-controller.js';
import { updateUser } from '../controllers/user-controller.js';
import { deleteUser } from '../controllers/user-controller.js';
import { login } from '../controllers/user-controller.js';
import { getBookingsOfUser } from '../controllers/user-controller.js';
import { getUserById } from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.get("/" , getAllUsers);
userRouter.get("/:id" ,getUserById);
userRouter.post("/signup" , signUp);
userRouter.put("/:id" ,updateUser);
userRouter.delete("/:id" ,deleteUser);
userRouter.post("/login" , login);
userRouter.get("/bookings/:id" , getBookingsOfUser);



export default userRouter;