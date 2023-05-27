require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const user_routes = require('./routes/userRoutes');
const quiz_routes = require('./routes/questionRoutes')
const result_routes = require('./routes/resultRoutes')
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 3000;
const winston = require('winston');

const logger = winston.createLogger({
	level: 'info',
	transports: [new winston.transports.Console()]
});


mongoose.connect(process.env.DB_URI_REMOTE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => logger.log('info', 'Connected to MongoDB'))
	.catch((error) => logger.log('info', error.message));


app.use(bodyParser.json());

// Mount the routes as middleware
app.use('/api/v2/', user_routes);
app.use('/api/v2/', quiz_routes);
app.use('/api/v2/', result_routes);


app.listen(port, '0.0.0.0', () => {
	logger.log('info', `Server listening on port ${port}`);
});
