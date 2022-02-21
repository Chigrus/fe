import keys from '@lib/keys';
import {init} from '@lib/postgreSQL';

const jwt = require('jsonwebtoken');


export async function post(req, res) {
    const post = req.body.post;
    const {tableName, id} = req.body.params;
    const db = await init();
    const {token} = get_cookies(req);
    
    if(req.headers.cookie){  
        if(token){
            switch (jwt.verify(token, keys.jwt).role) {
                case 'admin':
                    {
                        db.none('UPDATE $1:name SET post = $2 WHERE id = $3', [tableName, JSON.stringify(post), id])
                            .then(data => {
                                res.writeHead(200, {
                                    'Content-Type': 'application/json'
                                });   
                                res.end(JSON.stringify(data));
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