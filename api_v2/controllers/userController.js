const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const nodemailer = require('nodemailer')
const winston = require('winston');
const crypto = require('crypto');


const logger = winston.createLogger({
	level: 'info',
	transports: [new winston.transports.Console()]
});

const emailValidator = require('deep-email-validator');

async function isEmailValid(email) {
	return emailValidator.validate(email)
}

/* register user */
exports.register = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const email = req.body.email;
		const password = hashedPassword;
		const verificationToken = crypto.randomBytes(8).toString('hex');
		const user = new User({ email, password, verificationToken })
		const { valid, reason, validators } = await isEmailValid(email);
		const { smtp, regex, mx, typo } = validators;

		if (!smtp || !regex || !mx || !typo) {
			return res.status(400).send({
				message: "Please provide a valid email address.",
				reason: validators[reason].reason
			})
		}
		const transporter = nodemailer.createTransport({
			service: process.env.email_service,
			auth: {
				user: process.env.email,
				pass: process.env.password,
			},
		});
		const mailOptions = {
			from: "no-reply@gmail.com",
			to: email,
			subject: 'Verify your email address',
			html: `<p>Please click this link to verify your email address: <a href="http://${process.env.api_address}:${process.env.PORT}/api/v2/verify?token=${user.verificationToken}">Link<a>`
		};

		transporter.sendMail(mailOptions, async (error, info) => {
			if (error) {
				logger.log('info', error)
			} else {
				logger.log('info', 'Verification email sent: ' + info.response);

				await user.save().then(() => {
					/* user saved */
					logger.log('info', "user saved")
				}).catch(async error => {
					if (error.code == 11000) {
						if (!user.isVerified) {
							await User.findOneAndUpdate({ email }, { verificationToken })
								.then(() => {
									logger.log('info', 'verification token updated')
								})
								.catch(error => {
									logger.log('info', { message: error })
								})
						}
					}
				})
			}
		})
		return res.status(200).json({ message: "Make sure your email is already verified" })

	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

/* login user */
exports.login = async (req, res) => {
	try {
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

		const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '48h' });

		res.status(200).json({ token: token });

	} catch (error) {
		res.status(500).json({ message: error.message })
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
		await User.findOneAndUpdate({ email }, { password: newPasswordHash });
		res.status(200).json({ message: 'Password reset successful' });
	}
}

exports.logout = (req, res) => {
	/* destroy jwt token on client side */
	res.status(200).json({ message: "logout successful" })
}
