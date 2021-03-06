import {UserOperationsAPI} from "../../../../../../app/api/providers/admin/UserOperations";
import {ApiResultWithAuth} from "../../../../../../app/api/providers/admin/ApiResultWithAuth";


export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req,async (user_id) =>
	{
		return await UserOperationsAPI.instance(user_id).setLangs(req.body.langs);
	});

	res.send(result);
}