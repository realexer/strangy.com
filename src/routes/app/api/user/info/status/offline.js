import {ApiResultWithAuth} from "../../../../../../app/api/providers/admin/ApiResultWithAuth";
import {UserOperationsAPI} from "../../../../../../app/api/providers/admin/UserOperations";

export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req, async (user_id) =>
	{
		return await UserOperationsAPI.instance(user_id).setActive(false);
	});

	res.send(result);
}