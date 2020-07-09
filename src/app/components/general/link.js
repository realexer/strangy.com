import Multilang from "sickspack/multilang";

export const lang_url = (url = "") =>
{
	return `/${Multilang.getLang()}/${url}`;
};