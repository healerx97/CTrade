import React, {useEffect} from 'react'
import axios from 'axios'
function Candles({currentCoin, candleData, setCandleData}) {
    

  return (
    <div>
        <div>
            {currentCoin.id}
        </div>
    </div>
  )
}

export default Candles