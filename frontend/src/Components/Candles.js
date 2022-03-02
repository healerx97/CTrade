import React, {useEffect, useState} from 'react'
import axios from 'axios'
function Candles({currentCoin, candleData, setCandleData}) {
    let w = 10 * candleData.length
    let minH = candleData? (
        Math.min.apply(Math, candleData.map(function(o) { return o.low }))
    ): null
    let maxH = candleData? (
        Math.max.apply(Math, candleData.map(function(o) { return o.high }))
    ): null
    let d = minH? (
        maxH-minH
    ): 0
    let h = d? d:1000
    
    console.log(minH)
    console.log(h)
    let renderCandles = candleData? (
        candleData?.map((can)=>{
            let time = can['time']
            let low = can['low']
            let high = can['high']
            let open = can['open']
            let close = can['close']
            let volume = can['volume']
            
            let p1 = String(candleData.indexOf(can)*10)
            let v1 = String((low-minH)/d*h)
            let v2 = String((high-minH)/d*h)
            return <line x1={p1} y1={v1} x2={p1} y2={v2} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'1'}} />
        })
    ):(
        <div>No Data</div>
    )
  return (
    <div class='flex flex-col items-center'>
        <div>
            {currentCoin.id}
        </div>
        <div class = 'border flex'>
        <svg viewBox= {`-10 -10 ${w} ${h}`} class="chart p-10" vector-effect='non-scaling-stroke'>
            {renderCandles}
        </svg>
        </div>
    </div>
  )
}

export default Candles