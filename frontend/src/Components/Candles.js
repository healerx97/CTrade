import React, {useEffect, useState} from 'react'
import axios from 'axios'
import RenderCandles from './RenderCandles'
import RenderAxis from './RenderAxis'
import LongWick from './LongWick'

function Candles({currentCoin, candleData, setCandleData, curTimeFrame, setCurTimeFrame, xOffSet, setXOffSet}) {
    let [ratio, setRatio] = useState(15)
    let [scale, setScale] = useState(0.3)
    let [ddState, setddState] = useState(false)
    let timeframes = ['5 mins', '15 mins', '1 hr', '6 hrs', '1 day']
    let granularities= {
        '5 mins': '300',
        '15 mins': '900',
        '1 hr': '3600',
        '6 hrs': '21600',
        '1 day': '86400',
    }
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
    
    let renderDropDown = timeframes?.map((tf)=> {
        return (
            <li>
                <div class={curTimeFrame==tf?'bg-yellow-200':null}>
                <button class="block py-2 px-4 w-full text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={()=> setCurTimeFrame(tf)}>{tf}</button>
                </div>
            </li>
        )
    })
    React.useEffect(()=> {
        let coinData = {
            id: currentCoin.id,
            tf: granularities[curTimeFrame]
        }
        fetch('http://localhost:8000/api/getCandles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coinData),
        })
        .then(response => response.json())
        .then(data => {
            setCandleData(data)
            setddState(false)
            setXOffSet(0)
        })
        .catch(error=>console.log(error))
    },[curTimeFrame])
    // --------------------------------------------------------------------------------------------------
    // scrolling function
    const [scrollY, setScrollY] = useState(0);
    function handleScroll() {
        if (scrollY>window.scrollY) {
            console.log('up')
        } else {
            console.log('down')
        }
        setScrollY(window.scrollY)
    }
    React.useEffect(() => {
        function watchScroll() {
          window.addEventListener("scroll", handleScroll);
        }
        watchScroll();
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);


    // ---------------------------------------------------------------------------------------------------


    
  return (
    <div class='flex flex-col items-center'>
        <div class='flex flex-row justify-between'>
            <div class='text-xl font-bold p-3 border border-x-transparent bg-blue-100 rounded-xl shadow-md mb-2'>
                {currentCoin.id}
            </div>
        </div>
        <div class = 'border w-3/4 flex justify-center rounded shadow-lg bg-slate-50'>
            {/* SVG Graph */}
            <svg viewBox= {`-${w*scale} -${h*scale} ${w*(1+scale*1.5)} ${parseInt(h*(1+scale*2))}`} class="chart p-10" vector-effect='non-scaling-stroke' >
                    
                {candleData? <RenderCandles
                    candleData={candleData} w={w} h={h} d={d} minH={minH} ratio={ratio} scale={scale} setCandleTime={setCandleTime} xOffSet={xOffSet}
                /> : null}
                {candleData? <RenderAxis candleData={candleData} minH={minH} maxH={maxH} w={w} h={h} d={d} scale={scale} candleTime={candleTime} xOffSet={xOffSet}/>: null}
                {candleData && longWickVal ? <LongWick candleData={candleData} ratio={ratio} h={h} d={d} minH={minH}/> :null}
            </svg> 
            
            <div class='p-2 flex border'>
                <label class='font-bold'>
                    <input class='p-1 mr-1' type='checkbox' onClick={()=>setLongWickVal(!longWickVal)}></input>
                    Long Wick
                    {scrollY}
                </label>
            </div>
        </div>
        <div class='w-3/4'>
            <div class='self-start w-28'>
                <button id="dropdownButton" class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={()=>setddState(!ddState)}>{curTimeFrame}<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                {/* <!-- Dropdown menu --> */}
                <div class={ddState?null:"hidden"}>
                <div id="dropdown" class="z-10 w-full text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                    <ul class="py-1">
                        {renderDropDown}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Candles