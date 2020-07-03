import feedback from "./feedback";
import ApiRequest from "../../ApiRequest";

const invite = async (stranger_id, user_id, subject) =>
{
	return await ApiRequest.post(`stranger/${stranger_id}/invite`, {
		from_user_id: user_id,
		subject: subject
	});
};

const stranger = {
	invite: invite,
	feedback: feedback
};


export default stranger;