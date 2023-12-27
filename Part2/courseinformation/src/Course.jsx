const Course = (props) => {
    const { course } = props;
  
    const formatted = course.map(v => 
    <div key ={v.id}>  
      <h1>{v.name}</h1>
      {v.parts.map(i => <p key={i.id}>{i.name} {i.exercises}</p>)}
      <p><strong>Total of {v.parts.map(i => i.exercises).reduce((t,n) => t+n)} exercises</strong></p>
    </div>)
    //from exercise 2.4:
    // this is probably a different solution from the arbitrary one, I wrote that one too before making this solution
    // I wanted to try to map each member of the course array so that could work with n elements and not just with course[0], course[1], etc...
    return (
      <div>
        {formatted}
      </div>
  
    );
  }

export default Course