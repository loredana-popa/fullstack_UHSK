import { CoursePart} from "../types"
import Part from '../components/Part'

interface ContentProps{
  parts:CoursePart[]
}
const Content = (props:ContentProps) =>{

  return (
    <div>
      {props.parts.map((p,i) =>
        <Part part={p} key={i}/>)}
    </div>
  )
}

export default Content