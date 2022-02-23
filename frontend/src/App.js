import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  let [coin, setCoin] = useState({})
  let [candleData, setCandleData] = useState({})
  useEffect(()=> {
    axios
    .get('/api/coins')
    .then((res)=> {
      console.log(res.data)
      setCoin(res.data[0])
    })

    axios
    .get()
  },[])

  return (
    <div className="App">

      <div className='body'>
        {coin['id']}
      </div>
    </div>
  );
}

export default App;
