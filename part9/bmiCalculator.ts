interface CalculateBmiValues {
	height: number
	weight: number
}

const parseArguments = (args: string[]): CalculateBmiValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error('Provided values are not numbers!');
	}
};

export const calculateBmi = (h: number, w: number): string => {
	const bmi = w / Math.pow(h / 100, 2);

	if (bmi < 18.5) {
		return 'Underweight (Unhealthy)';
	} else if (18.5 <= bmi && bmi <= 24.9) {
		return 'Normal (healthy weight)';
	} else if (25 <= bmi && bmi <= 29.9) {
		return 'Overweight';
	} else {
		return 'Obese';
	}
};

try {
	const { height, weight } = parseArguments(process.argv);
	calculateBmi(height, weight);
	console.log(calculateBmi(height, weight));
} catch (err: unknown) {
	let errMessage = 'Something bad happened';
	if (err instanceof Error) {
		errMessage += 'Error: ' + err.message;
	}
	console.log(errMessage);
}
