import express from 'express';
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const userRouter = express.Router();

userRouter.post('/login',authUser);
userRouter.post('/',registerUser);
userRouter.route('/profile')
    .get(protect,getUserProfile)
    .put(protect,updateUserProfile);

export default userRouter;