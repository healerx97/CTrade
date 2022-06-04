import React, {useEffect, useRef} from 'react'
import {createChart, ColorType} from 'lightweight-charts'

function Chart({candleData, patternData}) {
    let chartContainerRef = React.useRef();
    let chart
    useEffect(
		() => {
			const chart = createChart(chartContainerRef.current, {
				width: 800,
        height: 500,
        timeScale: {
            timeVisible: true,
            borderColor: '#D1D4DC',
          },
        rightPriceScale: {
          borderColor: '#D1D4DC',
        },
        layout: {
          backgroundColor: '#ffffff',
          textColor: '#000',
        },
        grid: {
          horzLines: {
            color: '#F0F3FA',
          },
          vertLines: {
            color: '#F0F3FA',
          },
        },  
			});
			var series = chart.addCandlestickSeries({
        upColor: 'rgb(38,166,154)',
        downColor: 'rgb(255,82,82)',
        wickUpColor: 'rgb(38,166,154)',
        wickDownColor: 'rgb(255,82,82)',
        borderVisible: false,
      })
      series.setData(candleData)
      

			
      
      // add markers
      let markers = []
      if (patternData) {
        for (let i=0; i<patternData.length; i++) {
          if (patternData[i] === 100) {
            let newM = {time: candleData[i].time, position: 'belowBar', color: '#f68410', shape: 'arrowUp', text: 'Buy' }
            markers.push(newM)
          }
          if (patternData[i] === -100) {
            let newM = {time: candleData[i].time, position: 'aboveBar', color: '#f68410', shape: 'arrowDown', text: 'Sell' }
            markers.push(newM)
          }
        }
      }
      

      // let markers = [{ time: candleData[1].time, position: 'aboveBar', color: '#f68410', shape: 'circle', text: 'D' }]

      series.setMarkers(markers)


			return () => {
				
				chart.remove();
			};
    },[candleData, patternData]
	);
    useEffect(()=> {
      const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};
      window.addEventListener('resize', handleResize);
      return ()=> {
        window.removeEventListener('resize', handleResize);
      }
    },[])
    
  return (
    <div class='p-4 justify-self-center self-center'
	    ref={chartContainerRef} id = 'chart'
	  />
  )
}

export default Chart