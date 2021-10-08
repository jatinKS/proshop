import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';


const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.use('/api/products',productRouter);
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter);

app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
});

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....lululu')
    })
}


app.use((err,req,res,next)=>{
    const statusCode = res.statusCode == 200 ? 599 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV == 'production' ? null : err.stack
    })
});

const PORT = process.env.PORT || 18000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}....`));