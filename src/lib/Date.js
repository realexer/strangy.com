import moment from "moment";
import 'moment/locale/uk';
import 'moment/locale/en-in';
import 'moment/locale/ru';
import 'moment/locale/es';
import 'moment/locale/it';

import {session_lang, current_lang} from '../app/lang';

current_lang.subscribe((lang) =>
{
	moment().locale(session_lang);

	console.log(`Session lang is: [${session_lang}]`);
	console.log(`Moment locale is: [${moment.locale()}]`);
});

export const formatDate = (date) =>
{
	return moment(date).locale(session_lang).fromNow();
};