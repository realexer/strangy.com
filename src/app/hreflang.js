export const replaceUrlLang = (url, from, to) =>
{
	return url.replace(`/${from}/`, `/${to}/`);
};