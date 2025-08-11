const express=require('express');
require('dotenv').config();
const connectDB=require('./config/db');
const app=express();
const port=5000;
app.use(express.json());

app.use('/')
connectDB().then(()=>{
        console.log("connect to the "+port);
app.listen(port,
    ()=>{console.log(`Running on ${port}`)}
);
}

).catch((err)=>{
    
    console.log(err);
}
);

