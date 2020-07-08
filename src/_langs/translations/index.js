import en from './default';
import ru from './ru';
import uk from './uk';
import it from './it';
import es from './es';
import fr from './fr';
import hu from './hu';
import zh from './zh';
import de from './de';
import he from './he';

import overrides_all from './overrides/all';
import {mergeDeep} from "sickspack/deep-merge";

const applyOverrides = (lang, custom = {}) =>
{
	return mergeDeep({}, en, lang, overrides_all, custom);
};

export default {
	en: en,
	ru: applyOverrides(ru),
	uk: applyOverrides(uk),
	it: applyOverrides(it),
	es: applyOverrides(es),
	fr: applyOverrides(fr),
	hu: applyOverrides(hu),
	zh: applyOverrides(zh),
	de: applyOverrides(de),
	he: applyOverrides(he),
}