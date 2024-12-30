// Select SVG Elements
const path = document.querySelector('#path4353');
const vehicle = document.querySelector('#vehicle');

// Simulate telemetry data
let speed = 0;
let rpm = 0;
let lapTime = 0;
let trackPosition = 0;
let lapCounter = 0;
let lapTimes = [];

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

        // Record lap time and reset lap timer
        lapTimes.push(lapTime);
        lapTime = 0;

        // Calculate and display average lap time
        const averageLapTime = calculateAverageLapTime();
        document.getElementById('average-lap-time').textContent = formatTime(averageLapTime);

        // Update leaderboard
        updateLeaderboard();
    }
}

// Update leaderboard
function updateLeaderboard() {
    // Sort lap times in ascending order
    const sortedLapTimes = [...lapTimes].sort((a, b) => a - b);

    // Get the leaderboard element
    const leaderboard = document.getElementById('leaderboard');

    // Clear existing leaderboard entries
    leaderboard.innerHTML = '';

    // Add sorted lap times to the leaderboard
    sortedLapTimes.forEach((time, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `Lap ${index + 1}: ${formatTime(time)}`;
        leaderboard.appendChild(listItem);
    });
}

// Update lap timer
function updateLapTime() {
    lapTime++;
    document.getElementById('lap-time').textContent = formatTime(lapTime);
}

// Format time in mm:ss:ms
function formatTime(time) {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

// Calculate average lap time
function calculateAverageLapTime() {
    if (lapTimes.length === 0) return 0;
    const totalLapTime = lapTimes.reduce((acc, time) => acc + time, 0);
    return totalLapTime / lapTimes.length;
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
    lapTimes = [];

    document.getElementById('speed').textContent = speed;
    document.getElementById('rpm-progress').style.width = '0%';
    document.getElementById('lap-time').textContent = '00:00:00';
    document.getElementById('lap-counter').textContent = lapCounter;
    document.getElementById('average-lap-time').textContent = '00:00:00';

    // Clear leaderboard
    document.getElementById('leaderboard').innerHTML = '';

    // Reset vehicle position
    animateVehicle(0);
}

// Add event listener for reset button
document.getElementById('reset-button').addEventListener('click', resetTelemetry);

// Start simulation
setInterval(updateTelemetry, 500); 
setInterval(updateLapTime, 100);