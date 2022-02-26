import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Route, Routes, useRouteMatch, useHistory, Redirect} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
// import components
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CoinPairs from './Components/CoinPairs';

function App() {
  let [candleData, setCandleData] = useState({})

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path = '/allcoinpairs' element={<CoinPairs/>}/>
        <Route path = '/' element={<Home/>}/>
      </Routes>

      
    </div>
    </Router>
  );
}

export default App;
