import {init} from '@lib/postgreSQL';

export async function get(req, res){
    const db = await init();
    const {cat} = req.query;

    db.any('SELECT * FROM public.posts WHERE category=$1 ORDER BY id', [cat])
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