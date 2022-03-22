from rest_framework import serializers
from .models import Coin
from .models import Pattern
class CoinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ('id', 'displayName', 'base', 'quote')

class PatternsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pattern
        fields = ('id', 'name', 'key')