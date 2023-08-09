import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
	const weight = Number(req.query.weight);
	const height = Number(req.query.height);

	if (isNaN(weight) || isNaN(height)) {
		res.json({
			error: 'malformed parameters',
		});
	} else {
		res.json({
			weight: weight,
			height: height,
			bmi: calculateBmi(height, weight),
		});
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { target, data } = req.body;
	const validateNumbers: boolean = data.every((e: number) => !isNaN(e));

	if (!target || !data) {
		return res.status(400).json({ error: 'parameters missing' });
	} else if (isNaN(target) || !validateNumbers) {
		return res.status(400).json({ error: 'malformatted parameters' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculateExercises(target, data);
	return res.json(result);
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
