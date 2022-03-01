import React, {useEffect} from 'react'
import axios from 'axios'
function Candles({currentCoin, candleData, setCandleData}) {
    let w = 1000
    let h = 1000
    let minH = 99999
    let maxH = 0
    useEffect(()=> {
        console.log(currentCoin)
        console.log(candleData)
        w = 10 * candleData.length
        h = w*1.5
        if (candleData) {
            for (let c in candleData) {
                //get min, max height of graph
                minH = Math.min(minH, c['high'], c['low'])
                maxH = Math.max(maxH, c['high'], c['low'])   
            }
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
            
            
            let p1 = candleData.indexOf(candle)*10
            let v1 = 
            let v2
            return <line x1="10" y1="10" x2="0" y2="200" style={{'stroke':'rgb(0,0,0)', 'stroke-width':'20'}} />
        })
    ):(
        <div>No Data</div>
    )
    if (candleData) {
        
        
        for (let can in candleData) {
            
            
            return (
                <line x1="10" y1="10" x2="0" y2="200" style={{'stroke':'rgb(0,0,0)', 'stroke-width':'20'}} />
            )

        }
    }

  return (
    <div class='flex flex-col items-center'>
        <div>
            {currentCoin.id}
        </div>
        <div class = 'border flex'>
        <svg viewBox= {`-10 -10 ${w} 210`} class="chart p-10" vector-effect='non-scaling-stroke'>
            {()=> renderCandles()}
        </svg>
        </div>
    </div>
  )
}

export default Candles