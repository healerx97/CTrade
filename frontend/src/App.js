import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Route, Routes, useRouteMatch, useNavigate, Redirect} from 'react-router-dom'
// import components
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CoinPairs from './Components/CoinPairs';
import Candles from './Components/Candles';
function App() {
  let [candleData, setCandleData] = useState({})
  let [currentCoin, setCurrentCoin] = useState({})
  const navigate = useNavigate()
  

  return (   
      <div className="App">
        <Navbar navigate={navigate}/>
        <Routes>
          <Route path = '/allcoinpairs' element={<CoinPairs currentCoin={currentCoin} setCurrentCoin={setCurrentCoin} navigate={navigate}/>}/>
          <Route path = '/candles' element={<Candles candleData={candleData} setCandleData={setCandleData} currentCoin={currentCoin}/>}/>
          <Route path = '/' element={<Home/>}/>
        </Routes>

        
      </div>
  );
}

export default App;
