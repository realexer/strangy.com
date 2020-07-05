import {TagModel} from "../firebase/TagModel";
import {FirebaseConverter} from "../firebase/base/FirebaseModel";

class FilterTagsList
{
	constructor(tags = {}) {
		this.tags = tags;
	}

	addTag(tag) {
		if (this.tags[tag.tag] === undefined) {
			this.tags[tag.tag] = 0;
		}

		this.tags[tag.tag]++;
	}

	addMultiple(tags) {
		tags.forEach((tag) => {
			this.addTag(tag);
		});
	}

	get array() {
		const tagsArray = [];

		for (let tag in this.tags) {
			tagsArray.push(new FilterTag(tag, this.tags[tag]))
		}

		return tagsArray;
	}

	clear() {
		this.tags = {};
	}

}

class FilterTag
{
	constructor(tag, usersAmount)
	{
		this.tag = tag;
		this.users_amount = usersAmount;
	}
}

export {FilterTagsList};