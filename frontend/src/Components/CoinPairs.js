import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CoinPairs({currentCoin, setCurrentCoin, setCandleData, candleData, curTimeFrame, navigate}) {
    let [coins, setCoins] = useState([])
    let granularities= {
        '5 mins': '300',
        '15 mins': '900',
        '1 hr': '3600',
        '6 hrs': '21600',
        '1 day': '86400',
    }
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
            id: coin.id,
            tf: granularities[curTimeFrame]
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