class Location {
  constructor(address, latitude, longitude) {
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
  get_address() {
    return this.address;
  }
}

class Payment {
  constructor(paymentid, amount) {
    this.paymentid = paymentid;
    this.amount = amount;
    this.isPaid = false;
  }
  process_payment() {
    this.isPaid = true;
    logStdout(`Payment ${this.paymentid} amounting to ₱${this.amount.toFixed(2)} successfully processed.`);
    return this.isPaid;
  }
  get_amount() {
    return this.amount;
  }
}

class User {
  constructor(Id, name, phoneNumber) {
    this._Id = Id;
    this._name = name;
    this._phoneNumber = phoneNumber;
  }
  get_name() {
    return this._name;
  }
}

class Passenger extends User {
  book_ride(pickup, dropoff) {
    logStdout(`Passenger ${this._name} booked a ride from ${pickup.get_address()} to ${dropoff.get_address()}.`);
  }
  cancel_trip(ride) {
    logStdout(`Passenger ${this._name} requested to cancel the trip.`);
  }
}

class Driver extends User {
  constructor(Id, name, phoneNumber, vehicleDetails) {
    super(Id, name, phoneNumber);
    this.vehicleDetails = vehicleDetails;
    this.isAvailable = true;
  }
  accept_ride(ride) {
    this.isAvailable = false;
    logStdout(`Driver ${this._name} accepted the ride.`);
  }
  cancel_trip(ride) {
    logStdout(`Driver ${this._name} cancelled the ride.`);
  }
  set_available(status) {
    this.isAvailable = status;
  }
}

class Ride {
  constructor(rideId, passenger, pickup, dropoff, fare = 180.0) {
    this.rideId = rideId;
    this.passenger = passenger;
    this.pickup = pickup;
    this.dropoff = dropoff;
    this.driver = null;
    this.status = "REQUESTED";
    this.payment = new Payment(`PAY-${rideId}`, fare);
  }
  assign_driver(driver) {
    this.driver = driver;
    this.status = "ASSIGNED";
  }
  start_trip() {
    this.status = "IN_PROGRESS";
    logStdout(`Trip ${this.rideId} has started.`);
  }
  complete_trip() {
    this.status = "COMPLETED";
    logStdout(`Trip ${this.rideId} has been completed.`);
    this.payment.process_payment();
  }
  cancel_trip(reason) {
    this.status = "CANCELLED";
    logStdout(`Trip ${this.rideId} was cancelled. Reason: ${reason}`);
  }
}
