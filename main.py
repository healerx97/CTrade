import os
import ccxt
import requests

key = os.getenv('API_KEY')
secret = os.getenv('API_SECRET')
pp = os.getenv('PASSPHRASE')

coinbase = ccxt.coinbasepro({
    'apiKey': key,
    'secret': secret,
    'password': pp,
})

def trade_crypto(request):
    markets = coinbase.load_markets()
    cur_id = 'ETH-USDC'
    start_time = '2021-12-10'
    end_time = '2022-02-13'
    url = f"https://api.exchange.coinbase.com/products/{cur_id}/candles?granularity=86400&start={start_time}&end={end_time}"

    headers = {"Accept": "application/json"}


    response = requests.request("GET", url, headers=headers)
    return response.text


# pull in candle stats 2days at a time  x 15
# https://dev.to/edbentley/build-your-react-charts-without-a-library-35o8
# https://css-tricks.com/how-to-make-charts-with-svg/
# https://rvlasveld.github.io/blog/2013/07/02/creating-interactive-graphs-with-svg-part-1/
