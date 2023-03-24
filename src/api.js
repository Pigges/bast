import Router from 'express';
import defaultavatar from './endpoints/defaultavatar.js';
import signup from './endpoints/signup.js';
import login from './endpoints/login.js';
import logout from './endpoints/logout.js';
import update from './endpoints/profile/update.js';
import article_create from './endpoints/article/create.js';
import article_get from './endpoints/article/get.js';
import article_edit from './endpoints/article/edit.js';
import user_get from './endpoints/user/get.js';
const router = Router();


// List all endpoints
const endpoints = [
    {
        name: "defaultavatar",
        fn: defaultavatar,
        method: "get"
    },
    {
        name: "signup",
        fn: signup,
        method: "post"
    },
    {
        name: "login",
        fn: login,
        method: "post"
    },
    {
        name: "logout",
        fn: logout,
        method: "post"
    },
    {
        name: "profile/update",
        fn: update,
        method: "post"
    },
    {
        name: "article/create",
        fn: article_create,
        method: "post"
    },
    {
        name: "article/get",
        fn: article_get,
        method: "post"
    },
    {
        name: "article/edit",
        fn: article_edit,
        method: "post"
    },
    {
        name: "user/get",
        fn: user_get,
        method: "post"
    }
]


// Apply all endpoints
for (let i in endpoints) router[endpoints[i].method]('/' + endpoints[i].name, endpoints[i].fn);

export default router;