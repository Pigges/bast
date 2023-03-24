import mongoose from 'mongoose';
import user from '../../schemas/User.js';

const Users = mongoose.model('Users', user);

export default async (req,res)=>{

    const user = await Users.findById(req.body.id);

    if (!user) return res.json({error: "user does not exist"})

    res.json({
        id: user.id,
        username: user.username,
        memberSince: user.memberSince,
        avatar: user.avatar
    });
}