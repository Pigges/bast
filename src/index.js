import * as dotenv from 'dotenv';
import express from 'express';
import api from './api.js';

dotenv.config();
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

api(app);

app.get('/', (req,res)=>{
    res.render('template', {title: "Home", view: "index"})
});

app.get('/search', (req,res)=>{
    res.render('template', {title: "Home", view: "search"})
});

app.listen(3000, (err)=>{
    console.log(err||"Server running");
})