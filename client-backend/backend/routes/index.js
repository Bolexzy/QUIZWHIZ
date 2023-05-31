var express = require('express');
var router = express.Router();

const admin = require("firebase-admin");

const { getNumOfRightAnswers } = require('../helper functions/quizMarker');


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
router.get('/', function (req, res) {
  res.end('home');
});

router.get('/test', function (req, res) {

  res.send('doing something');

  db.collection('test').add({
    me: 'stan'
  });

  res.end();
});

//testpost
router.post('/testpost', function (req, res) {


  console.log(req.body);


  res.send(JSON.stringify(req.body))

  res.end();
});


/* Teacher routes */
router.post('/create_quiz/:quizId?', function (req, res) {
  /* userId is in the quiz object  */
  let body = req.body;

  db.collection('tests').doc(body.test_id).set(body);
  res.end();
});


router.get('/quiz/:quizId', async function (req, res) {
  /* userId is in the quiz object  */
  const quizId = req.params.quizId;


  const testsRef = db.collection('tests');
  const docRef = testsRef.doc(quizId);
  const doc = await docRef.get();
  res.json(doc.data());
});


router.get('/user/quiz/:userId', async function (req, res) {
  /* userId is in the quiz object  */
  const userId = req.params.userId;

  const testsRef = db.collection('tests');
  const query = testsRef.where('user_id', '==', `${userId}`).select('title', 'description', 'test_id',);
  let result = await query.get()
  let newresult = [];
  result.forEach((quizDoc) => newresult.push(quizDoc.data()));
  res.json(newresult);
});


router.post('/delete_quiz/:quizId', function (req, res) {
  /* userId is in the quiz object  */
  const quizId = req.params.quizId;

  const testsRef = db.collection('tests');
  const docRef = testsRef.doc(quizId);
  docRef.delete();
  res.end();
});


/* Student route */
router.get('/quizinfo/:quizId', async function (req, res) {
  const quizId = req.params.quizId;

  const testsRef = db.collection('tests');
  const query = testsRef.where('test_id','==',quizId).select('title','description','alloted_time_in_mins', 'quiz_start_time','quiz_end_time');
  let result = await query.get()
  let newResults = []
  result.forEach((quizDoc)=>{
    newResults.push(quizDoc.data())
  })
  res.json(newResults[0])

});

router.get('/taketest/:quizId', async function (req, res) {
  const quizId = req.params.quizId;

  const testsRef = db.collection('tests');
  const docRef = testsRef.doc(quizId);
  let result = await docRef.get();
  result = result.data();
  result.questions.forEach((question)=>{
    delete question.answer
  })
  res.json(result);
});


router.post('/submit/:quizId', async function (req, res) {
  const authUser = req.quizwhiz_user;

  let numOfRightAnswers;

  //get the question from the database
  const docRef = db.collection('tests').doc(req.body.test_id);
  let doc = await docRef.get()
  const serverQuiz = doc.data()

  numOfRightAnswers = getNumOfRightAnswers(serverQuiz.questions, req.body.questions)

  const testResult={
    quiz_id: serverQuiz.test_id,
    quiz_title:serverQuiz.title,
    quiz_description: serverQuiz.description,
    user_id: authUser.uid,
    user_name: authUser.name,
    profile_picture:authUser.picture,
    date_taken: Date.now(),
    total_questions: serverQuiz.questions.length,
    right_answers:numOfRightAnswers,
  }

  db.collection('results').add(testResult)

  res.json({status:'success'})
});



//UTILITY ROUTES

//get all the quiz results for a particular user
router.get('/result/:userId', async function (req, res) {
  const userId = req.params.userId;

  const resultRef = db.collection('results');
  const query = resultRef.where('user_id','==',userId)
  let result = await query.get()
  let newResults = []
  result.forEach((quizDoc)=>{
    newResults.push(quizDoc.data())
  })
  res.json(newResults)
});

//get all the quiz results for a particular quiz
router.get('/quiz/result/:quizId', async function (req, res) {
  const quizId = req.params.quizId;

  const resultRef = db.collection('results');
  const query = resultRef.where('quiz_id','==',quizId)
  let result = await query.get()
  let newResults = []
  result.forEach((quizDoc)=>{
    newResults.push(quizDoc.data())
  })
  res.json(newResults)
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


module.exports = {router, admin};
