from src.models.passenger import Passenger
from src.models.driver import Driver

class Ride:
    def __init__(self, ride_id: str, passenger: Passenger, pickup: str, dropoff: str):
        self.ride_id = ride_id
        self.passenger = passenger
        self.driver = None
        self.pickup = pickup
        self.dropoff = dropoff
        self.status = "REQUESTED"  # REQUESTED, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED
        self.fare = 0.0

    def calculate_fare(self, distance_km: float):
        base_fare = 50.0  # PHP base fare
        per_km_rate = 15.0
        self.fare = base_fare + (distance_km * per_km_rate)
        return self.fare

    def assign_driver(self, driver: Driver):
        self.driver = driver
        self.status = "ACCEPTED"

    def update_status(self, new_status: str):
        self.status = new_status
        print(f"Ride {self.ride_id} status updated to: {self.status}")

