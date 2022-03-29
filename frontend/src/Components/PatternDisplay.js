import React from 'react'
import Marker from './Marker'

function PatternDisplay({patternData, candleData, ratio, h, d, minH}) {
  let bullArray = []
  let bearArray = []
  for (let c in candleData) {
    candleData[c]['pos'] = c
    if (patternData[c] == 100) {
        bullArray.push(candleData[c])
    } else if (patternData[c] == -100) {
        bearArray.push(candleData[c])
    }
}
  let renderBull = bullArray.map((can)=> {
  let max = can['high']
  let pos = can['pos']
  let origin = {}
  origin.x = pos*ratio
  origin.y = (h-(max-minH)/d*h) - h/12

  return(
      <Marker origin={origin} ratio={ratio} h={h}/>
  )
})
  let renderBear = bearArray.map((can)=> {
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
      {renderBull}
      {renderBear}
    </g>
  )
}

export default PatternDisplay