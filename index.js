const Express = require('express');
const helmet = require('helmet');
const fileController = require('./FileController');

const PORT = process.env.PORT || 3113;

const app = new Express();

// optional but provides more safety
app.use(helmet());
app.get('/f', fileController.get);

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	}

	console.info(`Proxy Server Ready on Port ${PORT}`);
});
