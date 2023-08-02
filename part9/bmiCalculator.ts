const calculateBmi = (h:number, w:number): string => {
  const bmi = w / Math.pow(h / 100, 2)

  if( bmi < 18.5){
    return 'Underweight (Unhealthy)'
  } else if (18.5 <= bmi && bmi <= 24.9){
    return 'Normal (healthy weight)'
  } else if (25 <= bmi && bmi <=29.9){
   return 'Overweight'
  } else {
    return 'Obese)'
  }

}

console.log(calculateBmi(180, 87))

// calculateBmi(160,54)