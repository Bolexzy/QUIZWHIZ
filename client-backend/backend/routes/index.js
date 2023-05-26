var express = require('express');
var router = express.Router();

const admin = require("firebase-admin");

admin.initializeApp({
  apiKey: "AIzaSyDrcB0RrBSaQn5-2mbYmGyS5zlzkc9slps",
  authDomain: "quizwhiz-72df8.firebaseapp.com",
  databaseURL: "https://quizwhiz-72df8-default-rtdb.firebaseio.com",
  projectId: "quizwhiz-72df8",
  storageBucket: "quizwhiz-72df8.appspot.com",
  messagingSenderId: "412874254362",
  appId: "1:412874254362:web:9c8128380ab932112b89a3"
});

const db = admin.firestore();

//Test routes

router.get('/', function(req, res) {
  res.end('home');
});

router.get('/test', function(req, res) {

  res.send('doing something');
  
  db.collection('test').add({
    me:'stan'
  });

  res.end();
});


/* Teacher routes */
router.post('/setquiz/:quizId', function(req, res) {


  res.end();
});

router.get('/getquiz/:quizId', function(req, res) {
  res.send('hi from stan')


  res.end();

});


/* Student route */

router.get('/quizinfo/:quizId', function(req, res) {
  res.send('hi from stan')


  res.end();

});

router.get('/submit/:quizId', function(req, res) {
  res.send('hi from stan')


  res.end();

});




// export async function verifyToken(request){
//   try {
//     const token = await getToken(request);

//     if (!token) {
//       return false;
//     }

//     const payload = await auth.verifyIdToken(token);
//     return payload !== null;
//   } catch (err) {
//     return false;
//   }
// }


// async function getToken(request) {
//   if (!request.headers.authorization) {
//     return undefined;
//   }
//   const token = 
//         request.headers.authorization.replace(/^Bearer\s/, '');
//   return token;
// }

module.exports = router;
