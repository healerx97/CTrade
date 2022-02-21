import os
import ccxt
import requests
import datetime
from dateutil import parser
import pandas as pd
import numpy as np
import json
key = os.getenv('API_KEY')
secret = os.getenv('API_SECRET')
pp = os.getenv('PASSPHRASE')

coinbase = ccxt.coinbasepro({
    'apiKey': key,
    'secret': secret,
    'password': pp,
})

def trade_crypto(request):
    # markets = coinbase.load_markets()
    cur_id = 'ETH-USDC'
    end_time = datetime.datetime.now().isoformat()[0:10]
    start_time = (parser.parse(end_time) - datetime.timedelta(3)).isoformat()[0:10]
    # end_time = '2022-02-13'
    granularity = '900' #15mins
    # 30 day candlesticks
    data = []
    headers = {"Accept": "application/json"}

    for i in range(15):
        url = f"https://api.exchange.coinbase.com/products/{cur_id}/candles?granularity={granularity}&start={start_time}&end={end_time}"
        response = requests.request("GET", url, headers=headers)
        data += response.json()
        end_time = (parser.parse(end_time) - datetime.timedelta(3)).isoformat()[0:10]
        start_time = (parser.parse(start_time) - datetime.timedelta(3)).isoformat()[0:10]
        

    
    df = pd.DataFrame(data, columns = ['time', 'low', 'high', 'open', 'close', 'volume'])
    df.to_csv('output.csv')

    return 'hello'


# pull in candle stats 2days at a time  x 15
# https://dev.to/edbentley/build-your-react-charts-without-a-library-35o8
# https://css-tricks.com/how-to-make-charts-with-svg/
# https://rvlasveld.github.io/blog/2013/07/02/creating-interactive-graphs-with-svg-part-1/
# https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
# deployment https://dev.to/mdrhmn/deploying-react-django-app-using-heroku-2gfa
