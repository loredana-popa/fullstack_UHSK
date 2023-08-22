import { Part } from "../types"

interface TotalProps{
  parts: Part[]
}

const Total =(props: TotalProps)=> {
  let sum = 0
  props.parts.map(p=>{
    sum += p.exerciseCount
  })

  return (
  <h3>
    Number of exercises :{sum}
  </h3>
  )
}

export default Total
