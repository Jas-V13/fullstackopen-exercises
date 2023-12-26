import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(0)
 
  
  const randomNum = (x,i) =>( x(i = Math.floor(Math.random() * anecdotes.length)))
  const voteClick = () => {
    const p=[...vote]; 
    p[selected] += 1;
    setVote(p);
    if (p[selected] > p[max]) 
      setMax(selected);
  }
  
  return (
    <div>
      <h1>Anectode of the Day</h1>
      <div>{anecdotes[selected]}</div>
      <div>Thi anectode has: {vote[selected]} votes</div>
      <button onClick={() => randomNum(setSelected, selected)}>Random anectode!</button>
      <button onClick={voteClick}>Vote</button>
      <h1>Most rated Anectode</h1>
      <div>{anecdotes[max]}</div>
      <div>With {vote[max]} votes!</div>
    </div>
  )
}

export default App