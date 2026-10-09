from abc import ABC, abstractmethod

class User(ABC):
    def __init__(self, user_id: str, name: str, email: str, phone: str):
        self._user_id = user_id
        self._name = name
        self._email = email
        self._phone = phone

    @property
    def name(self):
        return self._name

    @abstractmethod
    def display_role(self):
        pass


class Passenger(User):
    def __init__(self, user_id: str, name: str, email: str, phone: str):
        super().__init__(user_id, name, email, phone)
        self.payment_methods = []

    def request_ride(self, pickup: str, dropoff: str):
        print(f"Passenger {self._name} requested a ride from {pickup} to {dropoff}.")

    def display_role(self):
        return "Passenger"


class Driver(User):
    def __init__(self, user_id: str, name: str, email: str, phone: str, vehicle_details: str):
        super().__init__(user_id, name, email, phone)
        self.vehicle_details = vehicle_details
        self.is_available = True

    def accept_ride(self, ride_id: str):
        self.is_available = False
        print(f"Driver {self._name} accepted ride {ride_id}.")

    def display_role(self):
        return "Driver"
