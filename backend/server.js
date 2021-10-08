import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';


const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req,res) => {
    res.send(' Api is running...');
});

app.use('/api/products',productRouter);
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter);

app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
});

app.use((err,req,res,next)=>{
    const statusCode = res.statusCode == 200 ? 599 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV == 'production' ? null : err.stack
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}....`));