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
      <Content x1={part1.exercises} x2={part2.exercises} x3={part3.exercises} p1={part1.name} p2={part2.name} p3={part3.name}/>
      <Total x1={part1.exercises} x2={part2.exercises} x3={part3.exercises}/>
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
      <Part part={props.p1} num={props.x1}/>
      <Part part={props.p2} num={props.x2}/>
      <Part part={props.p3} num={props.x3}/>
    </div>
  )

}
const Total = (props) => {
  return(
      <p>Number of exercises: {props.x1 + props.x2 + props.x3}</p>
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