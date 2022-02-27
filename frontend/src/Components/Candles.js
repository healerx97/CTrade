import React, {useEffect} from 'react'
import axios from 'axios'
function Candles({currentCoin, candleData, setCandleData}) {
    useEffect(()=> {
        let coinData = {
            id: currentCoin.id
        }
        //axios gave me 403 errors with cors enabled?
        fetch('http://localhost:8000/api/getCandles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coinData),
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    })
    

  return (
    <div>
        <div>
            {currentCoin.id}
        </div>
    </div>
  )
}

export default Candles