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
from .serializers import PatternsSerializer
from .models import Coin
from .models import Pattern

import csv
import requests
import datetime
from dateutil import parser
import pandas as pd
import numpy as np
import talib

# Create your views here.

class CTView(viewsets.ModelViewSet):
    serializer_class = CoinsSerializer
    queryset = Coin.objects.all()

class TradePatterns(viewsets.ModelViewSet):
    serializer_class = PatternsSerializer
    queryset = Pattern.objects.all()


@api_view(('POST',))
def getCandles(request):
    if request.method == "POST":
        param = request.data
        # starting params defined
        cur_id = param['id']
        granularity = param['tf']
        # fetch params dictionary
        # {key: [req_days, range]}
        pDict = {
            '300': 1,
            '900': 3,
            '3600': 5,
            '21600': 60,
            '86400': 90,
        }
        req_days = pDict[granularity]
        end_time = datetime.datetime.now().isoformat()[0:10]
        start_time = (parser.parse(end_time) - datetime.timedelta(req_days)).isoformat()[0:10]
        data = []
        headers = {"Accept": "application/json"}
        
        for i in range(1):
            url = f"https://api.exchange.coinbase.com/products/{cur_id}/candles?granularity={granularity}&start={start_time}&end={end_time}"
            response = requests.request("GET", url, headers=headers)
            data += response.json()
            end_time = (parser.parse(end_time) - datetime.timedelta(req_days)).isoformat()[0:10]
            start_time = (parser.parse(start_time) - datetime.timedelta(req_days)).isoformat()[0:10]
            

        
        df = pd.DataFrame(data, columns = ['time', 'low', 'high', 'open', 'close', 'volume'])
        df = df.drop_duplicates()
        df = df[::-1]
        jsonDF = df.to_json(orient='records')
        # df.to_csv('output.csv')

        return JsonResponse(json.loads(jsonDF), safe = False)

@api_view(('GET',))
def importCoinPairs(request):
    url = "https://api.exchange.coinbase.com/products"
    headers = {"Accept": "application/json"}
    response = requests.request("GET", url, headers=headers)
    newObjList = []
    for c in response.json():
        coinID = c['id']
        base = c['base_currency']
        quote = c['quote_currency']
        display = c['display_name']
        if Coin.objects.filter(id=coinID).exists():
            continue
        else:
            newobj = Coin.objects.create(id=coinID, base=base, quote=quote, displayName= display)
            newObjList.append(newobj.getID())
    return JsonResponse(newObjList, safe=False)

patternDataPath = './CTrade/PatternData.csv'
@api_view(('GET',))
def importPatterns(request):
    newObjList = []
    with open(patternDataPath, 'r') as csvfile:
        patterns = csv.reader(csvfile)
        for row in patterns:
            if not Pattern.objects.filter(key=row[1]):
                if row[2]:
                    newObj = Pattern.objects.create(name = row[0], key = row[1], penetration = True)
                else:
                    newObj = Pattern.objects.create(name = row[0], key = row[1])
                newObjList.append(newObj.getKey())
    return JsonResponse(newObjList, safe=False)
    
    

@api_view(('POST',))
def testTalib(request):
    if request.method == "POST":
        param = request.data
        # starting params defined
        candles = param['candleData']
        patternID = param['patternID']
        pattern = Pattern.objects.get(id=patternID)
        print(pattern)

        
        df = pd.DataFrame(candles, columns = ['time', 'low', 'high', 'open', 'close', 'volume'])
        df = df.drop_duplicates()
        pat = getattr(talib, pattern.key)
        if pattern.penetration:
            num = pat(df['open'], df['high'], df['low'], df['close'], penetration=0)
        else:
            num = pat(df['open'], df['high'], df['low'], df['close'])

        jsonDF = num.to_json(orient='records')
        # df.to_csv('output.csv')

        return JsonResponse(json.loads(jsonDF), safe = False)


@api_view(('POST',))
def overallPatterns(request):
    if request.method == "POST":
        param = request.data
        # starting params defined
        candles = param['candleData']
        # create base dataframe to use Talib analysis on
        df = pd.DataFrame(candles, columns = ['time', 'low', 'high', 'open', 'close', 'volume'])
        df = df.drop_duplicates()
        df['score'] = 0
        # fetch patterns and iterate over each
        patterns = Pattern.objects.all()
        for pattern in patterns:
            pat = getattr(talib, pattern.key)
            if pattern.penetration:
                num = pat(df['open'], df['high'], df['low'], df['close'], penetration=0)
            else:
                num = pat(df['open'], df['high'], df['low'], df['close'])
            
            for n in range(len(num)):
                if num[n] == 100:
                    df.loc[n,'score'] += 1
                    print(df)
                elif num[n] == -100:
                    df.loc[n,'score'] -= 1

        jsonDF = df.to_json(orient='records')
        # df.to_csv('output.csv')

        return JsonResponse(json.loads(jsonDF), safe = False)