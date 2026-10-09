# Ride-Hailing System

## Project Description
The Ride-Hailing System is an object-oriented software solution designed to connect passengers needing point-to-point transportation with available drivers. The platform automates ride-booking, location management, driver assignment, trip status lifecycles, and automated digital payment processing to ensure a seamless transit experience.

## Objectives
* To provide an intuitive interface for passengers to book rides and for drivers to manage trip assignments and availability status.
* To implement robust object-oriented relationships (`User` inheritance, composition with `Location`, `Ride`, and `Payment`).
* To maintain transparent fare calculation and streamlined transaction processing.
* To demonstrate professional software design practices through comprehensive UML documentation and clean Python OOP implementation.

## Key Features
* **Object-Oriented Inheritance:** Base `User` class extended by specialized `Passenger` and `Driver` classes.
* **Location Management:** Precise handling of pickup and drop-off coordinates and addresses.
* **Ride Lifecycle Management:** Tracks trips from requested, assigned, in progress, completed, to cancelled.
* **Driver Availability Controls:** Real-time driver status toggling (`isAvailable`, `setAvailable()`).
* **Payment Processing:** Secure payment handling linked directly to individual rides.

## Technology Stack
* **Language:** Python 3.x (Object-Oriented Architecture)
* **Design & Modeling:** Draw.io (UML Diagrams) & Mermaid.js
* **Version Control:** Git & GitHub

## Project Structure
```text
ride-hailing-system/
│
├── src/                      # Source code directory
│   ├── models/               # Core OOP classes
│   │   ├── user.py           # User, Passenger, Driver classes
│   │   ├── location.py       # Location tracking class
│   │   ├── ride.py           # Ride coordination class
│   │   └── payment.py        # Payment processing class
│   └── main.py               # Application entry simulation script
│
├── uml/                      # UML diagram image files
│   ├── use_case_diagram.png
│   ├── class_diagram.png
│   ├── sequence_diagram.png
│   └── activity_diagram.png
│
└── README.md                 # Project documentation
