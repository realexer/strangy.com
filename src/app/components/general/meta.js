import {_lang} from "sickspack/multilang/lang";

export const meta =
{
	title: (page, data= {}) =>
	{
		const title = _lang(`meta.${page}.title`, data);
		return `<title>${title} - Strangy</title>`
	},
	description: (page, data = {}) =>
	{
		const description = _lang(`meta.${page}.description`, data);

		return `<meta name="description" content="${description}"/>`;
	}
};