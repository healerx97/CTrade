from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.decorators import api_view, renderer_classes
from django.http import request
from django.http.response import HttpResponse, JsonResponse
import json
from .serializers import CoinsSerializer
from .models import Coin

import requests
import datetime
from dateutil import parser
import pandas as pd
import numpy as np


# Create your views here.

class CTView(viewsets.ModelViewSet):
    serializer_class = CoinsSerializer
    queryset = Coin.objects.all()

@api_view(('POST',))
def getCandles(request):
    if request.method == "POST":
        param = request.data
        cur_id = param['id']
        # cur_id = 'ETH-USDC'
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