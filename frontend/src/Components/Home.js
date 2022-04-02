import React from 'react'
import { useEffect, useState } from 'react'
import Chart from './Chart'
function Home({candleData}) {
  const [chartData, setChartData] = useState([])
  // ALPACA STREAM CREDENTIALS
  let key = process.env.REACT_APP_ALPACA_API_ID
  let secret = process.env.REACT_APP_ALPACA_API_SECRET

  const url = 'wss://stream.data.alpaca.markets/v1beta1/crypto'
  const socket = new WebSocket(url)
  const auth = {'action':'auth', 'key': key, 'secret': secret}

  const subscribe = {"action":"subscribe", "trades":["ETHUSD"], "quotes":["ETHUSD"], "bars":["ETHUSD"]}
  socket.onmessage = function(event) {
    let data = JSON.parse(event.data)
    console.log(data)
    const message = data[0]['msg'];
    if (message =='connected') {
      console.log('authentication')
      socket.send(JSON.stringify(auth))
    }
  //   if (message == 'authenticated') {
  //     socket.send(JSON.stringify(subscribe));
  // }
  }
  useEffect(()=> {
    let temp = candleData?.map((can)=> {
      let t = parseInt(can['time'])
      let date = new Date(t*1000)
      let time = date.getTime() / 1000
      return ({
        time: time,
        open: can['open'],
        high: can['high'],
        low: can['low'],
        close: can['close'],
      })
    })
    if (temp) {
      setChartData(temp)
    }
    console.log(chartData)
  },[candleData])

  return (
    <div class ='container mx-auto'>
        <div className='body flex items-center w-full bg-blue-50'>
            {candleData?<Chart data = {chartData}/> :null}
            <div class=''>
              Let's Go
            </div>
        </div>
        
    </div>
  )
}

export default Home