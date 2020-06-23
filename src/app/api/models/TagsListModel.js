class TagsListModel {
  constructor(tags = {}) {
    this.tags = tags;
  }

  addTag(tag) {
    if(this.tags[tag.tag] === undefined) {
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

    for(let tag in this.tags) {
      tagsArray.push(new TagModel(tag, this.tags[tag]))
    }

    return tagsArray;
  }

  clear() {
    this.tags = {};
  }

}

class TagModel {
  constructor(name, amount) {
    this.tag = name;
    this.users_amount = amount;
  }
}

export {TagsListModel, TagModel};