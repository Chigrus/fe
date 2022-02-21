import {init} from '@lib/postgreSQL';

export async function get(req, res){
    const db = await init();

    db.any('SELECT * FROM public.portfolio', 123)
      .then(function (data) {
        //console.log('DATA:', data);
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