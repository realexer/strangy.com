import firebase from 'firebase'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-functions'
import { firebaseConfig } from '../../../_config/firebase'

import env from '../../../env';
import {DBAccessor} from "../common/collections";

firebase.initializeApp(firebaseConfig);

const Firestore = firebase.firestore();
const Auth = firebase.auth();
const Functions = firebase.app().functions('europe-west1');

if(env.dev.use_emulators) {
	Firestore.settings({
		host: "localhost:5002",
		ssl: false
	});

	firebase.functions().useFunctionsEmulator("http://localhost:5001")
}

const dbAccessorApp = new DBAccessor(firebase, Firestore);

export { Auth, Functions, dbAccessorApp}