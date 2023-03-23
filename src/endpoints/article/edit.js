import mongoose from 'mongoose';
import article from '../../schemas/Article.js';
import user from '../../schemas/User.js';

const Articles = mongoose.model('Articles', article);
const Users = mongoose.model('Users', user);

export default async (req,res)=>{

    // Get user from id
    const user = await Users.findOne({sessionID: req.session.id});
    if (!user) return res.json({error: "no auth"});

    // Do the user own the article?
    const article = await Articles.findById(req.body.id);
    if (!article) return res.json({error: "article does not exist"});
    if (user._id.toString() !== article.author) return res.json({error: "not allowed to edit this article"});

    await Users.findByIdAndUpdate(article._id, {
        title: req.body.title || undefined,
        intro: req.body.intro || undefined,
        content: req.body.content || undefined 
    });

    res.json({message: "success"});
}