const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({ parts }) => {
  return (
   parts.map(part => <p key = {part.id}>{part.name} {part.exercises}</p>))
}

const Total =({ exercises }) => {
  const initialValue = 0;
  const sum = exercises.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);

  return (
    <h4>total of {sum} exercises</h4>
  )
}
 
const Course = ({ course}) => {
  return (
    <div>
      <Header courseName={course.name}/>
      <Part parts = {course.parts} />
      <Total exercises = {course.parts.map((part) => part.exercises)} />
    </div>
  )
  }


const Courses =({ courses}) => {
  return (
    courses.map((course) => <Course key={course.id} course= {course}/>)
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App;
