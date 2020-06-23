import {mergeDeep} from "../lib/merge_deep";

import _default from './_default';
import en from './en';
import sp from './sp';
import ru from './ru';
import uk from './uk';
import it from './it';

const combine = (base, lang) =>
{
	return mergeDeep({}, base, lang)
};

const langs = {
	en: combine(_default, en),
	sp: combine(_default, sp),
	ru: combine(_default, ru),
	uk: combine(_default, uk),
	it: combine(_default, it)
};

export default langs;