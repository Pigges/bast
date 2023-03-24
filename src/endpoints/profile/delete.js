import mongoose from 'mongoose';
import user from '../../schemas/User.js';

const Users = mongoose.model('Users', user)

export default async (req,res)=>{
    // We can't do this if we are not logged in
    if (!req.auth) return res.json({error: "no auth"});

    // Find user from session id
    const user = await Users.findOne({sessionID: req.session.id});

    // Update user with new information
    await Users.findByIdAndDelete(user._id);
    res.json({message: "success"});
}