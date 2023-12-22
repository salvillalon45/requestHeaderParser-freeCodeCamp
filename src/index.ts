import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3000;

app.get('/api/whoami', function (req, res, next) {
	const { ip, headers } = req;

	const ipaddress = ip;
	const language = headers['accept-language'];
	const software = headers['user-agent'];
	const responseObject = {
		ipaddress,
		language,
		software
	};

	res.send(responseObject);
});

app.listen(PORT, () => console.log('Running on port ' + PORT));
