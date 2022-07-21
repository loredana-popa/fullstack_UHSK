const Header = ({ courseName, id }) => {
  return (
    <h1 key={id}>{courseName}</h1>
  )
}

const Part = ({ parts }) => {
  return (
   parts.map((part, id) => <p key={id}>{part.name} {part.exercises}</p>))
}

const Total = ({ exercises }) => {
  let sum = 0;
  for (let i = 0; i < exercises.length; i++) {
    sum += exercises[i];
  }
  return (
    <h4>total of {sum} exercises</h4>
  )
}
 
const Course = ({ course}) => {
  return (
    <div>
      <Header id ={course.id} courseName={course.name}/>
      <Part parts = {course.parts} />
      <Total exercises = {course.parts.map((part) => part.exercises)} />
    </div>
  )
  }


const Courses =({ courses}) => {
  return (
    courses.map((course,i) => <Course key={i} course= {course}/>)
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
