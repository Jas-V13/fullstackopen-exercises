const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]}
  
  return (
    <div>
      <Header course={course['name']}/>
      <Content course={course}/>
      <Total  course={course}/>
    </div>
  )
}
const Header = (props) => {
  return(
  <h1>{props.course}</h1>
  )

}
const Content = (props) => {
  return(
    <div>
      <Part part={props.course.parts[0].name} num={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} num={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} num={props.course.parts[2].exercises}/>
    </div>
  )

}
const Total = (props) => {
  return(
      <p>Number of exercises: {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  )

}
const Part = (props) =>{
  return(
    <div>
       <p>{props.part} {props.num}</p>
    </div>
  )
}
export default App