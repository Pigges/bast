import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import user from '../schemas/User.js';

const Users = mongoose.model('Users', user);

export default async (req,res)=>{
    // Check validity of sent data
    const invalid = validate(req.body);
    if (invalid.length > 0) return res.json({error: `invalid or missing fields: ${JSON.stringify(invalid)}`}); // Do not continue if invalid

    // Make sure no user with that email is already signed up
    const user = await Users.findOne({email: req.body.email});
    if (user) return res.json({error: "email already exists"});

    const name = req.body.username[0] + req.body.username[1];
    
    // Create account
    Users.create({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 12),
        sessionID: req.session.id,
        avatar: '/api/defaultavatar?name=' + name
    })

    res.json({message: "success"});
}

function validate(data) {
    let invalid = [];
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) invalid.push('email'); // Source: https://www.w3resource.com/javascript/form/email-validation.php
    if (!data.username) invalid.push('username');
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(data.password)) invalid.push('password'); // Source: https://w3resource.com/javascript/form/password-validation.php
    if (data.password_again !== data.password) invalid.push('password_again');
    return invalid;
}