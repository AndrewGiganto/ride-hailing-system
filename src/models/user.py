class User:
    def __init__(self, Id: str, name: str, phoneNumber: str):
        self._Id = Id
        self._name = name
        self._phoneNumber = phoneNumber

    def get_name(self) -> str:
        return self._name


class Passenger(User):
    def __init__(self, Id: str, name: str, phoneNumber: str):
        super().__init__(Id, name, phoneNumber)

    def book_ride(self, pickup, dropoff):
        print(f"Passenger {self._name} booked a ride from {pickup.get_address()} to {dropoff.get_address()}.")

    def cancel_trip(self, ride):
        print(f"Passenger {self._name} requested to cancel the trip.")


class Driver(User):
    def __init__(self, Id: str, name: str, phoneNumber: str, vehicleDetails: str):
        super().__init__(Id, name, phoneNumber)
        self.vehicleDetails = vehicleDetails
        self.isAvailable = True

    def accept_ride(self, ride):
        self.isAvailable = False
        print(f"Driver {self._name} accepted the ride.")

    def cancel_trip(self, ride):
        print(f"Driver {self._name} cancelled the ride.")

    def set_available(self, status: bool):
        self.isAvailable = status
