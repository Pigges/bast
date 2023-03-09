export default (app)=>{
    app.use('/api', (req,res,next)=>api(app,req,res,next));
}

async function api(app,req,res,next) {

    if (req.path === '/defaultavatar') {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${req.query.size + 'px' || '64px'}" height="${req.query.size + 'px' || '64px'}" viewBox="0 0 64 64" version="1.1"><rect fill="#008000" cx="32" width="64" height="64" cy="32" r="32"/><text x="50%" y="50%" style="color: #222; line-height: 1;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" alignment-baseline="middle" text-anchor="middle" font-size="28" font-weight="400" dy=".1em" dominant-baseline="middle" fill="#fff">${req.query.name || '?'}</text></svg>`;
        res.writeHead(200, {
            'Content-Type': 'image/svg+xml',
            'Content-Length': svg.length
        });
        res.end(svg);
    } else res.send("hello");
}