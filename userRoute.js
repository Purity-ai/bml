import express from 'express'
import {registeruser, loginUser} from '../controllers/Usercontroller.js'

const userRouter = express.Router()


userRouter.post('/register', registeruser)
userRouter.post('/', loginUser)






export default userRouter

// in server ->>>>>app.use('/api/user, userRouter)