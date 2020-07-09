import translations from '../_langs/translations/index';
import Multilang from "sickspack/multilang";
import {addFormat} from 'sickspack/multilang/lang'

const init = () =>
{
	Multilang.setup(translations);

	addFormat(/\*\*([^*]+)\*\*/gmi, `<strong class='__txt_highlight'>$1</strong>`);
	addFormat(/\*([^\*]+)\*/gmi, `<strong>$1</strong>`);
	addFormat(/\n/gmi, `<p>`);
};

export {init};