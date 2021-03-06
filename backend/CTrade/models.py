from django.db import models

# Create your models here.

class Coin(models.Model):
    id = models.TextField(primary_key=True)
    displayName = models.TextField()
    base = models.TextField()
    quote = models.TextField()
    def __str__(self):
        return self.displayName

    def getID(self):
        return self.id

class Pattern(models.Model):

    name = models.TextField()
    key = models.TextField()
    penetration = models.BooleanField(default=False)

    def getKey(self):
        return self.key