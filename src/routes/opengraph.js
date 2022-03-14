import {init} from '@lib/postgreSQL';

export async function get(req, res){
    const db = await init();
    const {name} = req.query;

    db.any('SELECT * FROM public.opengraph WHERE name=$1 LIMIT 1', [name])
      .then(function (data) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        if (data.length == 0){
          data.push({
            id: 0,
            name: '',
            title: 'Frontend Expert',
            description: 'Сайт фронтенд разработчика',
            og_type: 'website',
            og_title: 'Frontend Expert',
            og_description: 'Сайт фронтенд разработчика',
            og_url: '',
            og_image: '',
            og_image_type: 'image/jpeg',
            og_image_width: 1200,
            og_image_height: 630,
            og_article: {},
            og_profile: {},
            og_video: {},
            og_twitter_description: null
          })
        } 
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