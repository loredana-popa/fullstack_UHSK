const Header = (props) => {
  // console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.cPart} {props.nrExercises}</p>
  )
  
}

const Content = (props) => {
  return (
    <div>
    <Part cPart={props.part} nrExercises={props.exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.totalEx}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      < Content part={part1.name} exercises={part1.exercises}/>
      < Content part={part2.name} exercises={part2.exercises}/>
      < Content part={part3.name} exercises={part3.exercises} />
      <Total totalEx={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App