import {ApiResult} from "./common/ApiResult";
import env from "../../env";
import {auth_info} from "../stores/current_user";

let idToken = null;
auth_info.subscribe((authInfo) =>
{
	idToken = authInfo.idToken;
});

/**
 *
 * @param type
 * @param url
 * @param data
 * @returns {Promise<ApiResult>}
 */
const perform = async (type, url, data = null) =>
{
	const result = new ApiResult();

	try
	{
		const response = await fetch(`${env.api_url}/${url}`, {
			method: type,
			headers: {
				'Content-Type': 'application/json',
				'AuthToken': idToken
			},
			body: data
		});

		result.setData(await response.json());

	} catch (e) {
		console.error(e);
		result.setError(e.toString());
	}

	return result;
};

/**
 *
 * @param url
 * @returns {Promise<ApiResult>}
 */
const get = async (url) =>
{
	return await perform(RequestTypes.GET, url);
};

/**
 *
 * @param url
 * @param data
 * @returns {Promise<ApiResult>}
 */
const post = async (url, data) =>
{
	return await perform(RequestTypes.POST, url, formatPostData(data));
};

const formatPostData = (data = {}) =>
{
	return JSON.stringify(data);
	//return Object.keys(data).map((key) => {return `${key}=${encodeURIComponent(data[key])}`}).join('&');
};

const RequestTypes =
{
	GET: 'GET',
	POST: 'POST'
};

const ApiRequest =
{
	get: get,
	post: post
};

export default ApiRequest;