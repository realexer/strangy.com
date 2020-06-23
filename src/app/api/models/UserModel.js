class UserModel {
  constructor(userInfo) {
    this.userData = userInfo || {};
  }

  set authInfo(authInfo) {
    this._authInfo = authInfo;
  }

  get authInfo() {
    return this._authInfo;
  }

  set userData(data) {
    this._userData = Object.freeze(data);
  }

  get userData() {
    return this._userData;
  }

  get id() {
    return this.userData.id;
  }

  static fromDoc(doc) {
    const userInfo = doc.data();
    userInfo.id = doc.id;

    return new UserModel(userInfo);
  }

  raw() {
    return this.userData;
  }

  get langs()
  {
    const user = this;

    return {
      get all() {
        return user.userData.info.langs || [];
      }
    }
  }

  get tags() {
    const user = this;
    return {
      get all() {
        return user.userData.info.tags || [];
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
    return this.userData.karma;
  }

  get lastActiveAt() {
    return this.userData.last_active_at.toDate();
  }
}

export {UserModel};