import { div } from '@tensorflow/tfjs'
import { useState } from 'react'

const Avg = (props) => {
  const avg = (props.good - props.bad)/ props.total
  const positive = (props.good/ props.total)*100
  return (
    <div>
      <p>average: {avg}</p> 
      <p> positive: {positive}%</p> 
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0) //1
  const [neutral, setNeutral] = useState(0) //0
  const [bad, setBad] = useState(0) // -1

  const [totalClick, setTotal] = useState(0)

  const handleClick = (x, i) => { x(i + 1); setTotal(totalClick + 1)}

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
        <Avg good = {good} bad = {bad} total={totalClick}/>
      </div>
    </div>
    
  )
}

export default App