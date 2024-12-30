// Simulate telemetry data
let speed = 0;
let rpm = 0;
let lapTime = 0;
let trackPosition = 0;

// Update data
function updateTelemetry() {
    speed = Math.floor(Math.random() * 300); // Random Speed (0-300 km/h)
    rpm = Math.floor(Math.random() * 10000); // Random RPm (0-10000)
    trackPosition = (trackPosition + 5) % 100; // Simulated track position (0-100%)

    // Update user interface
    document.getElementById('speed').textContent = speed;
    document.getElementById('rpm-progress').style.width = `${(rpm / 10000) * 100}%`;
    document.getElementById('vehicle').style.left = `${trackPosition}%`;
}

// Update lap timer
function updateLapTime() {
    lapTime++;
    const minutes = Math.floor(lapTime / 60);
    const seconds = lapTime % 60;
    const milliseconds = lapTime % 100;
    document.getElementById('lap-time').textContent =  `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

// Start simulation
setInterval(updateTelemetry, 500); 
setInterval(updateLapTime, 100);