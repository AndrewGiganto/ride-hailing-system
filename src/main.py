from src.models.user import Passenger, Driver
from src.models.location import Location
from src.models.ride import Ride

def main():
    print("=== Ride-Hailing System Simulation ==-\n")

    # 1. Initialize Locations
    pickup_loc = Location("IT Park, Cebu City", 10.3291, 123.9065)
    dropoff_loc = Location("SM City Cebu", 10.3121, 123.9376)

    # 2. Create Users matching class diagram parameters
    passenger = Passenger("P001", "Andrew Giganto", "09123456789")
    driver = Driver("D001", "Juan Santos", "09987654321", "Honda Click 125i (ABC-1234)")

    print(f"Passenger Registered: {passenger.get_name()}")
    print(f"Driver Registered: {driver.get_name()} ({driver.vehicleDetails})\n")

    # 3. Passenger Books Ride
    passenger.book_ride(pickup_loc, dropoff_loc)
    ride = Ride("R1001", passenger, pickup_loc, dropoff_loc)

    # 4. Driver Accepts Ride
    if driver.isAvailable:
        driver.accept_ride(ride)
        ride.assign_driver(driver)

    # 5. Trip Workflow Execution (matching sequence & activity diagrams)
    ride.start_trip()
    ride.complete_trip()

    print("\n=== Simulation Finished Successfully ===")

if __name__ == "__main__":
    main()
