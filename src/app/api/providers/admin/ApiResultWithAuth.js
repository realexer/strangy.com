import {ApiResult} from "../../common/ApiResult";
import {dbAccessorAdmin} from "../../../firebase/admin";

class ApiResultWithAuth extends ApiResult
{
	/**
	 *
	 * @param {request} request
	 * @param func
	 * @returns {Promise<void>}
	 */
	static async fromRequest(request, func)
	{
		return await ApiResult.fromPromise(async () =>
		{
			const decodedToken = await dbAccessorAdmin.getFirebase().auth().verifyIdToken(request.header('AuthToken'));
			const uid = decodedToken.uid;

			return await func(uid);
		});
	}
}

export {ApiResultWithAuth};