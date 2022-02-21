from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CoinsSerializer
from .models import Coin

# Create your views here.

class CTView(viewsets.ModelViewSet):
    serializer_class = CoinsSerializer
    queryset = Coin.objects.all()