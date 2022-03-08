import React from 'react'

function RenderCandles({candleData, w, h, d, minH, ratio, scale}) {
    
    return (candleData? (
      candleData?.map((can)=>{
          
          let low = can['low']
          let high = can['high']
          let open = can['open']
          let close = can['close']
          let volume = can['volume']
          
          let p1 = (candleData.indexOf(can)*ratio)
          let v1 = h-((low-minH)/d*h)
          let v2 = h-((high-minH)/d*h)
          let c1 = h-((open-minH)/d*h)
          let c2 = h-((close-minH)/d*h)
          let candleColor = open<close? 'rgb(0,0, 232)' : 'rgb(224, 53, 40)'

          function handleCandleClick() {
            console.log(can)
        }

          return (
          <g class='candleGroup' onClick={handleCandleClick}>
              <line x1={p1} y1={v1} x2={p1} y2={v2} style={{'stroke':'rgb(0,0,0)', 'strokeWidth':'2'}} />
              <line x1={p1} y1={c1} x2={p1} y2={c2} style={{'stroke':candleColor, 'strokeWidth':'5'}} />
          </g>
          )
            })
        ):(
            <div>No Data</div>
        )
      )
}

export default RenderCandles