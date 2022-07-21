import React from "react"

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

export default Course;