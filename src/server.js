import './database/config.database';
import app from './app';

app.listen(app.get('port'), err => {
	if (err) console.err(`Error listening port: ${err}`);
	console.info(`Server running on port ${app.get('port')}`);
});