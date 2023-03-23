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
    },
    "login": {
        "title": "Login"
    },
    "profile": {
        "title": "Profile",
        "auth": true
    },
    "article/create": {
        "title": "Creating new article...",
        "auth": true
    },
    "article/:id/edit": {
        "title": "Article",
        "view": "article/edit"
    }
}

export default (app)=>{
    for (let page in pages) {
        app.get('/' + page, async (req,res)=>{
            if (pages[page].auth && !req.auth) return res.redirect('/login');
            res.render('template', {title: pages[page].title || "", view: pages[page].view || page, auth: req.auth, params: req.params})
        });
    }

    // Page Not Found
    app.get('*', (req,res)=>{
        res.render('template', {title: "404", view: "404", auth: req.auth})
    });
}