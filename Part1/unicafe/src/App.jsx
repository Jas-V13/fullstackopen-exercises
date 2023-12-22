import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (x, i) => { x(i + 1)}

  return (
    <div>
      <div>
        <h1>Give us a feedback!</h1>
      <button onClick={() => handleClick(setGood, good)}>Good</button>
      <button onClick={() => handleClick(setNeutral, neutral)}>Neutral</button>
      <button onClick={() => handleClick(setBad, bad)}>Bad</button>
      </div>
      <div>
        <h1>Statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
    
  )
}

export default App