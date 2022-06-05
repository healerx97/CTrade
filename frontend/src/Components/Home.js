import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Chart from './Chart'
import {CSVLink} from "react-csv"

function Home({candleData, currentCoin, curPattern, setCurPattern, patternData, setPatternData}) {
  let [patternList, setPatternList] = useState([])
  let [overallPatternData, setOverallPatternData] = useState([])
  let [downloadButton, setDownloadButton] = useState(false)
  let csvHeaders = [
    {label: 'Time', key: 'time'},
    {label: 'Low', key: 'low'},
    {label: 'High', key: 'high'},
    {label: 'Open', key: 'open'},
    {label: 'Close', key: 'close'},
    {label: 'Volume', key: 'volume'},
    {label: 'Score', key: 'score'},

  ]

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
    // fetch talib, reset csvData every time candleData changes
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
      
  useEffect(()=>{
    setDownloadButton(false)
  },[candleData])

  //  get overall pattern data report
  function handleOverallPattern() {
    fetch('http://localhost:8000/api/overallPatterns', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({candleData: candleData}),
        })
        .then(response => response.json())
        .then(res => {
          setOverallPatternData(res)
          setDownloadButton(true)
        })
  }

  let csvData = {
    data: overallPatternData,
    headers: csvHeaders,
    filename: 'Overall_Pattern_Scores.csv'
  }


  return (
    <div class ='container mx-auto border'>
        <div className='md:flex-row flex-col flex items-center justify-center bg-blue-50'>
            <div class='flex flex-col'>
              <div class='text-lg font-bold p-2 text-center whitespace-nowrap'>{currentCoin.displayName}</div>
              {<Chart candleData = {candleData} patternData={patternData}/>}
            </div>
            <div class='p-2 border flex-col flex w-56 gap-3 overflow-hidden'>
                <div>
                  <label for="patterns">Pattern Analysis:</label>
                  <select name="patterns" class ="w-full rounded shadow-sm mb-3" onChange={(e)=>setCurPattern(e.target.value)}>
                      {renderPatternOptions}
                  </select>
                </div>
                <div class='flex flex-col justify-center items-center gap-2'>
                  <button class='rounded shadow h-10 p-1 bg-green-100' onClick={handleOverallPattern}>
                    Get Overall Pattern Report
                  </button>
                  {downloadButton ? (<CSVLink onClick={()=> setDownloadButton(false) }class='rounded shadow h-10 p-1 bg-green-100'{...csvData}>Download</CSVLink>) : null}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Home