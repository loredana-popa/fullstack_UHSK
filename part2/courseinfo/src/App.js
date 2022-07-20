const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({ partName}) => {
  return (
    <div>{partName}</div>
  )
}
 
const Course = ({courseName, partName}) => {
  return (
    <div>
      <Header courseName={courseName}/>
      <Part partName={partName}/>
    </div>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const coursePartsName = (course) => {
    return (course.parts.map((part, id) => <div key={id}>{part.name}</div> ))
  }

  return <Course 
            courseName={course.name} 
            partName={coursePartsName(course)}/>
}

export default App;
