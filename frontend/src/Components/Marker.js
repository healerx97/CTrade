import React from 'react'

function Marker({origin, ratio, h}) {
  return (
    <g>
        <circle cx={origin.x} cy={origin.y} r={ratio/3} stroke="black" stroke-width="1" fill="red" />
    </g>
  )
}

export default Marker