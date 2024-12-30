// Select SVG Elements
const path = document.querySelector('#path4353');
const vehicle = document.querySelector('#vehicle');

// Simulate telemetry data
let speed = 0;
let rpm = 0;
let lapTime = 0;
let trackPosition = 0;
let lapCounter = 0;

// Update data
function updateTelemetry() {
    speed = Math.floor(Math.random() * 300); // Random Speed (0-300 km/h)
    rpm = Math.floor(Math.random() * 10000); // Random RPm (0-10000)
    trackPosition = (trackPosition + 5) % 100; // Simulated track position (0-100%)

    // Update user interface
    document.getElementById('speed').textContent = speed;
    document.getElementById('rpm-progress').style.width = `${(rpm / 10000) * 100}%`;
    
    // Animate the Vehicle on Monza
    animateVehicle(trackPosition / 100);

    // Check if a lap is completed
    if (trackPosition === 0) {
        lapCounter++;
        document.getElementById('lap-counter').textContent = lapCounter;
    }
}

// Update lap timer
function updateLapTime() {
    lapTime++;
    const minutes = Math.floor(lapTime / 60);
    const seconds = lapTime % 60;
    const milliseconds = lapTime % 100;
    document.getElementById('lap-time').textContent =  `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

// Animate the vehicle along the track
function animateVehicle(progress) {
    const pathLength = path.getTotalLength();
    const point = path.getPointAtLength(progress * pathLength);

    // Update vehicle Position
    vehicle.setAttribute('cx', point.x);
    vehicle.setAttribute('cy', point.y);
}

// Reset function
function resetTelemetry() {
    speed = 0;
    rpm = 0;
    lapTime = 0;
    trackPosition = 0;
    lapCounter = 0;

    document.getElementById('speed').textContent = speed;
    document.getElementById('rpm-progress').style.width = '0%';
    document.getElementById('lap-time').textContent = '00:00:00';
    document.getElementById('lap-counter').textContent = lapCounter;

    // Reset vehicle position
    animateVehicle(0);
}

// Add event listener for reset button
document.getElementById('reset-button').addEventListener('click', resetTelemetry);

// Start simulation
setInterval(updateTelemetry, 500); 
setInterval(updateLapTime, 100);