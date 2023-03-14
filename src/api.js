import Router from 'express';
import defaultavatar from './endpoints/defaultavatar.js';
const router = Router();

const endpoints = {
    defaultavatar: defaultavatar
}

router.get('/defaultavatar', (req,res)=>{})

export default router;