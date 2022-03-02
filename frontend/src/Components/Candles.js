import React, {useEffect, useState} from 'react'
import axios from 'axios'
function Candles({currentCoin, candleData, setCandleData}) {
    let w = 10 * candleData.length
    let h = w*3
    let [graphObj, setGraphObj] = useState({minH:99999,maxH:0,d:0})
    useEffect(()=> {
        console.log(currentCoin)
        console.log(candleData) 
        if (candleData) {
            for (let c in candleData) {
                //get min, max height of graph
                setGraphObj({
                    minH: Math.min(graphObj['minH'], candleData[c]['low']),
                    maxH: Math.max(graphObj['maxH'], candleData[c]['high']),
                    d: graphObj['d']
                })
            }
            setGraphObj({
                minH: graphObj['minH'],
                maxH: graphObj['maxH'],
                d: graphObj['maxH']-graphObj['minH']
            })
            console.log(w) 
        }
        

    },[])
    let renderCandles = candleData? (
        candleData?.map((can)=>{
            let time = can['time']
            let low = can['low']
            let high = can['high']
            let open = can['open']
            let close = can['close']
            let volume = can['volume']
            
            let p1 = String(candleData.indexOf(can)*10)
            let v1 = String((low-graphObj['minH'])/graphObj['d']*h)
            let v2 = String((high-graphObj['minH'])/graphObj['d']*h)
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