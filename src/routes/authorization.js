import keys from '@lib/keys';
import { selectUser } from '../db';

const { createHash, } = require('crypto');
const jwt = require('jsonwebtoken');

const ERROR = JSON.stringify({err: true});

export async function post(req, res) {
    const {login, password} = req.body.data;  
    const [selectedUser, userError] = await selectUser(login)
        .then(user => [user])
        .catch(error => {
            return [null, error];
        });
    if (!selectedUser) {
        if (userError) {
            console.log('ERROR:', error);
        }
        const status = userError ? 500 : 404;
        res.writeHead(status, {
            'Content-Type': 'application/json'
        });   
        res.end(ERROR);
        return;
    }
    
    const hash = createHash('sha256');
    hash.update(password);
    const hashDigest = hash.digest('hex');
    //console.log(hashDigest, selectedUser);
    if (selectedUser.user_pass !== hashDigest) {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });   
        res.end(ERROR);
        return;
    }

    const token = jwt.sign({
        id: selectedUser.id,
        role: selectedUser.user_role
    }, keys.jwt, {expiresIn: 3600 * 60 * 1});
    res.cookie('token', token, {
        maxAge: 3600 * 4 * 1000,
        httpOnly: true,
    });
    res.json({
        token
    });
}