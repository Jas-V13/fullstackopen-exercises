import { div } from '@tensorflow/tfjs'
import { useState } from 'react'

const StatisticsLine = (p) =>{
  const t = p.n
  const v = p.v
  if(p.percent != null) {
    return( <div>{t} {v}%</div>)
  }
  return (
    <div>{t} {v}</div>
  )
}


const Statistics = (p) =>{
   const g = p.good
   const n = p.neutral
   const b = p.bad
   const t = p.totalClick
   const avg = (g - b)/ t
   const positive = (g/t)*100
   if(p.totalClick === 0)
   {
    return(
      <div>No Feedback given...</div>
    )
   }
   return(
    <div>
      <StatisticsLine n="good" v={g}/>
      <StatisticsLine n="neutral" v={n}/>
      <StatisticsLine n="bad" v={b}/>
      <StatisticsLine n="total:" v={t}/>
      <StatisticsLine n="average:" v={avg}/>
      <StatisticsLine n="positive" v={positive} percent={1}/>
      </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0) //1
  const [neutral, setNeutral] = useState(0) //0
  const [bad, setBad] = useState(0) // -1

  const [totalClick, setTotal] = useState(0)

 

  return (
    <div>
      <div>
        <h1>Give us a feedback!</h1>
      <Button n="Good" set={setGood} v ={good} setT={setTotal} t={totalClick}/>
      <Button n="Neutral" set={setNeutral} v ={neutral} setT={setTotal} t={totalClick}/>
      <Button n="Bad" set={setBad} v ={bad} setT={setTotal} t={totalClick}/>
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} neutral ={neutral} bad={bad} totalClick={totalClick}/>
    </div>
    
  )
}
const Button = (p) =>{
  const handleClick = (x, i) => { x(i + 1); p.setT(p.t + 1)}
  return (
      <button onClick={()=> handleClick(p.set,p.v)}>{p.n}</button>
  )

}

export default App