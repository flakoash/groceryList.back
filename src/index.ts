import Joi from 'joi';
import express from 'express';
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import routers
import {itemRoutes} from './routes/itemRoutes';
import {authRoutes}  from './routes/authRoutes';

const app = express();
// use midlewares
app.use(express.json());
app.use('/item', itemRoutes);
app.use('/auth', authRoutes);



const mongoURI = 'mongodb+srv://mongoRoot:mongosecure12345@cluster0.bh9kp.mongodb.net/testdatabase?retryWrites=true&w=majority'

mongoose.connect(mongoURI,
    {useNewUrlParser: true,  useUnifiedTopology: true},
    ()=>{
    // tslint:disable-next-line:no-console
    console.log('connected to DB')
})

app.listen(3000);