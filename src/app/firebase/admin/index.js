import firebase_admin from 'firebase-admin'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-functions'
import { firebaseConfig } from '../../../_config/firebase'

import env from '../../../env';

import serviceAccount from './serviceAccountKey.json';

firebase_admin.initializeApp({
	credential: firebase_admin.credential.cert(serviceAccount),
	databaseURL: "https://strangy-a046f.firebaseio.com"
});

// firebase_admin.initializeApp(
// 	Object.assign({},
// 		firebaseConfig,
// 		{
// 			credential: firebase_admin.credential.applicationDefault(),
// 			databaseURL: 'http://localhost:5002'
// 		}));

const Firestore = firebase_admin.firestore();
const Auth = firebase_admin.auth();

if(env.dev.use_emulators) {
	Firestore.settings({
		host: "localhost:5002",
		ssl: false
	});
}

export {firebase_admin, Firestore, Auth}