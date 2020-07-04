class ApiResult
{
	constructor(source = {})
	{
		this.setData(source);
	}

	setData(source = {})
	{
		this.data = source.data;
		this.status = source.status;
		this.message = source.message;
		this.code = source.code;
	}

	setSuccess(data = null, message = null)
	{
		this.status = ApiResultStatus.success;
		this.code = ApiResultCode.success;
		this.data = data;
		this.message = message;
	}

	setError(message = null, code = ApiResultCode.invalid_request)
	{
		this.status = ApiResultStatus.error;
		this.code = code;
		this.message = message;
	}

	isSuccess()
	{
		return this.status === ApiResultStatus.success;
	}

	isError() {
		return !this.isSuccess();
	}

	getErrorMessage()
	{
		return this.message;
	}

	static fromSource(source)
	{
		const result = new ApiResult();
		result.setData(source);
		return result;
	}

	/**
	 *
	 * @param {ApiResult[]} results
	 */
	static fromMultiple(...results)
	{
		const result = new ApiResult();
		result.setSuccess(results);
		for(let item of results) {
			if(item.isSuccess() === false) {
				result.setError(item.getErrorMessage())
			}
		}

		return result;
	}

	static fromAction(func)
	{
		const result = new ApiResult();
		try {
			result.setSuccess(func());
		} catch (error) {
			result.setError(error);
		}

		return result;
	}

	static async fromPromise(func)
	{
		const result = new ApiResult();

		try {
			const promiseResult = await func();
			result.setSuccess(promiseResult);
		} catch (error) {
			console.error(error);
			result.setError(error.toString());
		}

		return result;
	}
}

const ApiResultStatus =
{
	success: 'success',
	error: 'error',
};

const ApiResultCode = {
	'success': 200,
	'invalid_request': 400,
	'not_found': 404,
	'invalid_data': 500
};

export {ApiResult, ApiResultCode};