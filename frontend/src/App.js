import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Route, Routes, useRouteMatch, useNavigate, Redirect} from 'react-router-dom'
// import components
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CoinPairs from './Components/CoinPairs';
import Candles from './Components/Candles';
import useEventListener from '@use-it/event-listener'


function App() {
  let [candleData, setCandleData] = useState([])
  let [currentCoin, setCurrentCoin] = useState({})
  let [curTimeFrame, setCurTimeFrame] = useState('1 day')
  let [xOffSet, setXOffSet] = useState(0)
  const navigate = useNavigate()
    function svgHorizontal(e) {
        let maxOff = candleData?.length
        if (e.keyCode == 37) {
          if (xOffSet>= -maxOff) {
            setXOffSet(xOffSet-1)
          }
        } else if (e.keyCode == 39) {
          if (xOffSet<= maxOff) {
            setXOffSet(xOffSet+1)
          }
        }
    }

    useEventListener('keydown', svgHorizontal)

  return (   
      <div className="App">
        <Navbar navigate={navigate}/>
        <Routes>
          <Route path = '/allcoinpairs' element={<CoinPairs currentCoin={currentCoin} setCurrentCoin={setCurrentCoin} candleData={candleData} setCandleData={setCandleData} curTimeFrame={curTimeFrame} navigate={navigate}/>}/>
          <Route path = '/candles' element={<Candles candleData={candleData} setCandleData={setCandleData} currentCoin={currentCoin} curTimeFrame={curTimeFrame} setCurTimeFrame={setCurTimeFrame} xOffSet={xOffSet} setXOffSet={setXOffSet}/>}/>
          <Route path = '/' element={<Home/>}/>
        </Routes>

        
      </div>
  );
}

export default App;
