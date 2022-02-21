import * as path from 'path';
import * as fs from 'fs';
import keys from '@lib/keys';

const jwt = require('jsonwebtoken');


const DATE_RE = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
export function put(req, res) {
    const date = new Date().toISOString().match(DATE_RE).slice(1).join('-');
    const file = path.join(process.cwd(), 'static/uploads', `${date}.jpg`);
    const url = `/uploads/${date}.jpg`;

    const {token} = get_cookies(req);
    if(req.headers.cookie){  
        if(token){
            switch (jwt.verify(token, keys.jwt).role) {
                case 'admin':
                    {
                        req.pipe(fs.createWriteStream(file)).once('finish', async () => {
                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            });   
                            res.end(JSON.stringify({url}));
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