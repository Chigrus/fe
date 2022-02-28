import keys from '@lib/keys';
import {init} from '@lib/postgreSQL';

const jwt = require('jsonwebtoken');

export async function post(req, res) {
    const {id, title, description, og_type, og_title, og_description, og_url, og_image, og_article, og_profile, og_video} = req.body.data;
    const db = await init();
    const {token} = get_cookies(req);
    if(req.headers.cookie){  
        if(token){
            switch (jwt.verify(token, keys.jwt).role) {
                case 'admin':
                    {
                        db.none('UPDATE opengraph SET title = $1, description = $2, og_type = $3, og_title = $4, og_description = $5, og_url = $6, og_image = $7, og_article = $8, og_profile = $9, og_video = $10 WHERE id = $11', 
                        [title, description, og_type, og_title, og_description, og_url, og_image, JSON.stringify(og_article), JSON.stringify(og_profile), JSON.stringify(og_video), id])
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