from rest_framework import serializers
from .models import Coin

class CoinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ('id', 'displayName', 'base', 'quote')