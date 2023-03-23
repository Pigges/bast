import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import user from '../../schemas/User.js';

const Users = mongoose.model('Users', user)

export default async (req,res)=>{
    // We can't do this if we are not logged in
    if (!req.auth) return res.json({error: "no auth"});

    // Check validity of input
    const invalid = validate(req.body);
    if (invalid.length > 0) return res.json({error: `invalid or missing fields: ${JSON.stringify(invalid)}`});

    // Make sure no one already have that email
    if (await Users.findOne({email: req.body.email})) return res.json({error: "email already exists"})

    // Find user from session id
    const user = await Users.findOne({sessionID: req.session.id});

    // Update user with new information
    await Users.findByIdAndUpdate(user._id, {
        email: req.body.email || undefined,
        username: req.body.username || undefined,
        password: req.body.password ? bcrypt.hashSync(req.body.password, 12) : undefined 
    });
    res.json({message: "success"});
}

function validate(data) {
    let invalid = [];
    if (data.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) invalid.push('email'); // Source: https://www.w3resource.com/javascript/form/email-validation.php
    if (data.password && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(data.password)) invalid.push('password'); // Source: https://w3resource.com/javascript/form/password-validation.php
    if (data.password && data.password_again !== data.password) invalid.push('password_again');
    return invalid;
}