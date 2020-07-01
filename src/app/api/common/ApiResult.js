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

	setError(code = ApiResultCode.invalid_request, message = null)
	{
		this.status = ApiResultStatus.error;
		this.code = code;
		this.message = message;
	}

	isSuccess()
	{
		return this.status === ApiResultStatus.success;
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