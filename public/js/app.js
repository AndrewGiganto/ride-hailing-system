const LOCATIONS = [
  new Location("IT Park, Lahug, Cebu City", 10.3300, 123.9060),
  new Location("SM City Cebu, Mabolo", 10.3119, 123.9181),
  new Location("Fuente Osmeña Circle", 10.3103, 123.8931),
  new Location("Ayala Center Cebu", 10.3181, 123.9056)
];

const passenger = new Passenger("P-001", "Alex Mateo", "+639171234567");
const driver = new Driver("D-001", "Kuya Ben", "+639189876543", "Toyota Vios - ABC 1234");
let currentRide = null;
let driverEarnings = 0;
let rideCounter = 101;

function logStdout(msg) {
  const box = document.getElementById("console-logs");
  const line = document.createElement("div");
  line.innerHTML = `<span class="text-[#00f0ff]">&gt;</span> ${msg}`;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

function switchView(mode) {
  const custPanel = document.getElementById("panel-customer");
  const riderPanel = document.getElementById("panel-rider");
  const grid = document.getElementById("accounts-grid");

  ["customer", "rider", "split"].forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) {
      btn.className = t === mode
        ? "px-3 py-1.5 rounded-lg text-xs font-semibold transition bg-[#00f0ff] text-slate-950"
        : "px-3 py-1.5 rounded-lg text-xs font-semibold transition text-slate-400 hover:text-white";
    }
  });

  if (mode === "customer") {
    custPanel.classList.remove("hidden");
    riderPanel.classList.add("hidden");
    grid.className = "lg:col-span-8 grid grid-cols-1 gap-4";
  } else if (mode === "rider") {
    custPanel.classList.add("hidden");
    riderPanel.classList.remove("hidden");
    grid.className = "lg:col-span-8 grid grid-cols-1 gap-4";
  } else {
    custPanel.classList.remove("hidden");
    riderPanel.classList.remove("hidden");
    grid.className = "lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4";
  }
}

function calculateFare() {
  const pIdx = parseInt(document.getElementById("pickup-select").value);
  const dIdx = parseInt(document.getElementById("dropoff-select").value);
  return pIdx === dIdx ? 120.0 : 180.0 + Math.abs(pIdx - dIdx) * 35.0;
}

function handleRouteUpdate() {
  const p = LOCATIONS[document.getElementById("pickup-select").value];
  const d = LOCATIONS[document.getElementById("dropoff-select").value];
  document.getElementById("map-pickup-label").textContent = `Pickup: ${p.address.split(",")[0]}`;
  document.getElementById("map-dropoff-label").textContent = `Dropoff: ${d.address.split(",")[0]}`;
  document.getElementById("fare-display").textContent = `₱${calculateFare().toFixed(2)}`;
}

function toggleDutyStatus() {
  if (currentRide && ["ASSIGNED", "IN_PROGRESS"].includes(currentRide.status)) {
    alert("Cannot modify duty status during active trip dispatch!");
    return;
  }
  driver.set_available(!driver.isAvailable);
  syncStateUI();
}

function executeBookRide() {
  const pickup = LOCATIONS[document.getElementById("pickup-select").value];
  const dropoff = LOCATIONS[document.getElementById("dropoff-select").value];
  const fare = calculateFare();

  currentRide = new Ride(`RIDE-${rideCounter++}`, passenger, pickup, dropoff, fare);
  passenger.book_ride(pickup, dropoff);
  syncStateUI();
}

function executeAcceptRide() {
  if (!currentRide || currentRide.status !== "REQUESTED") return;
  if (!driver.isAvailable) {
    alert("Driver node must be ONLINE to accept requests!");
    return;
  }
  currentRide.assign_driver(driver);
  driver.accept_ride(currentRide);
  syncStateUI();
}

function executeStartTrip() {
  if (!currentRide || currentRide.status !== "ASSIGNED") return;
  currentRide.start_trip();
  syncStateUI();
}

function executeCompleteTrip() {
  if (!currentRide || currentRide.status !== "IN_PROGRESS") return;
  currentRide.complete_trip();
  driverEarnings += currentRide.payment.get_amount();
  driver.set_available(true);
  syncStateUI();
}

function executeCancelRide(reason) {
  if (!currentRide) return;
  if (reason.includes("Passenger")) passenger.cancel_trip(currentRide);
  else driver.cancel_trip(currentRide);

  currentRide.cancel_trip(reason);
  driver.set_available(true);
  syncStateUI();
}

function resetSystem() {
  currentRide = null;
  driver.set_available(true);
  document.getElementById("console-logs").innerHTML = `<div class="text-slate-500"># System state reset. Ready.</div>`;
  syncStateUI();
}

function syncStateUI() {
  const status = currentRide ? currentRide.status : "IDLE";
  document.getElementById("global-status").textContent = status;

  const dutyBtn = document.getElementById("btn-duty-toggle");
  if (driver.isAvailable) {
    dutyBtn.className = "px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
    dutyBtn.textContent = "● ONLINE (isAvailable=True)";
  } else {
    dutyBtn.className = "px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30";
    dutyBtn.textContent = "● OFFLINE (isAvailable=False)";
  }
  document.getElementById("driver-earnings").textContent = `₱${driverEarnings.toFixed(2)}`;

  const progressBar = document.getElementById("trip-progress-bar");
  const stageText = document.getElementById("trip-stage-text");
  const custInfo = document.getElementById("customer-ride-info");

  if (!currentRide) {
    progressBar.style.width = "0%";
    stageText.textContent = "Ready to dispatch";
    custInfo.classList.add("hidden");
    document.getElementById("btn-book").disabled = false;
    document.getElementById("btn-cust-cancel").disabled = true;
  } else {
    custInfo.classList.remove("hidden");
    document.getElementById("cust-ride-id").textContent = currentRide.rideId;
    document.getElementById("cust-driver-name").textContent = currentRide.driver ? `${currentRide.driver.get_name()} (${currentRide.driver.vehicleDetails})` : "Awaiting Driver Match...";
    document.getElementById("cust-payment-status").innerHTML = currentRide.payment.isPaid
      ? `<span class="text-emerald-400 font-bold">PAID (isPaid=True)</span>`
      : `<span class="text-amber-400">PENDING (isPaid=False)</span>`;

    const active = ["REQUESTED", "ASSIGNED", "IN_PROGRESS"].includes(status);
    document.getElementById("btn-book").disabled = active;
    document.getElementById("btn-cust-cancel").disabled = !["REQUESTED", "ASSIGNED"].includes(status);

    if (status === "REQUESTED") { progressBar.style.width = "25%"; stageText.textContent = "Broadcasting to drivers..."; }
    if (status === "ASSIGNED") { progressBar.style.width = "50%"; stageText.textContent = "Driver en route to pickup"; }
    if (status === "IN_PROGRESS") { progressBar.style.width = "80%"; stageText.textContent = "Transit to destination"; }
    if (status === "COMPLETED") { progressBar.style.width = "100%"; stageText.textContent = "Trip completed & settled"; }
    if (status === "CANCELLED") { progressBar.style.width = "0%"; stageText.textContent = "Trip terminated"; }
  }

  const idleMsg = document.getElementById("driver-idle-msg");
  const activeJob = document.getElementById("driver-active-job");

  if (currentRide && ["REQUESTED", "ASSIGNED", "IN_PROGRESS"].includes(status)) {
    idleMsg.classList.add("hidden");
    activeJob.classList.remove("hidden");
    document.getElementById("drv-job-badge").textContent = status;
    document.getElementById("drv-job-fare").textContent = `₱${currentRide.payment.get_amount().toFixed(2)}`;
    document.getElementById("drv-passenger-name").textContent = `${currentRide.passenger.get_name()} (${currentRide.passenger._phoneNumber})`;
    document.getElementById("drv-route-text").textContent = `${currentRide.pickup.get_address()} → ${currentRide.dropoff.get_address()}`;
  } else {
    idleMsg.classList.remove("hidden");
    activeJob.classList.add("hidden");
  }

  document.getElementById("btn-accept").disabled = status !== "REQUESTED";
  document.getElementById("btn-start").disabled = status !== "ASSIGNED";
  document.getElementById("btn-complete").disabled = status !== "IN_PROGRESS";
  document.getElementById("btn-drv-cancel").disabled = !["REQUESTED", "ASSIGNED"].includes(status);

  const stateSnapshot = {
    PassengerInstance: { _Id: passenger._Id, _name: passenger._name },
    DriverNode: { _Id: driver._Id, _name: driver._name, isAvailable: driver.isAvailable },
    ActiveRide: currentRide ? {
      rideId: currentRide.rideId,
      status: currentRide.status,
      driverAssigned: currentRide.driver ? currentRide.driver._Id : null,
      paymentModel: {
        paymentid: currentRide.payment.paymentid,
        amount: currentRide.payment.amount,
        isPaid: currentRide.payment.isPaid
      }
    } : null
  };
  document.getElementById("oop-inspector").textContent = JSON.stringify(stateSnapshot, null, 2);
}

handleRouteUpdate();
syncStateUI();
