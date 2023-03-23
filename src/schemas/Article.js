import { Schema } from 'mongoose';

export default new Schema({
    title: { type: String, default: "Unnamed"},
    intro: { type: String, default: ""},
    content: { type: String, default: ""},
    created: { type: Number, default: +new Date()},
    thumbnail: { type: String, default: ""},
    author: String
});