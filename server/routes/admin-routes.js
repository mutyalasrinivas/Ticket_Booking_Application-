import express from 'express';
const adminRouter=express.Router();
import { addAdmin,adminLogin, getAdmins} from '../controllers/admin-controller.js';

adminRouter.get('/',getAdmins);
adminRouter.post('/signup',addAdmin);
adminRouter.post('/login',adminLogin);





export default adminRouter;