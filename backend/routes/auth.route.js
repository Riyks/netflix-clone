import express from 'express';
const router = express.Router();
import { signup,login,logout,authCheck } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/protectroute.js';


router.post("/signup",signup);//post so that we can send some data along the routes
router.post("/login",login);
router.post("/logout",logout);
router.get("/authcheck",protectRoute,authCheck)
export default router;