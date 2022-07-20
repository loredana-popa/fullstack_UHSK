const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({ parts }) => {
  return (
   parts.map((part, id) => <p key={id}>{part.name} {part.exercises}</p>))
}
 
const Course = ({ course }) => {

  return (
    <div>
      <Header courseName={course.name}/>
      <Part parts = {course.parts} />
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


  return <Course course={course} />
}

export default App;
