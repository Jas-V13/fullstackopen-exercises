const App = () => {
  const course = [{
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
      },
      {
        name: 'Something to make a commit for',
        exercises: -1,
        id: 5
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

  
  return <Course course={course}/>
}

const Course = (props) => {
  const { course } = props;

  const formatted = course.map(v => 
  <div key ={v.id}>  
    <h1>{v.name}</h1>
    {v.parts.map(i => <p key={i.id}>{i.name} {i.exercises}</p>)}
    <p><strong>Total of {v.parts.map(i => i.exercises).reduce((t,n) => t+n)} exercises</strong></p>
  </div>)
  // this is probably a different solution from the arbitrary one, I wrote that one too before making this solution
  // I wanted to try to map each member of the course array so that could work with n elements and not just with course[0], course[1], etc...
  return (
    <div>
      {formatted}
    </div>

  );
}

export default App