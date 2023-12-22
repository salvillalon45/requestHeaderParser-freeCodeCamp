import express from 'express';

const app = express();

const PORT = 3000;

app.get('/api/whoami', function (req, res, next) {
	const { ip, socket, headers } = req;

	console.log('req.ip:: ', ip);
	console.log('req.socket.remoteAddress:: ', socket.remoteAddress);
	console.log(
		'req.headers["accept-language"]:: ',
		headers['accept-language']
	);
	console.log('req.headers["user-agent"]  ::', headers['user-agent']);
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
