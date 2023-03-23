import Router from 'express';
import defaultavatar from './endpoints/defaultavatar.js';
import signup from './endpoints/signup.js';
import login from './endpoints/login.js';
import logout from './endpoints/logout.js';
import update from './endpoints/profile/update.js';
import create from './endpoints/article/create.js';
import get from './endpoints/article/get.js';
import edit from './endpoints/article/edit.js';
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
        fn: create,
        method: "post"
    },
    {
        name: "article/get",
        fn: get,
        method: "post"
    },
    {
        name: "article/edit",
        fn: edit,
        method: "post"
    }
]


// Apply all endpoints
for (let i in endpoints) router[endpoints[i].method]('/' + endpoints[i].name, endpoints[i].fn);

export default router;