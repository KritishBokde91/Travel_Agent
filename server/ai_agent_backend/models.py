from django.db import models
from django.contrib.auth.models import User

class TripPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    location = models.CharField(max_length=100)
    number_of_people = models.IntegerField()
    budget_per_person = models.DecimalField(max_digits=10, decimal_places=2)
    duration_days = models.IntegerField()
    trip_plans = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.location} - {self.number_of_people} people - {self.duration_days} days"

