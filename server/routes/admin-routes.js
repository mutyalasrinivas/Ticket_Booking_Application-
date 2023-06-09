import express from 'express';
const adminRouter=express.Router();
import { addAdmin,adminLogin} from '../controllers/admin-controller.js';

adminRouter.post('/signup',addAdmin);
adminRouter.post('/login',adminLogin);





export default adminRouter;