import firebase_admin from 'firebase-admin'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-functions'

import env from '../../../env';

import serviceAccount from './serviceAccountKey.json';
import {DBAccessor} from "../common/collections";

firebase_admin.initializeApp({
	credential: firebase_admin.credential.cert(serviceAccount),
	databaseURL: "https://strangy-a046f.firebaseio.com",
	databaseAuthVariableOverride: {
		uid: "be-strangy"
	}
});

const Firestore = firebase_admin.firestore();
const Auth = firebase_admin.auth();

if(env.dev.use_emulators) {
	Firestore.settings({
		host: "localhost:5002",
		ssl: false
	});
}

const dbAccessorAdmin = new DBAccessor(firebase_admin, Firestore);

export {Auth, dbAccessorAdmin}