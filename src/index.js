import * as dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import pages from './pages.js';
import api from './api.js';
import user from './schemas/User.js';

const Users = mongoose.model('Users', user)

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODBADDRESS);

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

async function authentication(req,res,next) {
    const user = await Users.findOne({sessionID: req.session.id});
    if (user && user.sessionExpire > Date.now()) {
        req.auth = user;
        return next();
    }
    
    req.auth = false;
    return next();
}

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(authentication)

app.use('/api', api)

pages(app);

app.listen(process.env.PORT || 3000, (err)=>{
    console.log(err||"Server running");
})