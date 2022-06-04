import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CoinPairs({currentCoin, setCurrentCoin, setCandleData, candleData, curTimeFrame, setCurPattern, navigate}) {
    // ALPACA AUTH
    let API_KEY = process.env.REACT_APP_ALPACA_API_ID
    let SECRET_KEY = process.env.REACT_APP_ALPACA_API_SECRET


    let [coins, setCoins] = useState([])
    let granularities= {
        '5 mins': '300',
        '15 mins': '900',
        '1 hr': '3600',
        '6 hrs': '21600',
        '1 day': '86400',
    }
    const [timeFrame, setTimeFrame] = useState('5Min')
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
        let start = new Date(Date.now() - (7200 * 1000 *5)).toISOString()
        let coinID = coin? coin.base+coin.quote: null
        let base_url = `https://data.alpaca.markets/v1beta1/crypto/${coinID}/bars?exchanges=CBSE&timeframe=${timeFrame}&start=${start}`
        console.log(coinID)
        fetch(base_url, {
        method: 'GET',
        headers: {
            'APCA-API-KEY-ID': API_KEY,
            'APCA-API-SECRET-KEY': SECRET_KEY
        },
        })
        .then(response => response.json())
        .then(res => {
            let data = res.bars.map(bar => (
                {
                    open: bar.o,
                    high: bar.h,
                    low: bar.l,
                    close: bar.c,
                    time: Date.parse(bar.t) / 1000
                }
            ))
            console.log(data)
            setCandleData(data)
            setCurPattern(62)
        })
        navigate('/')
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