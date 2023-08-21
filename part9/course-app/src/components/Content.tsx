import { Part } from "../types"

interface ContentProps{
  parts:Part[]
}
const Content = (props:ContentProps) =>{
  return(
    <div>
      {props.parts.map((p,i)=>
      <p key={i}>{p.name} {p.exerciseCount}</p>
      )}
    </div>
  )
  
 
}

export default Content