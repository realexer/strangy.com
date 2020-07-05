import {FilterTagsList} from "../../../api/providers/common/models/app/TagsFilter";
import {UserModel} from "../../../api/providers/common/models/firebase/UserModel";

class FilterData
{
	constructor()
	{
		this.users = [];
		this.tags = new FilterTagsList();
	}

	putData(docs)
	{
		docs.forEach((doc) =>
		{
			const user = doc.data();
			this.tags.addMultiple(user.tags.all);
			this.users.push(user);
		});
	}

	filterUsers(byTags)
	{
		return this.users.filter((user) =>
		{
			return byTags.length === 0 || user.tags.hasAny(byTags);
		});
	}

	getTotalUsersAmount()
	{
		return this.users.length;
	}

	getTagsArray() {
		return this.tags.array.sort((a, b) => b.users_amount - a.users_amount);
	}

	reset() {
		this.users = [];
		this.tags.clear();
	}
}

export {FilterData};