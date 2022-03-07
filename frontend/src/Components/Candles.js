import React, {useEffect, useState} from 'react'
import axios from 'axios'
function Candles({currentCoin, candleData, setCandleData}) {
    let [ratio, setRatio] = useState(10)
    let w = ratio * candleData.length +200
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
        var year = a.getFullYear();
        var month = a.getMonth() +1
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + '/' + date + '/' + year
        return time;
      }

    let renderCandles = candleData? (
        candleData?.map((can)=>{
            
            let low = can['low']
            let high = can['high']
            let open = can['open']
            let close = can['close']
            let volume = can['volume']
            
            let p1 = (candleData.indexOf(can)*ratio)+200
            let v1 = h-((low-minH)/d*h)
            let v2 = h-((high-minH)/d*h)
            let c1 = h-((open-minH)/d*h)
            let c2 = h-((close-minH)/d*h)
            return (
            <g>
                <line x1={p1} y1={v1-200} x2={p1} y2={v2-200} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'2'}} />
                <line x1={p1} y1={c1-200} x2={p1} y2={c2-200} style={{'stroke':'rgb(0,0, 232)', 'stroke-width':'5'}} />
            </g>
            )
        })
    ):(
        <div>No Data</div>
    )

    let renderAxis = candleData? (
        <g>
            <line x1={0+150} y1={-250} x2={0+150} y2={h-150} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'1'}} />
            <line x1={0+150} y1={h-150} x2={w+200} y2={h-150} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'1'}} />
        </g>
    ) : (
        <div></div>
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
        <div class = 'border flex rounded shadow-lg bg-slate-50'>
            <svg viewBox= {`-110 -210 ${w+210} ${h+210}`} class="chart p-10" vector-effect='non-scaling-stroke'>
                    <text className="label" x='0' y={h-200}>{minH}</text>
                    <text className="label" x='0' y={-150}>{maxH}</text>
                    <text className="label" x={150} y={h-10} >{start_time}</text>
                    <text className="label" x={w-200} y={h-10}>{end_time}</text>
                {renderCandles}
                {renderAxis}
                
            </svg>
            <div class='p-2 flex'>
                <label class='font-bold'>
                    <input class='p-1 mr-1' type='checkbox'></input>
                    Volume
                </label>
            </div>
        </div>
    </div>
  )
}

export default Candles