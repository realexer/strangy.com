import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express()
	.use(
		compression({ threshold: 0 })
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