from django.db import models



class Favourites(models.Model):
    item= models.CharField(max_length=120)

    def __str__(self):
        return self.item