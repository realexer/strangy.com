import {UserOperationsAPI} from "../../../../../../app/api/providers/admin/UserOperations";
import {ApiResultWithAuth} from "../../../../../../app/api/providers/admin/ApiResultWithAuth";

export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req, async (user_id) =>
	{
		return UserOperationsAPI.instance(user_id).updateUserTags(req.body.tags);
	});

	res.send(result);
}