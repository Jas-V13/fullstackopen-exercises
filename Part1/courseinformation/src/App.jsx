const App = () => {
  
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const course = 'Half Stack application development!'
  
  return (
    <div>
      <Header course={course}/>
      <Content x1={exercises1} x2={exercises2} x3={exercises3} p1={part1} p2={part2} p3={part3}/>
      <Total x1={exercises1} x2={exercises2} x3={exercises3}/>
    </div>
  )
}
const Header = (props) => {
  return(
  <div>
  <h1>{props.course}</h1>
  </div>
  )

}
const Content = (props) => {
  return(
    <div>
      <p>
        {props.p1} {props.x1}
      </p>
      <p>
        {props.p2} {props.x2}
      </p>
      <p>
        {props.p3} {props.x3}
      </p>
    </div>
  )

}
const Total = (props) => {
  return(
    <div>
      <p>Number of exercises: {props.x1 + props.x2 + props.x3}</p>
    </div>
  )

}
export default App