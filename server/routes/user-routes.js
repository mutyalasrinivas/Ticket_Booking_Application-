import express from 'express';
const userRouter = express.Router();
import {getAllUsers, signup,updateUser,deleteUser,login} from '../controllers/user-controller.js';


userRouter.get('/',getAllUsers);
userRouter.post('/signup',signup);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser)
userRouter.post('/login',login)









export default userRouter;