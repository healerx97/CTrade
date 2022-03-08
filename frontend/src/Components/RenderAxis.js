import React from 'react'

function RenderAxis({candleData, minH, maxH, h, w, scale}) {

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
        <line x1={0} y1={h*scale} x2={0} y2={h*(1+scale)} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'1'}} />
        <line x1={0} y1={h*(1+scale)} x2={w} y2={h*(1+scale)} style={{'stroke':'rgb(0,0,0)', 'stroke-width':'1'}} />
        <text className="label" x={-w*scale/2} y={h*(1+scale)}>{minH}</text>
        <text className="label" x={-w*scale/2} y={h*scale}>{maxH}</text>
        <text className="label" x={w*(scale-1)} y={h} >{start_time}</text>
        <text className="label" x={w*(2-scale)} y={h}>{end_time}</text>
        <circle cx={w} cy={h*scale + h} r="50"/>
    </g>
  )
}

export default RenderAxis