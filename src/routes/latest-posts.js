import {init} from '@lib/postgreSQL';

export async function post(req, res){
    const db = await init();
    const {slug, cat, amount} = req.body.datapar;

    //throw new Error('oops');

    db.any('SELECT * FROM public.posts WHERE slug!=$1 AND category=$2 ORDER BY date LIMIT $3', [slug, cat, amount])
      .then(function (data) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });   
        res.end(JSON.stringify(data));
      })
      .catch(function (error) {
        console.log('ERROR:', error);
        res.writeHead(500, {
          'Content-Type': 'application/json'
        });   
        res.end(JSON.stringify({er: true}));
      })
}