import express from 'express';
import Private from '../middlewares/auth.js';
import { 
  signinUser, 
  signoutUser, 
  signupUser, 
  getUser 
} from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.post('/signin', signinUser);
userRoutes.post('/signup', signupUser);
userRoutes.get('/signout', signoutUser);

userRoutes.get('/getuser', Private, getUser);

export default userRoutes

// //forgot password token
// router.post('/forgot-password-token',forgotPasswordToken)
// // update password
// router.put('/update-password',authMiddleWare,updatePassword)
// //reset password 
// router.put('/reset-password/:token',resetPassword)
