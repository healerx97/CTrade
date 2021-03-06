import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import RenderCandles from './RenderCandles'
import RenderAxis from './RenderAxis'
import LongWick from './LongWick'
import PatternDisplay from './PatternDisplay'

import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom';
import {useWindowSize} from '@react-hook/window-size'


function Candles({currentCoin, candleData, setCandleData, curTimeFrame, setCurTimeFrame, xOffSet, setXOffSet}) {
    let [ratio, setRatio] = useState(15)
    let [scale, setScale] = useState(0.3)
    let [ddState, setddState] = useState(false)
    let [patternList, setPatternList] = useState([])
    let [patternData, setPatternData] = useState([])
    let [curPattern, setCurPattern] = useState(0)
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
    
    // -------------------------------------SVG Zoom/Pan
    // const Viewer = useRef(null);

    // useEffect(() => {
    //     Viewer.current.fitToViewer();
    // }, []);

    // const _zoomOnViewerCenter = () => Viewer.current.zoomOnViewerCenter(1.1)
    // const _fitSelection = () => Viewer.current.fitSelection(40, 40, 200, 200)
    // const _fitToViewer = () => Viewer.current.fitToViewer()

    // const [width, height] = useWindowSize({initialWidth: 400, initialHeight: 400})

    // const [tool, setTool] = useState(TOOL_NONE)
    // const [value, setValue] = useState(INITIAL_VALUE)
// -----------------------------------------------------------------------------------

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
    // fetch talib every time candleData changes
    React.useEffect(()=> {
        let coinData = {
            candleData: candleData,
            patternID: curPattern
        }
        fetch('http://localhost:8000/api/testTalib', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coinData),
        })
        .then(response => response.json())
        .then(data => {
            setPatternData(data)
        })
        .catch(error=>console.log(error))
    },[candleData, curPattern])
    // ---------------------------------------------------------------------------------------------------
    // render dropdown options for patterns
    React.useEffect(()=> {
        axios
        .get('/api/patterns')
        .then((res)=> {
            if (res.status ==200) {
                setPatternList(res.data)

            }
        })
        .catch((error)=> console.log(error))

    },[])
    let renderPatternOptions = patternList? (
        patternList?.map((pat)=> {
            return (
                <option value={pat.id}>{pat.name}</option>
            )
        })
    ) : null
    
    
  return (
    <div class='flex flex-col items-center'>
        <div class='flex flex-row justify-between'>
            <div class='text-xl font-bold p-3 border border-x-transparent bg-blue-100 rounded-xl shadow-md mb-2'>
                {currentCoin.id}
            </div>
        </div>
        <div class = 'border w-3/4 flex justify-center rounded shadow-lg bg-slate-50'>
            {/* SVG Graph */}

            {/* <hr/>

            <button className="btn" onClick={() => _zoomOnViewerCenter()}>Zoom on center</button>
            <button className="btn" onClick={() => _fitSelection()}>Zoom area 200x200</button>
            <button className="btn" onClick={() => _fitToViewer()}>Fit</button>
            <hr/> */}
            
            <svg viewBox= {`-${w*scale} -${h*scale} ${w*(1+scale*1.5)} ${parseInt(h*(1+scale*2))}`} class="chart p-10" vector-effect='non-scaling-stroke' > 
                {candleData? <RenderCandles
                    candleData={candleData} w={w} h={h} d={d} minH={minH} ratio={ratio} scale={scale} setCandleTime={setCandleTime} xOffSet={xOffSet}
                /> : null}

                {candleData? <RenderAxis candleData={candleData} minH={minH} maxH={maxH} w={w} h={h} d={d} scale={scale} candleTime={candleTime} xOffSet={xOffSet}/>: null}
                {candleData && longWickVal ? <LongWick candleData={candleData} ratio={ratio} h={h} d={d} minH={minH}/> :null}
                {candleData && patternData ? <PatternDisplay patternData={patternData} candleData={candleData} ratio={ratio} h={h} d={d} minH={minH}/> : null}
            </svg>

            
            <div class='p-2 border flex-col flex w-56'>
                <label for="patterns">Pattern Analysis:</label>

                <select name="patterns" id="pt" onChange={(e)=>setCurPattern(e.target.value)}>
                    {renderPatternOptions}
                </select>
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