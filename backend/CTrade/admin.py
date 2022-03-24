from django.contrib import admin
from .models import Coin
from .models import Pattern
# Register your models here.

class CoinAdmin(admin.ModelAdmin):
    list_display = ('id', 'displayName', 'base', 'quote')

class PatternAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'key', 'penetration')

admin.site.register(Coin, CoinAdmin)
admin.site.register(Pattern, PatternAdmin)
