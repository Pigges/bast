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
    if (user._id.toString() !== article.author) return res.json({error: "not allowed to delete this article"});

    await Articles.findByIdAndRemove(article._id);

    res.json({id: article._id});
}