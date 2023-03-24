import mongoose from 'mongoose';
import Article from '../schemas/Article';

const Articles = mongoose.model('Article', Article)

export default async (req,res)=>{

    const articles = await Articles.find({});
    res.json({articles: articles});
}