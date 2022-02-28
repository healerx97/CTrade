import React, {useEffect} from 'react'
import axios from 'axios'
function Candles({currentCoin, candleData, setCandleData}) {
    useEffect(()=> {
        console.log(currentCoin)
        console.log(candleData)
    },[])
    function renderCandles() {

        if (candleData) {
            let w = 10 * candleData.length
            
            for (can in candleData) {
                let time = can['time']
                let low = can['low']
                let high = can['high']
                let open = can['open']
                let close = can['close']
                let volume = can['volume']
                

            }
        }
        else {
            return (
                <div>No Data</div>
            )
        }
    }

  return (
    <div class='flex flex-col items-center'>
        <div>
            {currentCoin.id}
        </div>
        <div class = 'border flex'>
        <svg viewBox="-10 -10 210 210" class="chart p-10" vector-effect='non-scaling-stroke'>
            <line x1="0" y1="0" x2="0" y2="200" style={{'stroke':'rgb(0,0,0)', 'stroke-width':'2'}} />
            <line x1="10" y1="0" x2="10" y2="200" style={{'stroke':'rgb(0,0,0)', 'stroke-width':'2'}} />
            <line x1="90" y1="0" x2="90" y2="200" style={{'stroke':'rgb(0,0,0)', 'stroke-width':'2'}} />
        </svg>
        </div>
    </div>
  )
}

export default Candles