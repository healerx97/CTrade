import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Chart from './Chart'
function Home({candleData, curPattern, setCurPattern, patternData, setPatternData}) {
  const [chartData, setChartData] = useState([])
  let [patternList, setPatternList] = useState([])


   useEffect(()=> {
        axios
        .get('/api/patterns')
        .then((res)=> {
            if (res.status ==200) {
                setPatternList(res.data)

            }
        })
        .catch((error)=> console.log(error))

    },[])
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


    let renderPatternOptions = patternList? (
        patternList?.map((pat)=> {
            return (
                <option value={pat.id}>{pat.name}</option>
            )
        })
    ) : null

  return (
    <div class ='container mx-auto'>
        <div className='body flex items-center w-full bg-blue-50'>
            {<Chart candleData = {candleData} patternData={patternData}/>}
            <div class='p-2 border flex-col flex w-56'>
                <label for="patterns">Pattern Analysis:</label>

                <select name="patterns" id="pt" onChange={(e)=>setCurPattern(e.target.value)}>
                    {renderPatternOptions}
                </select>
            </div>
        </div>
        
    </div>
  )
}

export default Home