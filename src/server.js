import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const app = express();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
);
app.use((err, req, res, next) => {
	console.error(err.stack);
	if (!res.headersSent) {
		res.status(500);
	}
  	res.send({
		error: String(err),
	});
});
app.listen(PORT, err => {
	if (err) console.log('error', err);
});