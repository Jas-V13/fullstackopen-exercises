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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  
  return <Course course={course}/>
}

const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(v => <p key={v.id}>{v.name} {v.exercises}</p>)}
      <p><strong>Total of {course.parts.map(v => v.exercises).reduce((t,n) => t+n)} exercises</strong></p>     
    </div>
  );
}

export default App