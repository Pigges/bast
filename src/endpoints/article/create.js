import mongoose from 'mongoose';
import article from '../../schemas/Article.js';
import user from '../../schemas/User.js';

const Articles = mongoose.model('Articles', article);
const Users = mongoose.model('Users', user);

export default async (req,res)=>{

    // Get user from id
    const user = await Users.findOne({sessionID: req.session.id});
    if (!user) return res.json({error: "no auth"});

    const article = await Articles.create({
        author: user._id        
    });

    res.json({id: article._id});
}