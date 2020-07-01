const perform = async (type, url, data = null) =>
{
	const response = await fetch(url, {
		method: type,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: data
	});

	return await response.json();
};

const get = async (url) =>
{
	return await perform(RequestTyeps.GET, url);
};

const post = async (url, data) =>
{
	return await perform(RequestTyeps.POST, url, formatPostData(data));
};

const formatPostData = (data) =>
{
	return Object.keys(data).map((key) => {return `${key}=${encodeURIComponent(data[key])}`}).join('&');
};

const RequestTyeps =
{
	GET: 'GET',
	POST: 'POST'
};

export {get, post};