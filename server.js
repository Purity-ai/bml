import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'
import bookingRouter from './routes/bookingRoute.js'
import venueRouter from './routes/venueRoute.js'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()


// middlewares
app.use(express.json())
app.use(cors()) // Allows all origins

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/venues', venueRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
    res.send('API started well')
})

app.listen(port, () => console.log("Server Started on port", port))