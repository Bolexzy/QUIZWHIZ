var express = require('express');
var router = express.Router();


const { initializeApp  } = require('firebase-admin/app');
// const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = "firebase-admin/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyDrcB0RrBSaQn5-2mbYmGyS5zlzkc9slps",
  authDomain: "quizwhiz-72df8.firebaseapp.com",
  databaseURL: "https://quizwhiz-72df8-default-rtdb.firebaseio.com",
  projectId: "quizwhiz-72df8",
  storageBucket: "quizwhiz-72df8.appspot.com",
  messagingSenderId: "412874254362",
  appId: "1:412874254362:web:9c8128380ab932112b89a3"
});

// const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

//Test route
router.post('/setquiz/:quizId', function(req, res) {
  db.collection('test').add({
    me:'you'
  })
});

/* Teacher routes */
router.post('/setquiz/:quizId', function(req, res) {
  res.send('hi from stan')
});

router.get('/getquiz/:quizId', function(req, res) {
  res.send('hi from stan')
});


/* Student route */

router.get('/quizinfo/:quizId', function(req, res) {
  res.send('hi from stan')
});

router.get('/submit/:quizId', function(req, res) {
  res.send('hi from stan')
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
