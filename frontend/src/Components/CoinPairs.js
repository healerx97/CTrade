import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CoinPairs({currentCoin, setCurrentCoin, navigate}) {
    let [coins, setCoins] = useState([])
    React.useEffect(()=> {
        axios
        .get('/api/coins')
        .then((res)=> {
            if (res.status==200) {
                console.log(currentCoin.id)
                setCoins(res.data)
                let candleHeaders = {
                    headers : {
                        'Content-Type': 'application/json',
                    }
                }
                axios
                .post('api/getCandles',{
                    'id': currentCoin.id
                }, candleHeaders)
                .then((r)=> {
                    console.log(r.data)
                    // setCandleData(res.data)
                })
                .catch(function (error) {
                    console.log(error.toJSON());
                  })
            }
        })
        .catch(function (error) {
            console.log(error.toJSON());
          })
        },[])
    
    function handleCoinClick(coin,e) {
        e.preventDefault()
        setCurrentCoin(coin)
        navigate('/candles')
    }

    let renderCoins = coins?.map((coin)=> {
        return (    
            <div className="border hover:bg-red-200" onClick={(e)=>handleCoinClick(coin, e)}>
                {coin['id']}
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