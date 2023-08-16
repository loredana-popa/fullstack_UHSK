import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();

const allowOriginis = ['http://localhost:3001'];
const options: cors.CorsOptions = {
	origin: allowOriginis,
};

app.use(cors(options));
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
