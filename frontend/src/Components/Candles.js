import React, {useEffect, useState} from 'react'
import axios from 'axios'
function Candles({currentCoin, candleData, setCandleData}) {
    let w = 10 * candleData.length +200
    let minH = candleData? (
        Math.min.apply(Math, candleData.map(function(o) { return o.low }))
    ): null
    let maxH = candleData? (
        Math.max.apply(Math, candleData.map(function(o) { return o.high }))
    ): null
    let d = minH? (
        maxH-minH
    ): 0
    let h = w/2 +500
    
    
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year
        return time;
      }

    let renderCandles = candleData? (
        candleData?.map((can)=>{
            
            let low = can['low']
            let high = can['high']
            let open = can['open']
            let close = can['close']
            let volume = can['volume']
            
            let p1 = (candleData.indexOf(can)*10)+200
            let v1 = h-((low-minH)/d*h)
            let v2 = h-((high-minH)/d*h)
            let c1 = h-((open-minH)/d*h)
            let c2 = h-((close-minH)/d*h)
            return (
            <g>
                <line x1={p1} y1={v1-200} x2={p1} y2={v2-200} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'2'}} />
                <line x1={p1} y1={c1-200} x2={p1} y2={c2-200} style={{'stroke':'rgb(0,0,100)', 'stroke-width':'5'}} />
            </g>
            )
        })
    ):(
        <div>No Data</div>
    )

    let startT = candleData[0]?.time
    let start_time = timeConverter(startT)
    let endT = candleData[candleData.length-1]?.time
    let end_time = timeConverter(endT)
  return (
    <div class='flex flex-col items-center'>
        <div class='text-xl font-bold p-3 border border-x-transparent bg-blue-100 rounded-xl shadow-md mb-2'>
            {currentCoin.id}
        </div>
        <div class = 'border flex rounded shadow-lg'>
        <svg viewBox= {`-110 -210 ${w+210} ${h+210}`} class="chart p-10" vector-effect='non-scaling-stroke'>
            <text className="label" x='90' y={h-100} style={{'text-anchor':'end'}}>{minH}</text>
            <text className="label" x='90' y={-90} style={{'text-anchor':'end'}}>{maxH}</text>
            <text className="label" x={200} y={h-10} style={{'text-anchor':'center'}}>{start_time}</text>
            <text className="label" x={w-200} y={h-10} style={{'text-anchor':'center'}}>{end_time}</text>
            {renderCandles}
        </svg>
        </div>
    </div>
  )
}

export default Candles