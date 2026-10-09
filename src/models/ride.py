from src.models.user import Passenger, Driver
from src.models.location import Location
from src.models.payment import Payment

class Ride:
    def __init__(self, rideId: str, passenger: Passenger, pickup: Location, dropoff: Location):
        self.rideId = rideId
        self.passenger = passenger
        self.pickup = pickup
        self.dropoff = dropoff
        self.driver = None
        self.status = "REQUESTED"
        self.payment = Payment(f"PAY-{rideId}", 180.0)

    def assign_driver(self, driver: Driver):
        self.driver = driver
        self.status = "ASSIGNED"

    def start_trip(self):
        self.status = "IN_PROGRESS"
        print(f"Trip {self.rideId} has started.")

    def complete_trip(self):
        self.status = "COMPLETED"
        print(f"Trip {self.rideId} has been completed.")
        self.payment.process_payment()

    def cancel_trip(self, reason: str):
        self.status = "CANCELLED"
        print(f"Trip {self.rideId} was cancelled. Reason: {reason}")
