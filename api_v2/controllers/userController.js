const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const crypto = require('crypto');
const emailService = require('../services/emailService')
var admin = require("firebase-admin");

var serviceAccount = require("../firebaseServiceAccount.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	/* databaseURL: "https://quizwhiz-72df8-default-rtdb.firebaseio.com" */
});


const winston = require('winston');
const logger = winston.createLogger({
	level: 'info',
	transports: [new winston.transports.Console()]
});

/* register user */
exports.register = async (req, res) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const email = req.body.email;
		const verificationToken = crypto.randomBytes(8).toString('hex');
		const user = new User({ email, password, verificationToken })
		let emailExists = false
		let returnMessage = ""
		const isValidEmail = await emailService.isValidEmail(email)

		if (isValidEmail !== "valid") {
			return res.status(400).send({
				message: "Please provide a valid email address.",
				reason: isValidEmail
			})
		}
		else {
			/* check if user is already verified */
			await User.find({ email })
				.then(async (result) => {
					if (result.length > 0 && result[0].isVerified) {
						emailExists = true
						returnMessage = "Email already exists"
						logger.log('info', "email already exists")
						return res.status(500).json({ message: returnMessage })

					} else if (result.length > 0 && !result[0].isVerified) {
						returnMessage = "Verification email sent"
						await User.findOneAndUpdate({ email }, { verificationToken, updatedAt: Date.now() })
							.then(() => {
								logger.log('info', 'verification token updated')

								const emailServiceOptions = emailService.setupNodemailer(email, user)
								const transporter = emailServiceOptions.transporter
								const mailOptions = emailServiceOptions.mailOptions
								transporter.sendMail(mailOptions, async (error, info) => {
									if (error) {
										returnMessage = error.message
										logger.log('info', error)
										return res.status(500).json({ message: returnMessage })
									} else {
										returnMessage = "Verification email sent"
										return res.status(500).json({ message: returnMessage })
									}
								})
							})
							.catch(error => {
								logger.log('info', { message: error })
								returnMessage = error.message
								
							})
					}
					else {
						const emailServiceOptions = emailService.setupNodemailer(email, user)
						const transporter = emailServiceOptions.transporter
						const mailOptions = emailServiceOptions.mailOptions

						transporter.sendMail(mailOptions, async (error, info) => {
							if (error) {
								returnMessage = error.message
								logger.log('info', error)
								return res.status(500).json({ message: returnMessage })
							} else {
								await user.save().then(() => {
									returnMessage = "Verification email sent"
									logger.log('info', "user saved")
									return res.status(200).json({ message: returnMessage })
								}).catch(async error => {
									logger.log('info', error.message)
									returnMessage = error.message
									return res.status(500).json({ message: returnMessage })
								})
							}

						})
					}
				})
				.catch(error => {
					logger.log('info', { message: error.message })
					returnMessage = error.message
					return res.status(500).json({ message: returnMessage })
				})
		}

	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

/* login user */
exports.login = async (req, res) => {
	try {
		let token = null
		logger.log('info', req.body)
		if (req.body.google_login) {
			/* implement google login */
			const firebaseToken = req.body.password;
			admin.auth().verifyIdToken(firebaseToken)
				.then(async decodedToken => {
					// Token is valid, "decodedToken" contains user info
					const userId = decodedToken.uid;

					await User.find({ email: req.body.email })
						.then(async result => {
							if (result.isVerified) {
								return res.status(401).json({ message: "User already exists" })
							}
							else {
								/* insert user in db if not already existing */
								await User.updateOne(
									{ email: req.body.email },
									{ ...req.body, password: userId, isVerified: true, verificationToken: undefined },
									{ upsert: true },
									(err, doc) => {
										if (!err) {
											/* Generate token */
											token = jwt.sign({ userId: doc._id, email: doc.email, role: doc.role }, process.env.JWT_SECRET, { expiresIn: '48h' });
											return res.status(200).json({ token: token });
										}
										else {
											logger.log('info', err)
											return res.status(401).json({ message: "Authentication failed" })
										}
									}
								)
							}
						})
						.catch(error => {
							return res.status(401).json({ message: error.message })
						})
				})
				.catch(error => {
					return res.status(500).json({ message: error.message })
				})
		} else {
			const user = await User.findOne({ email: req.body.email });

			if (!user) {
				return res.status(401).json({ message: "Authentication failed" })
			}

			const passwordMatch = await bcrypt.compare(req.body.password, user.password);
			if (!passwordMatch) {
				return res.status(401).json({ message: "Incorrect password" })
			}

			if (!user.isVerified) {
				return res.status(401).json({ message: "Email address is not verified" })
			}

			token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '48h' });

			return res.status(200).json({ token: token });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

exports.verify = async (req, res) => {
	try {
		const user = await User.findOne({ verificationToken: req.params.token });

		if (!user) {
			return res.status(400).json({ message: 'Invalid verification token' });
		}
		user.isVerified = true;
		user.verificationToken = undefined;
		await user.save()
		return res.status(200).json({ message: 'Email verified successfully' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

exports.password_reset = async (req, res) => {
	const { email, newPassword } = req.body;

	// Find the user with the provided email address in the database
	const user = await User.findOne({ email })

	if (!user) {
		// If the user is not found, return an error
		res.status(401).json({ message: 'Invalid email' });
	} else {
		const newPasswordHash = await bcrypt.hash(newPassword, 10);
		await User.findOneAndUpdate({ email }, { password: newPasswordHash, updatedAt: Date.now() });
		res.status(200).json({ message: 'Password reset successful' });
	}
}

exports.logout = (req, res) => {
	/* destroy jwt token on client side */
	res.status(200).json({ message: "logout successful" })
}
