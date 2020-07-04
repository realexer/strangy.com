import {UsersManger} from "../../../../app/api/providers/admin/UsersManager";
import {ApiResultWithAuth} from "../../../../app/api/providers/admin/ApiResultWithAuth";
import {UserOperationsAPI} from "../../../../app/api/providers/admin/UserOperations";

export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req, async (user_id) =>
	{
		return await UsersManger.create(user_id);
	});

	res.send(result);
}