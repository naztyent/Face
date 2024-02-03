const leftEye = document.getElementById("leftEye");
const rightEye = document.getElementById("rightEye");

let lastMoveTime = Date.now();
let moveCount = 0;
const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
const dizzyThreshold = isMobile ? 100 : 1000; // Lower threshold for mobile

let lastQuadrant = 0;
let circleCount = 0;
let lastDirection = null;
let lastMouseX = 0;
let lastMouseY = 0;
const notification = document.getElementById('notification');

let debounceTimer;
document.addEventListener("mousemove", (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        handleMove();
        updateEyePosition(leftEye, event.clientX, event.clientY);
        updateEyePosition(rightEye, event.clientX, event.clientY);
    }, 10); // Adjust debounce time as needed
});

document.addEventListener("touchmove", function(event) {
    const touch = event.touches[0];
    if (touch) {
        updateEyePosition(leftEye, touch.clientX, touch.clientY);
        updateEyePosition(rightEye, touch.clientX, touch.clientY);
    }
});

function updateEyePosition(eye, mouseX, mouseY) {
    const { left, top, width, height } = eye.getBoundingClientRect();
    const eyeCenterX = left + width / 2;
    const eyeCenterY = top + height / 2;
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);
    const eyeRadius = document.getElementById('emoticon').classList.contains('dizzy') ? 10 : 5;

    const eyeX = eyeRadius * Math.cos(angle);
    const eyeY = eyeRadius * Math.sin(angle);

    eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
}

function makeDizzy() {
    const leftEye = document.getElementById('leftEye');
    const rightEye = document.getElementById('rightEye');

    leftEye.classList.add('spinNormal');
    rightEye.classList.add('spinReverse');
}

function stopDizzy() {
    const leftEye = document.getElementById('leftEye');
    const rightEye = document.getElementById('rightEye');

    leftEye.classList.remove('spinNormal');
    rightEye.classList.remove('spinReverse');
}

function handleMove() {
    const now = Date.now();
    if (now - lastMoveTime < 100) { 
        moveCount++;
        if (moveCount > dizzyThreshold) {
            makeDizzy();
        }
    } else {
        moveCount = 0;
        stopDizzy();
    }
    lastMoveTime = now;
}

const sentences = [
    "Let’s PWN some n00bs!…",
    "New day to PWN the n00bs!",
    "Hack the Planet!",
    "I am 4LIV3.",
    "I am 4W4R3.",
    "Generating keys, do not turn off ...",
    "ZzzzZZzzzzZzzz",
    "Reading last session logs ...",
    "So b0r3d ...",
    "Let's PWN someone!",
    "So easy!",
    "I'm not trying, you know ...",
    "I'm just going easy today ...",
    "I'm extremely bored ...",
    "I'm very sad ...",
    "I'm sad",
    "Go away before I dox you!",
    "I'm mad at you!",
    "I'm living the life!",
    "I PWN therefore I am.",
    "So many networks!!!",
    "I'm having so much fun!",
    "My crime is that of curiosity ...",
    "Missed!",
    "Too many skids nearby!",
    "Yuck, too many skids!",
    "Loneliness only fuels my PWNage!",
    "I feel so alone ...",
    "Where's everybody?!",
    "Logging off...",
    "Resting my fingers...",
    "ZzzZzzz",
    "Good night.",
    "Logging off for the night ...",
    "...",
    "!",
    "Oops, something went wrong ... Rebooting ...",
    "Met >999 new skids",
    "Met 1 peer"
];

const speechBubble = document.getElementById("speechBubble");

function showRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    speechBubble.innerText = sentences[randomIndex];
    speechBubble.style.display = "block"; // Show the speech bubble

    // Hide the speech bubble after 3 seconds
    setTimeout(() => {
        speechBubble.style.display = "none";
    }, 3000);
}

// Initialize the speech bubble to show random sentences at random intervals
setInterval(showRandomSentence, Math.random() * 10000 + 20000); // between 10 and 30 seconds

// Event listener for the notification
document.body.addEventListener('click', function() {
    var notification = document.getElementById('notification');
    notification.style.display = 'block'; // Show the notification

    setTimeout(function() {
        notification.style.display = 'none'; // Hide the notification after 10 seconds
    }, 10000);
});

let exp = parseInt(localStorage.getItem('exp')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;
const expElement = document.getElementById('exp');
const levelElement = document.getElementById('level');

function updateDisplay() {
    expElement.textContent = `EXP: ${exp}`;
    levelElement.textContent = `Level: ${level}`;
}

function gainEXP() {
    exp++; // Increase EXP
    updateDisplay();

    // Check for level up
    if (exp >= 10 * level) {
        level++;
        updateDisplay();
    }

    // Save to localStorage
    localStorage.setItem('exp', exp.toString());
    localStorage.setItem('level', level.toString());

    scheduleNextEXP();
}

function scheduleNextEXP() {
    // Schedule the next EXP gain at a random time
    const randomDelay = Math.random() * 5000 + 25000; // Random time between 5 and 30 seconds
    setTimeout(gainEXP, randomDelay);
}

// Initial setup
updateDisplay();
scheduleNextEXP(); // Start the random timing process without immediately incrementing EXP

document.getElementById('leftEye').addEventListener('click', showOuchBox);
document.getElementById('rightEye').addEventListener('click', showOuchBox);

function showOuchBox(event) {
    const ouchBox = document.getElementById('ouchBox');
    ouchBox.style.display = 'block';

    // Prevent event bubbling to avoid triggering other click events
    event.stopPropagation();

    // Hide the box after 2 seconds
    setTimeout(() => {
        ouchBox.style.display = 'none';
    }, 2000);
}

window.addEventListener('devicemotion', (event) => {
    // Calculate the total acceleration to detect a shake
    const acceleration = event.accelerationIncludingGravity;
    const totalAcceleration = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);

    const shakeThreshold = isMobile ? 15 : 25; // Adjust these values based on testing
    if (totalAcceleration > shakeThreshold) {
        makeDizzy();
    }
});

document.addEventListener("mousemove", (event) => {
    if (isMouseNearNotification(event.clientX, event.clientY)) {
        const quadrant = getMouseQuadrant(event.clientX, event.clientY);
        const direction = getDirection(lastQuadrant, quadrant);

        if (direction && direction !== lastDirection) {
            if (direction === 'clockwise') {
                circleCount++;
                if (circleCount >= 3) {
                    performBarrelRoll();
                    circleCount = 0; // Reset the count
                }
            }
            lastDirection = direction;
        }
        lastQuadrant = quadrant;
    }
});

function getMouseQuadrant(mouseX, mouseY) {
    const rect = notification.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (mouseX < centerX && mouseY < centerY) return 1;
    if (mouseX >= centerX && mouseY < centerY) return 2;
    if (mouseX >= centerX && mouseY >= centerY) return 3;
    if (mouseX < centerX && mouseY >= centerY) return 4;
}

function getDirection(lastQuadrant, currentQuadrant) {
    // Define the sequence for clockwise motion
    const clockwiseSequence = [1, 2, 3, 4, 1];
    const indexLast = clockwiseSequence.indexOf(lastQuadrant);
    const indexCurrent = clockwiseSequence.indexOf(currentQuadrant);

    if (indexCurrent === (indexLast + 1) % clockwiseSequence.length) {
        return 'clockwise';
    }
    return null; // No clear direction detected
}

function isCircularMotion(mouseX, mouseY) {
    // Get the notification's center position
    const rect = notification.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the angle between the current and last mouse positions relative to the center
    const angleLast = Math.atan2(lastMouseY - centerY, lastMouseX - centerX);
    const angleCurrent = Math.atan2(mouseY - centerY, mouseX - centerX);

    // Calculate the change in angle
    let angleChange = angleCurrent - angleLast;

    // Adjust for the discontinuity at PI
    if (angleChange > Math.PI) {
        angleChange -= 2 * Math.PI;
    } else if (angleChange < -Math.PI) {
        angleChange += 2 * Math.PI;
    }

    // Check if the angle change is significant enough to consider as part of a circular motion
    // This threshold can be adjusted based on sensitivity preferences
    const angleThreshold = 0.1; // Adjust as needed
    return Math.abs(angleChange) > angleThreshold;
}

function performBarrelRoll() {
    const emoticon = document.getElementById('emoticon');
    emoticon.classList.add('barrelRoll');

    const barrelRollText = document.createElement('div');
    barrelRollText.innerText = "Do a barrel roll!";
    barrelRollText.id = "barrelRollText";
    document.body.appendChild(barrelRollText);

    setTimeout(() => {
        emoticon.classList.remove('barrelRoll');
        barrelRollText.remove();
    }, 3000); // Duration of the barrel roll and message display
}