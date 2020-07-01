import {current_user} from '../stores/current_user'
import {Auth} from '../firebase/index'
import {UsersListAPI} from './Users'
import {UserModel} from './models/UserModel'
import {ApiResult, ApiResultCode} from "./common/ApiResult";

Auth.onAuthStateChanged(() =>
{
  if (Auth.currentUser)
  {
    const authInfo = {
      id: Auth.currentUser.uid,
      email: Auth.currentUser.email,
    };

    const initUser = (attemptsLeft) =>
    {
      if (attemptsLeft === 0)
        return;

      // first try to find user record with given auth.user id
      UsersListAPI.byId(authInfo.id).get()
      .then(doc =>
      {
        if (doc.exists)
        {
          const user = UserModel.fromDoc(doc);
          user.authInfo = authInfo;
          current_user.set(user);
        }
        else
        {
          // if user doesn't exists let's create it and retry initialization
          UsersListAPI.create(authInfo.id)
          .then(() => {
            initUser(attemptsLeft);
          });
        }
      }).catch((e) => {
        initUser(--attemptsLeft);
      }).finally(() => {

      });
    };

    initUser(3);

  } else {
    current_user.set(new UserModel());
  }
});

/**
 *
 * @param email
 * @param password
 * @returns {Promise<ApiResult>}
 */
const login = async (email, password) =>
{
  const result = new ApiResult();

  return Auth.createUserWithEmailAndPassword(email, password)
    .then((data) => {
      result.setSuccess(data);
      return result;
    })
    .catch((error) =>
    {

      if(error.code === 'auth/email-already-in-use')
      {
        return Auth.signInWithEmailAndPassword(email, password)
          .then((data) => {
            result.setSuccess(data);
            return result;
          })
          .catch((error) => {
            result.setError(ApiResultCode.invalid_request, error.code);
            return result;
          });
      } else {
        result.setError(ApiResultCode.invalid_request, error.code);
      }

      return result;
    });
};

export {Auth, login};