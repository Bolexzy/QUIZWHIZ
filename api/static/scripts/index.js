const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } = require("firebase/auth")
const { initializeApp } = require('firebase/app')

const express = require('express')
const bodyParser = require('body-parser')
const { nanoid } = require("nanoid")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const firebaseConfig = {
	apiKey: "AIzaSyDrcB0RrBSaQn5-2mbYmGyS5zlzkc9slps",
	authDomain: "quizwhiz-72df8.firebaseapp.com",
	projectId: "quizwhiz-72df8",
	storageBucket: "quizwhiz-72df8.appspot.com",
	messagingSenderId: "412874254362",
	appId: "1:412874254362:web:9c8128380ab932112b89a3"
};

/* initialize firebase app */
const firebaseApp = initializeApp(firebaseConfig);

/* get ref to firestore collection */
const db = firebase.firestore();

// Define a middleware to allow access to only authenticated users
function isLoggedIn(req, res, next) {
	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			next()
		} else {
			res.status(401).json({ "message": "unauthorized" })
		}
	});
}

/* register a new user */
app.post('/register', (req, res) => {
	const auth = getAuth()
	const { email, password } = req.body;

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			/* signed in */
			const user = userCredential.user;
			sendEmailVerification(auth.currentUser)
				.then(() => {
					/* verified email */
					res.status(201).json({ "message": "success", ...user });
				})
				.catch((error) => {
					res.status(error.code).json({ "message": error.code })
				})
		})
		.catch((error) => {
			res.status(error.code).json({ "message": error.message });
		})
})


/* login an existing user */
app.post('/login', (req, res) => {

	const auth = getAuth();
	const { email, password } = req.body;

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			if (!user.emailVerified) {
				res.status(401).json({ "message": "please verify your email" })
			}
			else {
				res.status(200).json({ "message": "success", ...user });
			}

		})
		.catch((error) => {
			res.status(error.code).json({ "message": error.message });
		});
})

/* logout a user */
app.get("/logout", isLoggedIn, (req, res) => {
	const auth = getAuth();

	signOut(auth).then(() => {
		res.json({ "message": "success" })
	}).catch((error) => {
		res.status(error.code).json({ "message": error.message });
	});
});


/* get authentication state */
app.get("/authstate", (req, res) => {
	const auth = getAuth();
	const user_data = auth.currentUser;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			res.send({ "message": "user is signed in", user: user_data })
		} else {
			res.send({ "message": "user is signed out", ...user })
		}
	});
})


app.post('/change_pic', isLoggedIn, (req, res) => {
	const { photoUrl } = req.body;
	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			updateProfile(auth.currentUser, {
				photoURL: photoUrl
			}).then(() => {
				res.status(200).json({ "message": "success" })
			}).catch((error) => {
				res.status(error.code).json({ "message": error.message })
			});
		} else {
			res.send({ "message": "user is signed out", ...user })
		}
	});
})


/* reset user pssword */
app.post('/resetpassword', (req, res) => {
	const auth = getAuth();
	const { email } = req.body;
	sendPasswordResetEmail(auth, email)
		.then(() => {
			res.status(200).json({ "message": "success" })
		})
		.catch((error) => {
			res.status(error.code).json({ "message": error.message });
		});
})


/* create a quiz */
app.post('/create_quiz', isLoggedIn, (req, res) => {
	const auth = getAuth();
	const user = auth.currentUser;
	const question_id = nanoid(20) + "_" + user.uid;
	let questions = req.body;

	questions = { ...questions, "user_id": user.uid, question_id }

	db.collection("Questions").doc(question_id).set(questions)
		.then(() => {
			res.status(201).json({ "message": "success", questions })
		}).catch((error) => {
			res.status(500).json({ "message": error })
		});
})

/* update a quiz */
app.put('/update_quiz/:question_id', isLoggedIn, (req, res) => {
	const question_id = req.params.question_id;
	const updatedQuestion = req.body;

	db.collection(Questions).doc(question_id).update({
		updatedQuestion
	})
		.then(() => {
			res.status(201).json({ "message": "success", updatedQuestion })
		}).catch((error) => {
			res.status(500).json({ "message": error });
		});
})

/* delete a quiz */
app.delete('/update_quiz/:question_id', isLoggedIn, (req, res) => {
	const question_id = req.params.question_id;

	db.collection(Questions).doc(question_id).delete()
		.then(() => {
			res.status(200).json({ "message": "success" })
		}).catch((error) => {
			res.status(500).json({ "message": error });
		});
})


/* get user created quizes */
app.get('/my_questions', isLoggedIn, (req, res) => {
	collection_list = []
	db.collection("Questions").where("quiz_id", "==", quizId).get()
		.then((querySnapshot) => {
			querySnapshot.forEach(doc => {
				collection_list.push(doc.data())
			})
			res.status(200).json({ "message": "success", collection_list })
		})
		.catch((error) => {
			res.status(500).json({ "message": error })
		})
})


/* start the server */
app.listen(4000, () => {
	console.log("Server is listening on port 4000")
})
