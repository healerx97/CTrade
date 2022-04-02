import React, {useEffect, useRef} from 'react'
import {createChart} from 'lightweight-charts'

function Chart({data}) {
    let chartContainerRef = React.useRef();
    console.log(data)
    useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			let chart = createChart(chartContainerRef.current, {
                width: 1000,
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
                });
              series.setData(data);
              
            //   var datesForMarkers = [data[data.length - 39], data[data.length - 19]];
            //   var indexOfMinPrice = 0;
            //   for (var i = 1; i < datesForMarkers.length; i++) {
            //       if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
            //           indexOfMinPrice = i;
            //       }
            //   }
              
            //   var markers = [{ time: data[data.length - 48].time, position: 'aboveBar', color: '#f68410', shape: 'circle', text: 'D' }];
            //   for (var i = 0; i < datesForMarkers.length; i++) {
            //       if (i !== indexOfMinPrice) {
            //           markers.push({ time: datesForMarkers[i].time, position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: 'Sell @ ' + Math.floor(datesForMarkers[i].high + 2) });
            //       } else {
            //           markers.push({ time: datesForMarkers[i].time, position: 'belowBar', color: '#2196F3', shape: 'arrowUp', text: 'Buy @ ' + Math.floor(datesForMarkers[i].low - 2) });
            //       }
            //   }
            //   series.setMarkers(markers);

			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		},
		[data]
	);
    
  return (
    <div class='w-full p-4 justify-self-center self-center'
			ref={chartContainerRef} id = 'chart'
		/>
  )
}

export default Chart