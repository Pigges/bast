import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import user from '../schemas/User.js';

const Users = mongoose.model('Users', user)

export default async (req,res)=>{
    // No need if we are already signed in
    if (req.auth) return res.json({message: "success"});

    // Get user from email
    const user = await Users.findOne({email: req.body.email});
    // Check if user exists
    if (!user) return res.json({error: "email does not exist"});

    // Check if password is correct
    if (!bcrypt.compare(req.body.password, user.password)) return res.json({error: "invalid password"});


    await Users.findByIdAndUpdate(user._id, {
        sessionID: req.session.id,
        sessionExpire: Date.now() + 1000*60*60*24*7
    });
    res.json({message: "success"});
}