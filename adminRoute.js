import express from 'express'
import { addVenue } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-venue', upload.single('image'), addVenue)

export default adminRouter
//Please add Api endpoint in server.js ->>>>>> app.use('/api/admin', adminRouter)  localhost:4000/api/
// admin