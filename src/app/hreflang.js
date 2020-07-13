export const checkAlternatives = (url) =>
{
	if(url.match('/tag/')) {
		return false;
	}

	return true;
};

export const replaceUrlLang = (url, from, to) =>
{
	return url.replace(`/${from}/`, `/${to}/`);
};