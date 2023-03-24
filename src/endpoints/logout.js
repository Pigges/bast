import mongoose from 'mongoose';
import user from '../schemas/User.js';

const Users = mongoose.model('Users', user)

export default async (req,res)=>{
    try {
        const user = await Users.findOneAndUpdate({sessionID: req.session.id}, {
            sessionExpire: 0
        });
        res.json({message: "success"});
    } catch {
        res.json({error: "could not logout"});
    }
}