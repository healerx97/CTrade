import React from 'react'

function RenderAxis({candleData, minH, maxH, h, w, d, scale}) {
    let numCol = 5
    let numRow = 5
    //iterate each line of axis col, row
    let colArray = []
    for (let i=0; i<=numCol; i++) {
      let v = (d/numCol)*i + minH
      let y_val = h-((v-minH)/d*h)
      colArray.push({
        y_val: y_val,
        v: v,
      })
    }
    console.log(colArray)
    let renderCols = colArray?.map(({y_val, v})=>{
      return(
            <g>
              <text className="label" x={-w*scale} y={y_val}>{parseFloat(v).toFixed(2)}</text>
              <line x1={-w*scale/2} y1={y_val} x2={w*(1+scale)} y2={y_val} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'1', 'strokeOpacity': '0.3'}} />
            </g>
      )
    })



    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth() +1
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + '/' + date + '/' + year
        return time;
      }

    let startT = candleData[0]?.time
    let start_time = timeConverter(startT)
    let endT = candleData[candleData.length-1]?.time
    let end_time = timeConverter(endT)

  return (
    <g>
        {/* <line x1={-w*scale/2} y1={-h*scale/2} x2={-w*scale/2} y2={h*(1+scale/2)} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'1'}} />
        <line x1={-w*scale/2} y1={h*(1+scale/2)} x2={w*(1+scale)} y2={h*(1+scale/2)} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'1'}} />
        <text className="label" x={-w*scale} y={h}>{minH}</text>
        <text className="label" x={-w*scale} y={0}>{maxH}</text> */}
        <text className="label" x={0} y={h*(1+scale/1.1)} >{start_time}</text>
        <text className="label" x={w} y={h*(1+scale/1.1)}>{end_time}</text>
        {renderCols}
    </g>
  )
}

export default RenderAxis