import { Config } from '@config/config';
import { appRoutes } from '@app/routes/app.routes';
import * as mongoose from 'mongoose';

import * as express from 'express';
import * as morgan from 'morgan';
import * as compress from 'compression';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';

export const init = (): Express.Application => {
	const app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(express.static('./public'));
	appRoutes(app);

	mongoose.connect(Config.mongoCnn).catch(err => console.log(err));
	return app;
}