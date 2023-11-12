import express from 'express';
const adminRouter=express.Router();
import { addAdmin,adminLogin, getAdminById} from '../controllers/admin-controller.js';

adminRouter.get('/:id',getAdminById);
adminRouter.post('/signup',addAdmin);
adminRouter.post('/login',adminLogin);
 




export default adminRouter;