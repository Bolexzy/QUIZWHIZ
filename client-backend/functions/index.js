/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

 import { initializeApp } from 'firebase-admin/app';
import functions, { onRequest} from "firebase-functions/v2/https";
const logger = require("firebase-functions/logger");


const app = initializeApp();


// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {

    console.log('user created');
});


 exports.sendByeEmail = functions.auth.user().onDelete((user) => {
    console.log('user deleted')
  });