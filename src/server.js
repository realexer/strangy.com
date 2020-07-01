import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express()
	.use(
		compression({ threshold: 0 }),
		bodyParser.urlencoded({
			extended: true
		})
	);

if(dev) {
	app.use(express.static('public', { dev }));
}

app.use(sapper.middleware());

if(dev)
{
	app.listen(PORT, err => {
		if (err) console.log('error', err);
	});
}

export {sapper, app};