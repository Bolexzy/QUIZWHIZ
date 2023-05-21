const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail, onAuthStateChanged } = require("firebase/auth")
const { initializeApp } = require('firebase/app')
const { getFirestore, collection, setDoc, doc, updateDoc, deleteDoc, getDocs } = require("firebase/firestore");


const express = require('express')
const bodyParser = require('body-parser')
const { nanoid } = require("nanoid")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const winston = require('winston');
const logger = winston.createLogger({
	level: 'info',
	transports: [new winston.transports.Console()]
});


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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

// Define a middleware to allow access to only authenticated users
function isLoggedIn(req, res, next) {
	const auth = getAuth();
	const user_id = auth.currentUser.uid;

	if (user_id) {
		logger.log('info', "mid: " + user_id)
		req.user_id = user_id;
		next()
	}
	else {
		res.status(401).send("unauthorized");
	}
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
			res.json({ "message": error.message });
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
/* method of creating quiz may not be too optimal */
/* may change the question_id to the user_id in future for faster queries */
app.post('/create_quiz', async (req, res) => {

	try {
		const auth = getAuth()
		const user_id = auth.currentUser.uid;
		const question_id = nanoid(20) + "_" + user_id;
		let questions = req.body;
		questions = { ...questions, "user_id": user_id, question_id }

		const docRef = await setDoc(doc(db, "Questions", question_id), questions);
		res.status(201).json({ "message": "success", questions, "doc": docRef })
	} catch (e) {
		res.status(500).json({ "message": e.message })
	}
})

/* update a quiz */
app.put('/update_quiz/:question_id', async (req, res) => {

	try {
		const question_id = req.params.question_id;
		const updatedQuestion = req.body;

		const docRef = doc(db, "Questions", question_id);
		await updateDoc(docRef, updatedQuestion);
		res.status(200).json({ "message": "success" })
	} catch (error) {
		res.status(500).json({ "message": error.message })
	}

})

/* delete a quiz */
app.delete('/delete_quiz/:question_id', async (req, res) => {
	try {
		const question_id = req.params.question_id;

		await deleteDoc(doc(db, "Questions", question_id));
		res.status(200).json({ "message": "success" })

	} catch (error) {
		res.status(500).json({ "message": error.message })
	}

})


/* get user created quizes */
app.get('/my_questions', async (req, res) => {

	try {
		let collection_list = []
		const querySnapshot = await getDocs(collection(db, "Questions"));

		querySnapshot.forEach((doc) => {
			if (getAuth().currentUser && (doc.data().user_id === getAuth().currentUser.uid)) {
				collection_list.push(doc.data());
			}
		});

		res.json({ "message": "success", collection_list })
	} catch (error) {
		res.status(500).json({ "message": error.message })
	}

})


/* start the server */
app.listen(4000, () => {
	console.log("Server is listening on port 4000")
})
