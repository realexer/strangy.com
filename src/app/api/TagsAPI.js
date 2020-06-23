import firebase from 'firebase/app'
import {TagsCollection, Firestore} from './index';

const TagKind = {
  INFO: 'INFO',
  INTEREST: 'INTEREST',
  LOCATION: 'LOCATION',
  AGE: 'AGE',
  OTHER: 'OTHER'
};

const TagKindLabels =
{
  [TagKind.INFO]: 'Info',
  [TagKind.INTEREST]: 'Interest',
  [TagKind.LOCATION]: 'Location',
  [TagKind.AGE]: 'Age',
  [TagKind.OTHER]: 'Other',
};

class TagsAPI
{
  static all(langs)
  {
    let query = TagsCollection;

    if(langs.length > 0) {
      query.where('lang', 'in', langs);
    }

    return query.orderBy('users_amount', "desc");
  };

  static create(tag, lang, kind, creatorId)
  {
    const tagObj = {
      tag: tag,
      lang: lang,
      kind: kind,
      creator_id: creatorId,
      users_amount: 1,
      created_at: new Date()
    };

    return TagsCollection.add(tagObj);
  };

  static incrementUsersAmount(tagId)
  {
    return TagsCollection.doc(tagId).update({
      users_amount: firebase.firestore.FieldValue.increment(1)
    });
  };

  static decrementUsersAmount(tagId)
  {
    return TagsCollection.doc(tagId).update({
      users_amount: firebase.firestore.FieldValue.increment(-1)
    });
  };
}

export {TagsAPI, TagKind, TagKindLabels};