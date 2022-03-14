import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CoinPairs({currentCoin, setCurrentCoin, setCandleData, candleData, navigate}) {
    let [coins, setCoins] = useState([])
    React.useEffect(()=> {
        axios
        .get('/api/coins')
        .then((res)=> {
            if (res.status==200) {
                let temp = res.data
                temp = temp.filter(c=>c.quote == 'USD')
                temp.sort(function (a,b) {
                    const nameA = a.id.toUpperCase()
                    const nameB = b.id.toUpperCase()
                    if (nameA < nameB) {
                        return -1;
                      }
                      if (nameA > nameB) {
                        return 1;
                      }
                      // names must be equal
                      return 0;
                })
                setCoins(temp)
            }
        })
        .catch(function (error) {
            console.log(error.toJSON());
          })
        },[])
    
    function handleCoinClick(coin,e) {
        e.preventDefault()
        setCurrentCoin(coin)
        let coinData = {
            id: coin.id
        }
        fetch('http://localhost:8000/api/getCandles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coinData),
        })
        .then(response => response.json())
        .then(data => {
            let temp = data.reverse()
            setCandleData(temp)
        })
        navigate('/candles')
    }

    let renderCoins = coins?.map((coin)=> {
        let displayName= coin['id'].split('-')[0]
        return (    
            <div className="border hover:bg-red-200 text-center text-xl p-2" onClick={(e)=>handleCoinClick(coin, e)}>
                {displayName}
            </div>
        )
    })


  return (
    <div>
        <div class='text-3xl font-bold text-center p-3'>ALL COINS</div>
        <div class = "grid grid-cols-10 gap-2 text-xs">
            {coins? renderCoins:null}
        </div>
    </div>
  )
}

export default CoinPairs