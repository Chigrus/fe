import keys from '@lib/keys';

const jwt = require('jsonwebtoken');

export async function get(req, res){

    const user = {
        isAdmin: false,
        //isEditor: false,
    };

    if(req.headers.cookie) {
        const {token} = get_cookies(req);
        if(token){
            switch (jwt.verify(token, keys.jwt).role) {
                case 'admin':
                    user.isAdmin = true;
                    break;
                // case 'editor':
                //     user.isEditor = true;
                //     break;
              }
        }
    }

    res.end(JSON.stringify(user));
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