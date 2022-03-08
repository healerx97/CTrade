import React, {useEffect, useState} from 'react'
import axios from 'axios'
import RenderCandles from './RenderCandles'
import RenderAxis from './RenderAxis'
function Candles({currentCoin, candleData, setCandleData}) {
    let [ratio, setRatio] = useState(10)
    let [scale, setScale] = useState(0.2)
    let w = ratio * candleData.length
    let minH = candleData? (
        Math.min.apply(Math, candleData.map(function(o) { return o.low }))
    ): null
    let maxH = candleData? (
        Math.max.apply(Math, candleData.map(function(o) { return o.high }))
    ): null
    let d = minH? (
        maxH-minH
    ): 0
    let h = w/1.5
    
    

  return (
    <div class='flex flex-col items-center'>
        <div class='text-xl font-bold p-3 border border-x-transparent bg-blue-100 rounded-xl shadow-md mb-2'>
            {currentCoin.id}
        </div>
        <div class = 'border w-3/4 flex justify-center rounded shadow-lg bg-slate-50'>
            <svg viewBox= {`-${w*scale} -${h*scale} ${w*(1+scale*2)} ${parseInt(h*(1+scale*2))}`} class="chart p-10" vector-effect='non-scaling-stroke'>
                    
                {candleData? <RenderCandles candleData={candleData} w={w} h={h} d={d} minH={minH} ratio={ratio} scale={scale}/> : null}
                {candleData? <RenderAxis candleData={candleData} minH={minH} maxH={maxH} w={w} h={h} scale={scale}/>: null}
                
            </svg>
            
            <div class='p-2 flex border'>
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