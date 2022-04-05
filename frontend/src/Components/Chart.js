import React, {useEffect, useRef} from 'react'
import {createChart} from 'lightweight-charts'

function Chart({data}) {
      // ALPACA STREAM CREDENTIALS
    let key = process.env.REACT_APP_ALPACA_API_ID
    let secret = process.env.REACT_APP_ALPACA_API_SECRET

    const stream_url = 'wss://stream.data.alpaca.markets/v1beta1/crypto'
    const socket = new WebSocket(stream_url)
    const auth = {'action':'auth', 'key': key, 'secret': secret}

    


    const subscribe = {"action":"subscribe", "trades":["ETHUSD"], "quotes":["ETHUSD"], "bars":["ETHUSD"]}

    const unsubscribe = {"action": "unsubscribe", "trades":["ETHUSD"], "quotes":["ETHUSD"], "bars":["ETHUSD"]}
    
    let currentBar = data? data[data.length -1] : {}
    let trades = []
    let chartContainerRef = React.useRef();
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
              
              if (data) {
                series.setData(data);
                socket.onmessage = function(event) {
                  let data = JSON.parse(event.data)
                //   console.log(data)
                  const message = data[0]['msg'];
                  if (message =='connected') {
                    console.log('authentication')
                    socket.send(JSON.stringify(auth))
                  }
                  if (message == 'authenticated') {
                    socket.send(JSON.stringify(subscribe));
                    // socket.close()
                }
                  for (var key in data) {
          
                    const type = data[key].T;
          
                    if (type == 't') {
                        //console.log('got a trade');
                        //console.log(data[key]);
          
                        trades.push(data[key].p);
                        
                        var open = trades[0];
                        var high = Math.max(...trades);
                        var low = Math.min(...trades);
                        var close = trades[trades.length - 1];
          
                        // console.log(open, high, low, close);
          
                        series.update({
                            time: currentBar.time + 60,
                            open: open,
                            high: high,
                            low: low,
                            close: close
                        })
                    }
          
                    if (type == 'b' && data[key].x == 'CBSE') {
                        console.log('got a new bar');
                        console.log(data[key]);
          
                        var bar = data[key];
                        var timestamp = new Date(bar.t).getTime() / 1000;
          
                        currentBar = {
                            time: timestamp,
                            open: bar.o,
                            high: bar.h,
                            low: bar.l,
                            close: bar.c
                        }
          
                        series.update(currentBar);
                        
                        trades = [];
                    }
                }
              }
            }
              
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