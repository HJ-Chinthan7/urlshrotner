const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const urlRoutes = require('./routes/urlRoutes');
const analyticRoutes = require('./routes/analyticsRoutes');
const { redirectUrl } = require('./controllers/urlController');

const corsOptions = {
    origin: 'https://urlshrotner-seven.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

app.use(cors(corsOptions));
const port = 5000;
app.use(express.json());


app.get('/:urlCode', redirectUrl);
app.use('/api', urlRoutes);
app.use('/api/analytics', analyticRoutes);

connectDB().then(() => {
    console.log("connected to the " + port);
    app.listen(port, () => { 
        console.log(`Running on ${port}`) 
    });
}).catch((err) => {
    console.log(err);
});
