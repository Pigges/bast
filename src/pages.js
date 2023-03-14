import mongoose from "mongoose";

const pages = {
    "": {
        "title": "Home",
        "view": "index"
    },
    "search": {
        "title": "Search"
    },
    "browse": {
        "title": "Browse"
    },
    "signup": {
        "title": "Sign up"
    }
}

export default (app)=>{
    for (let page in pages) {
        app.get('/' + page, (req,res)=>{
            res.render('template', {title: pages[page].title || "", view: pages[page].view || page})
        });
    }

    // Page Not Found
    app.get('*', (req,res)=>{
        res.render('template', {title: "404", view: "404"})
    });
}