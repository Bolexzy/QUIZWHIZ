const nodemailer = require('nodemailer')
const emailValidator = require('deep-email-validator');

async function isEmailValid(email) {
	return emailValidator.validate(email)
}

exports.isValidEmail = async (email) => {
	const { valid, reason, validators } = await isEmailValid(email);
	const { smtp, regex, mx, typo } = validators

	if (!regex.valid || !typo.valid) {
		return validators[reason].reason
	}
	return "valid"
}


exports.setupNodemailer = (email, user) => {
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
		html: `<p>Please click this link to verify your email address: <a href="http://${process.env.api_address}/api/v2/verify/${user.verificationToken}">Link<a>`
	};

	return { mailOptions, transporter }
}



