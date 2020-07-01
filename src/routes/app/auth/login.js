import {login} from "../../../app/api/Auth";

export async function post(req, res)
{
	const result = await login(req.body.email, req.body.password);

	res.send(result);
}