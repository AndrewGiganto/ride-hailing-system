from src.models.user import Passenger, Driver
from src.models.ride import Ride
from src.models.payment import Payment

def main():
    print("=== Ride-Hailing System Simulation ==-\n")

    # 1. Create Users
    passenger = Passenger("P001", "Juan Dela Cruz", "juan@email.com", "09123456789")
    driver = Driver("D001", "Pedro Santos", "pedro@email.com", "09987654321", "Honda Click (ABC-1234)")

    print(f"Registered {passenger.display_role()}: {passenger.name}")
    print(f"Registered {driver.display_role()}: {driver.name} ({driver.vehicle_details})\n")

    # 2. Passenger requests a ride
    passenger.request_ride("IT Park, Cebu City", "SM City Cebu")
    ride = Ride("R1001", passenger, "IT Park, Cebu City", "SM City Cebu")

    # 3. Calculate fare (e.g., 5 km distance)
    fare = ride.calculate_fare(5.0)
    print(f"Estimated Fare: ₱{fare:.2f}")

    # 4. Driver accepts ride
    if driver.is_available:
        driver.accept_ride(ride.ride_id)
        ride.assign_driver(driver)

    # 5. Trip progress updates
    ride.update_status("IN_PROGRESS")
    ride.update_status("COMPLETED")

    # 6. Process Payment
    payment = Payment("PAY-9988", ride.fare, "GCash")
    payment.process_payment()

    print("\n=== Simulation Complete ===")

if __name__ == "__main__":
    main()

