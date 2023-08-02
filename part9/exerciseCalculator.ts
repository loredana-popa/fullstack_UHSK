interface Result {
  periodLength: number,
  trainingDays: number,
  dailyTarget: number,
  avgTime: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

const calculateExercises = (a:number[], b:number): Result =>{
  const periodLength = a.length
  const trainingDays = a.filter(e => e > 0).length
  const sumTime = a.reduce((a,b) => a + b, 0)
  const avgTime = (sumTime/periodLength)
  const success = avgTime >= b

// rating is calculated based on the formula:
// Total Decimal Score) / (Total Maximum Decimal Score) x (Maximum Numeric Rating)
// here the Maximum Numeric Rating is 3
// apply decimal rounding for rating result
  const decimalScore = a.map((e)=> {
    if (0<= e && e <= (b/2))
      { return 1/3}
    else if( (b/2) <e && e < b)
      {return 2/3}
    else 
      {return 3/3}
    }
  )
  const totalDecimalScore = decimalScore.reduce((a,b)=> a + b,0)
  const totalMaxDecimalScore = (1 * periodLength)
  const rating = Math.round(totalDecimalScore / totalMaxDecimalScore * 3)
  const ratingDescription = (rating == 3) ? 'Congratulations! You achieved your goal!' : (rating == 2) ? 'Not that bad but could be better' : 'You need to put some effort here!'

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    dailyTarget: b,
    avgTime: avgTime,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))