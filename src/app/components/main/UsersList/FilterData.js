import {TagsListModel} from "../../../api/providers/common/models/TagsListModel";
import {UserModel} from "../../../api/providers/common/models/UserModel";

class FilterData
{
	constructor()
	{
		this.users = [];
		this.tags = new TagsListModel();
	}

	putData(docs)
	{
		docs.forEach((doc) =>
		{
			const user = UserModel.fromDoc(doc);
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