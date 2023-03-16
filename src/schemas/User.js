import { Schema } from 'mongoose';

export default new Schema({
    email: String,
    username: String,
    password: String,
    sessionID: String,
    sessionExpire: { type: Number, default: +new Date() + 1000*60*60*24*7 },
    avatar: { type: String, default: ""}
});