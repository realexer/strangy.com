import moment from "moment";
import 'moment/locale/uk';
import 'moment/locale/en-in';
import 'moment/locale/ru';
import 'moment/locale/es';
import 'moment/locale/it';

import Multilang from "sickspack/multilang";

export const formatDate = (date) =>
{
	return moment(date).locale(Multilang.getLang()).fromNow();
};