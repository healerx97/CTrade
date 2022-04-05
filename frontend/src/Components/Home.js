import React from 'react'
import { useEffect, useState } from 'react'
import Chart from './Chart'
function Home({candleData}) {
  const [chartData, setChartData] = useState([])

  // ALPACA STREAM CREDENTIALS
  let key = process.env.REACT_APP_ALPACA_API_ID
  let secret = process.env.REACT_APP_ALPACA_API_SECRET

  const stream_url = 'wss://stream.data.alpaca.markets/v1beta1/crypto'
  const socket = new WebSocket(stream_url)
  const auth = {'action':'auth', 'key': key, 'secret': secret}

  


  const subscribe = {"action":"subscribe", "trades":["ETHUSD"], "quotes":["ETHUSD"], "bars":["ETHUSD"]}

  const unsubscribe = {"action": "unsubscribe", "trades":["ETHUSD"], "quotes":["ETHUSD"], "bars":["ETHUSD"]}
  
  let currentBar = candleData? candleData[candleData.length -1] : {}
  let trades = []

  useEffect(()=> {
    // let temp = candleData?.map((can)=> {
    //   let t = parseInt(can['time'])
    //   let date = new Date(t*1000)
    //   let time = date.getTime() / 1000
    //   return ({
    //     time: time,
    //     open: can['open'],
    //     high: can['high'],
    //     low: can['low'],
    //     close: can['close'],
    //   })
    // })

   },[candleData])

  return (
    <div class ='container mx-auto'>
        <div className='body flex items-center w-full bg-blue-50'>
            {candleData?<Chart data = {candleData}/> :null}
            <button class='' onClick={()=>socket.send(JSON.stringify(unsubscribe))}>
              Let's Go
            </button>
        </div>
        
    </div>
  )
}

export default Home