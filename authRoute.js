// backend/routes/authRoute.js
import express from 'express';
import { adminLogin } from '../controllers/authController.js';

const authRouter = express.Router();

// Admin login route
authRouter.post('/admin-login', adminLogin);

export default authRouter;