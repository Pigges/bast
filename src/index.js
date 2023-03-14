import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import pages from './pages.js';
import api from './api.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODBADDRESS);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/api', api)

// api(app);
pages(app);

app.listen(process.env.PORT || 3000, (err)=>{
    console.log(err||"Server running");
})