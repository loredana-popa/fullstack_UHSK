import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
	const weight = Number(req.query.weight)
	const height = Number(req.query.height)
	if (isNaN(weight) || isNaN(height)) {
		res.json({
			error: 'malformed parameters',
		})
	} else {
		res.json({
			weight: weight,
			height: height,
			bmi: calculateBmi(height, weight),
		})
	}
})

const PORT = 3003
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
