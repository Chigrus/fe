import keys from '@lib/keys';
import {init} from '@lib/postgreSQL';

const jwt = require('jsonwebtoken');

export async function post(req, res) {
    const {id, title, subtitle, text, image, image_alt, slug} = req.body.data;
    const db = await init();
    const {token} = get_cookies(req);
    if(req.headers.cookie){  
        if(token){
            switch (jwt.verify(token, keys.jwt).role) {
                case 'admin':
                    {
                        db.none('UPDATE posts SET title = $1, subtitle = $2, text = $3, image = $4, image_alt = $5, slug = $6 WHERE id = $7', [title, subtitle, text, image, image_alt, slug, id])
                            .then(result => {
                                res.writeHead(200, {
                                    'Content-Type': 'application/json'
                                });   
                                res.end(JSON.stringify(result));
                            })
                            .catch(error => {
                                console.log(error);
                                res.writeHead(500);
                                res.end();
                                return;
                            });
                    }
                    break;
              }
        }else{
            console.log('Что то пошло не так ...');
        }
    }
}

const get_cookies = (request) => {
    const cookies = {token: ''};
    if(request.headers.cookie != ''){
        request.headers && request.headers.cookie.split(';').forEach((cookie) => {
            const parts = cookie.match(/(.*?)=(.*)$/)
            if (!parts) { return; }
            cookies[ parts[1].trim() ] = (parts[2] || '').trim();
        });
    }
    return cookies;
};