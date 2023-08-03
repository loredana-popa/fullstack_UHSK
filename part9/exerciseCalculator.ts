interface Result {
	periodLength: number
	trainingDays: number
	dailyTarget: number
	avgTime: number
	success: boolean
	rating: number
	ratingDescription: string
}

interface CalculateExValues {
	rating: number
	data: number[]
}

const parseArgs = (args: string[]): CalculateExValues => {
	const argsArr: string[] = process.argv.slice(3)
	const a: number[] = argsArr.map((e) => parseInt(e))
	const b: number = Number(process.argv[2])
	const onlyNumbers: boolean = a.every((e) => !isNaN(e))

	if (args.length < 4) throw new Error('Not enough arguments')

	if (onlyNumbers && !isNaN(b)) {
		return {
			rating: b,
			data: a,
		}
	} else {
		throw new Error('Provided values are not numbers!')
	}
}

const calculateExercises = (a: number, b: number[]): Result => {
	const periodLength: number = b.length
	const trainingDays: number = b.filter((e) => e > 0).length
	const sumTime: number = b.reduce((a, b) => a + b, 0)
	const avgTime: number = sumTime / periodLength
	const success: boolean = avgTime >= a

	// rating is calculated based on the formula:
	// Total Decimal Score) / (Total Maximum Decimal Score) x (Maximum Numeric Rating)
	// here the Maximum Numeric Rating is 3
	// apply decimal rounding for rating result
	const decimalScore: number[] = b.map((e) => {
		if (0 <= e && e <= a / 2) {
			return 1 / 3
		} else if (a / 2 < e && e < a) {
			return 2 / 3
		} else {
			return 3 / 3
		}
	})
	const totalDecimalScore: number = decimalScore.reduce((a, b) => a + b, 0)
	const totalMaxDecimalScore: number = 1 * periodLength
	const rating: number = Math.round(
		(totalDecimalScore / totalMaxDecimalScore) * 3
	)
	const ratingDescription: string =
		rating == 3
			? 'Congratulations! You achieved your goal!'
			: rating == 2
			? 'Not that bad but could be better'
			: 'You need to put some effort here!'

	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		dailyTarget: a,
		avgTime: avgTime,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
	}
}

try {
	const { rating, data } = parseArgs(process.argv)
	calculateExercises(rating, data)
	console.log(calculateExercises(rating, data))
} catch (error: unknown) {
	let errorMessage = 'Something had happened.'
	if (error instanceof Error) {
		errorMessage += 'Error: ' + error.message
	}
	console.log(errorMessage)
}
