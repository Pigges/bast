import mongoose from 'mongoose';
import user from '../schemas/User.js';

const Users = mongoose.model('Users', user)

export default async (req,res)=>{
    const user = await Users.findByIdAndUpdate(req.auth._id, {
        sessionExpire: Date.now()
    });
    res.json({message: "success"});
}