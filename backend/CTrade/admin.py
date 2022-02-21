from django.contrib import admin
from .models import Coin

# Register your models here.

class CTradeAdmin(admin.ModelAdmin):
    list_display = ('id', 'displayName', 'base', 'quote')


admin.site.register(Coin, CTradeAdmin)