import en from './default'
import ru from './ru'
import uk from './uk'
import it from './it'
import es from './es'

import overrides_all from './overrides/all';
import {mergeDeep} from "sickspack/deep-merge";

const applyOverrides = (lang, custom = {}) =>
{
	return mergeDeep(lang, overrides_all, custom);
};

export default {
	en: applyOverrides(en),
	ru: applyOverrides(ru),
	uk: applyOverrides(uk),
	it: applyOverrides(it),
	es: applyOverrides(es),
}