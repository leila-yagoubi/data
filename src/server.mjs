import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
const url= "mongodb://127.0.0.1:27017/pharmacist";
import bodyParser from 'body-parser';
import session from 'express-session';

//router
import adressRouter from './routes/AdressRouter.mjs';
import pharmaRouter from './routes/pharmaRouter.mjs';
import userRouter from './routes/userRouter.mjs';
import gardroute from './routes/gardeRouter.mjs';
import wilayaRouter from './routes/AdressRouter.mjs';



const app=express();
//convert to json with no error
app.use(bodyParser.json()); // Access the 'json' property from the imported object

app.use(urlencoded({
  extended:true
}));
// تهيئة وسيطة الجلسة
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

//connection to db
connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(_result =>console.log("data connected "))
  .catch(_error => console.log("error")),



//collection
app.use('/communes', adressRouter);
app.use('/wilayas',wilayaRouter);
app.use('/pharmacies',pharmaRouter );
app.use('/users', userRouter);
app.use('/PharmacieGards', gardroute);
  
//port
app.listen(3000,()=>{
    console.log('connection to listen server 3000')
})