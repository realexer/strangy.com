const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const server = require('./__sapper__/build/server/server');

exports.ssr = functions.https.onRequest((req, res) => {
	// req.baseUrl = '';
	server.app(req, res);
});
