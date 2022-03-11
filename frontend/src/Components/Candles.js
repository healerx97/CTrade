import React, {useEffect, useState} from 'react'
import axios from 'axios'
import RenderCandles from './RenderCandles'
import RenderAxis from './RenderAxis'
import LongWick from './LongWick'
function Candles({currentCoin, candleData, setCandleData}) {
    let [ratio, setRatio] = useState(15)
    let [scale, setScale] = useState(0.3)
    let [candleTime, setCandleTime] = useState('')
    let [longWickVal, setLongWickVal] = useState(false)
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
            {/* SVG Graph */}
            <svg viewBox= {`-${w*scale} -${h*scale} ${w*(1+scale*1.5)} ${parseInt(h*(1+scale*2))}`} class="chart p-10" vector-effect='non-scaling-stroke'>
                    
                {candleData? <RenderCandles
                    candleData={candleData} w={w} h={h} d={d} minH={minH} ratio={ratio} scale={scale} setCandleTime={setCandleTime}
                /> : null}
                {candleData? <RenderAxis candleData={candleData} minH={minH} maxH={maxH} w={w} h={h} d={d} scale={scale} candleTime={candleTime} />: null}
                {candleData && longWickVal ? <LongWick candleData={candleData} ratio={ratio} h={h} d={d} minH={minH}/> :null}
            </svg>
            
            <div class='p-2 flex border'>
                <label class='font-bold'>
                    <input class='p-1 mr-1' type='checkbox' onClick={()=>setLongWickVal(!longWickVal)}></input>
                    Long Wick
                </label>
            </div>
        </div>
    </div>
  )
}

export default Candles