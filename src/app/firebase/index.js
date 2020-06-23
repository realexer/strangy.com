import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-functions'
import 'firebase/firebase-storage'
import { firebaseConfig } from '../../_config/firebase'

import env from '../../env';

firebase.initializeApp(firebaseConfig);

const Firestore = firebase.firestore();
const Auth = firebase.auth();
const Functions = firebase.app().functions('europe-west1');
const Storage = firebase.storage();

if(env.dev.use_emulators) {
	Firestore.settings({
		host: "localhost:5002",
		ssl: false
	});

	firebase.functions().useFunctionsEmulator("http://localhost:5001")
}

export { Firestore, Auth, Functions, Storage }