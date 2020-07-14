import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import {redirector} from "./redirects";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express()
	.use(
		compression({ threshold: 0 }),
		bodyParser.json({ type: 'application/json' })
	);

if(dev) {
	app.use(express.static('public', { dev }));
}

app.use(redirector);

// app.use((res, req, next) =>
// {
// 	init();
//
// 	next();
// });

app.use(sapper.middleware());

if(dev)
{
	app.listen(PORT, err => {
		if (err) console.log('error', err);
	});
}

export {sapper, app};