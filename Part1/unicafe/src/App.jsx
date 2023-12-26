import { div } from '@tensorflow/tfjs'
import { useState } from 'react'


const Statistics = (p) =>{
   const g = p.good
   const n = p.neutral
   const b = p.bad
   const t = p.totalClick
   const avg = (g - b)/ t
   const positive = (g/t)*100
  return (
    <div>
    <h1>Statistics</h1>
        <p>good {g}</p>
        <p>neutral {n}</p>
        <p>bad {b}</p>
        <p>total: {t}</p>
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
      <Statistics good={good} neutral ={neutral} bad={bad} totalClick={totalClick}/>
    </div>
    
  )
}

export default App