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
  <div>
    Number of exercises :{sum}
  </div>
  )
}

export default Total
