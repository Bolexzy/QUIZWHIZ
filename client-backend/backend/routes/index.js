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


/* TEACHER'S ROUTE */

/*create quiz*/
router.post('/create_quiz/:quizId?', function (req, res) {
  /* userId is in the quiz object  */
  let body = req.body;
  let authUser = req.quizwhiz_user;

  if (body.user_id !== authUser.uid) {
    res.status(401).json({ status: 'error', message: 'Not authorized' })
  } else {
    db.collection('tests').doc(body.test_id).set(body);
    res.json({ status: 'success' });
  }
});


/*get quiz*/
router.get('/quiz/:quizId', async function (req, res) {
  /* userId is in the quiz object  */
  const quizId = req.params.quizId;
  let authUser = req.quizwhiz_user;


  const testsRef = db.collection('tests');
  const docRef = testsRef.doc(quizId);
  const quizDoc = await docRef.get();
  const quiz = quizDoc.data();

  //if entry exists in the database
  if (quiz === undefined) {
    res.status(401).json({ status: 'error', message: 'Not authorized' })
  } else if (quiz.user_id !== authUser.uid) {
    res.status(401).json({ status: 'error', message: 'Not authorized' })
  }
  res.json(quiz);
});


/*get all quiz set by a particular user*/
router.get('/user/quiz/', async function (req, res) {
  /* userId is in the quiz object  */
  let authUser = req.quizwhiz_user;

  const testsRef = db.collection('tests');
  const query = testsRef.where('user_id', '==', `${authUser.uid}`).select('title', 'description', 'test_id', 'user_id');
  let result = await query.get()
  let newresult = [];
  result.forEach((quizDoc) => newresult.push(quizDoc.data()));

  if (newresult.length !== 0 && newresult[0].user_id !== authUser.uid) {
    res.status(402).json({ status: 'error', message: 'Not authorized' })
  } else {
    res.json(newresult);
  }
});


/*delete quiz*/
router.delete('/delete_quiz/:quizId', async function (req, res) {
  /* userId is in the quiz object  */
  const quizId = req.params.quizId;
  let authUser = req.quizwhiz_user;

  const testsRef = db.collection('tests');
  const docRef = testsRef.doc(quizId);
  const quizSnapshot = await docRef.get();
  const quiz = quizSnapshot.data();

  if (quiz.user_id !== authUser.uid) {
    res.status(401).json({ status: 'error', message: 'Not authorized' })
  } else {
    docRef.delete();
    res.json({ status: 'success' });
  }
});


//get all the quiz results for a particular quiz
router.get('/quiz/result/:quizId', async function (req, res) {
  const quizId = req.params.quizId;
  let authUser = req.quizwhiz_user;


  const resultRef = db.collection('results');
  const query = resultRef.where('quiz_id', '==', quizId)
  let result = await query.get();
  let newResults = []
  result.forEach((quizDoc) => {
    newResults.push(quizDoc.data())
  })

  if (newResults.length !== 0) {
    let quizSnapshot = await db.collection('tests').doc(newResults[0].quiz_id).get();
    let quiz = quizSnapshot.data();
    let quizAuthorSnapshot = await db.collection('users').doc(quiz.user_id).get();
    let quizOwner = quizAuthorSnapshot.data();

    if (quizOwner.uid !== authUser.uid) {
      res.append('Cache-Control', 'max-age=300')
      res.status(401).json({ status: 'error', message: 'Not authorized' })
    } else {
      res.append('Cache-Control', 'max-age=300')
      res.json(newResults)
    }
  }
});




/* STUDENT'S ROUTES */

/*get information ablout a quiz*/
router.get('/quizinfo/:quizId', async function (req, res) {
  const quizId = req.params.quizId;

  const testsRef = db.collection('tests');
  const query = testsRef.where('test_id', '==', quizId).select('title', 'description', 'allotted_time_in_mins', 'quiz_start_time', 'quiz_end_time');
  let result = await query.get()
  let newResults = []
  result.forEach((quizDoc) => {
    newResults.push(quizDoc.data())
  })
  res.append('Cache-Control', 'max-age=300')
  res.json(newResults[0])
});


/*take quiz*/
router.get('/taketest/:quizId', async function (req, res) {
  const quizId = req.params.quizId;
  const timestamp = Date.now();


  const testsRef = db.collection('tests');
  const docRef = testsRef.doc(quizId);
  let quizSnapshot = await docRef.get();
  let quiz = quizSnapshot.data();

  if ((quiz.quiz_start_time !== null && quiz.quiz_start_time !== 0) && timestamp < quiz.quiz_start_time) {
    res.json({ status: 'error', message: `Test will start on ${new Date(quiz.quiz_start_time).toString()}` })
  } else if ((quiz.quiz_end_time !== null && quiz.quiz_end_time !== 0) && timestamp > quiz.quiz_end_time) {
    res.json({ status: 'error', message: `Test ended on ${new Date(quiz.quiz_end_time).toString()}` })
  } else {
    quiz.questions.forEach((question) => {
      delete question.answer
    })
    res.json(quiz);
  }
});


/*submit quiz*/
router.post('/submit/:quizId', async function (req, res) {
  const authUser = req.quizwhiz_user;

  let numOfRightAnswers;

  //get the question from the database
  const docRef = db.collection('tests').doc(req.body.test_id);
  let doc = await docRef.get()
  const serverQuiz = doc.data()

  numOfRightAnswers = getNumOfRightAnswers(serverQuiz.questions, req.body.questions)

  const testResult = {
    quiz_id: serverQuiz.test_id,
    quiz_title: serverQuiz.title,
    quiz_description: serverQuiz.description,
    user_id: authUser.uid,
    user_name: authUser.name,
    profile_picture: authUser.picture,
    date_taken: Date.now(),
    total_questions: serverQuiz.questions.length,
    right_answers: numOfRightAnswers,
  }

  db.collection('results').add(testResult)
  res.json({ status: 'success' })
});


//get all the quiz results for a particular user
router.get('/result/:userId', async function (req, res) {
  const userId = req.params.userId;
  const authUser = req.quizwhiz_user

  if (authUser.uid !== userId) {
    res.status(401).json({ status: 'error', message: 'Not authorized' })
  } else {
    const resultRef = db.collection('results');
    const query = resultRef.where('user_id', '==', userId)
    let result = await query.get()
    let newResults = []
    result.forEach((quizDoc) => {
      newResults.push(quizDoc.data())
    })
    res.append('Cache-Control', 'max-age=300')
    res.json(newResults)
  }
});





//UTILITY ROUTES

//get all quiz marked as public
router.get('/public/quiz', async function (req, res) {

  const resultRef = db.collection('tests');
  const query = resultRef.where('private', '==', false)
  let result = await query.get()
  let newResults = []

  for (var i in result.docs) {
    const doc = result.docs[i];
    const docData = doc.data();

    let quizCreatorDoc = await db.collection('users').doc(docData.user_id).get();
    let quizCreatorData = quizCreatorDoc.data()

    docData.quizCreator = quizCreatorData;
    newResults.push(docData)
  }

  res.append('Cache-Control', 'max-age=300')
  res.json(newResults)
});



//get all the quiz results for a public quiz
router.get('/public/results/:quizId', async function (req, res) {
  const quizId = req.params.quizId;

  let quizSnapshot = await db.collection('tests').doc(quizId).get();
  let quiz = quizSnapshot.data();

  if (quiz.private === false) {
    let results = [];
    let resultsSnapshot = await db.collection('results').where('quiz_id', '==', quizId).get()
    resultsSnapshot.forEach((resultDoc) => {
      results.push(resultDoc.data())
    })
    res.append('Cache-Control', 'max-age=300')
    res.json(results)
  } else {
    res.append('Cache-Control', 'max-age=300')
    res.status(401).json({ status: 'error', message: 'Not authorized' })
  }
});


//add user to database
router.get('/adduser', async function (req, res) {
  const userInfo = req.quizwhiz_user;

  console.log(userInfo)

  const user = {
    name: userInfo.name,
    email: userInfo?.email || '',
    uid: userInfo.uid,
    picture: userInfo.picture
  }

  let usersRef = db.collection('users');
  usersRef.doc(userInfo.uid).set(user)

  res.json({ status: 'success' })
});



module.exports = { router, admin };
