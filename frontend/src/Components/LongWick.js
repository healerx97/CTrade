import React from 'react'
import Marker from './Marker'
function LongWick({candleData, ratio, h, d, minH}) {
    let resultArray = []
    let sens = 3.0
    for (let c in candleData) {
        let low = candleData[c]['low']
        let high = candleData[c]['high']
        let open = candleData[c]['open']
        let close = candleData[c]['close']
        let status = open<close? 'inc':'dec'
        candleData[c]['pos'] = c
        if (status=='inc') {
            let upWick = high-close
            let downWick = open-low
            let bar = close-open
            if (upWick> bar*sens || downWick> bar*sens) {
                resultArray.push(candleData[c])
            }
        } else {
            let upWick = high-open
            let downWick = close-low
            let bar = open-close
            if (upWick> bar*sens || downWick> bar*sens) {
                resultArray.push(candleData[c])
            }
        }
        
    }
    console.log(resultArray)
    let renderLongWicks = resultArray.map((can)=> {
        let max = can['high']
        let pos = can['pos']
        let origin = {}
        origin.x = pos*ratio
        origin.y = (h-(max-minH)/d*h) - h/12

        return(
            <Marker origin={origin} ratio={ratio} h={h}/>
        )
    })
  return (
    <g>
        {renderLongWicks}
    </g>
  )
}

export default LongWick