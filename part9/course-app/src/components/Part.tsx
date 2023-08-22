import { CoursePart } from "../types"

interface PartProps{
  part: CoursePart
}

const Part =(props:PartProps)=>{
  const part = props.part
  const assertNever = (value:never): never =>{
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch(part.kind){
    case 'basic':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <em >{part.description}</em>
        </div>
        
      );
     case 'group':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <div> project exercises {part.groupProjectCount}</div>
        </div>
      );
      case 'background':
        return (
          <div>
            <h2>{part.name} {part.exerciseCount}</h2>
            <em>{part.description} </em>
            <div>submit to : {part.backgroundMaterial}</div>
          </div>
        );
      case 'special':
        return (
          <div>
            <h2>{part.name} {part.exerciseCount}</h2>
            <em>{part.description} </em>
            <div>required skils : {part.requirements.join(', ')}</div>
          </div>
        );
      default:
        return <p>{assertNever(part)}</p>



  }
}

export default Part