import {FirebaseConverter, FirebaseModel} from "./base/FirebaseModel";

class UserModel extends FirebaseModel
{
  constructor(data = {}, id = null)
  {
    super(data, id);
  }

  static getConverter()
  {
    return new FirebaseConverter((data, id) => new UserModel(data, id));
  }

  get langs()
  {
    const user = this;

    return {
      get all() {
        return user.data.info.langs || [];
      }
    }
  }

  get tags() {
    const user = this;
    return {
      get all() {
        return user.data.info.tags || [];
      },

      get primary() {
        const tags = this.all;
        return {
          get raw () {
            return tags.length > 0 ? tags[0] : {tag: 'no tags'};
          },
          get string() {
            return this.raw.tag;
          }
        };
      },

      get secondary()
      {
        const tags = this.all;
        return {
          get raw() {
            return tags.slice(1);
          },
          get string() {
            return this.raw.map((item) => {
              return item.tag;
            }).join(', ');
          },
        };
      },

      hasAny: (list) =>
      {
        let matchingTags = user.info.tags.all.filter((tag) => {
          return list.includes(tag.tag);
        });

        return matchingTags.length > 0;
      }
    };
  }

  get karma() {
    return this.data.karma;
  }

  get lastActiveAt() {
    return this.data.last_active_at.toDate();
  }
}

export {UserModel};