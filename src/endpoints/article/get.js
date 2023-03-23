import mongoose from 'mongoose';
import article from '../../schemas/Article.js';

const Articles = mongoose.model('Articles', article);

export default async (req,res)=>{

    const article = await Articles.findById(req.body.id);

    if (!article) return res.json({error: "article does not exist"})

    res.json({
        id: article.id,
        title: article.title,
        intro: article.intro,
        content: article.content,
        created: article.created,
        thumbnail: article.thumbnail,
        author: article.author
    });
}