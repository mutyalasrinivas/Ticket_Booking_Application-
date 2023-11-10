import express from 'express';
const userRouter = express.Router();
import {getAllUsers, signup,updateUser,deleteUser,login, getBookingsOfUser,getUserDetails} from '../controllers/user-controller.js';


userRouter.get('/',getAllUsers);
userRouter.get('/:id',getUserDetails);
userRouter.post('/signup',signup);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser)
userRouter.post('/login',login)
userRouter.get('/bookings/:id',getBookingsOfUser);









export default userRouter;