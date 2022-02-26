import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CoinPairs() {
    let [coins, setCoins] = useState([])

    useEffect(()=> {
        axios
        .get('/api/coins')
        .then((res)=> {
            console.log(res.data)
            setCoins(res.data)
        })
        console.log(coins)
        },[])


    let renderCoins = coins?.map((coin)=> {
        return (
            <div className="border">
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