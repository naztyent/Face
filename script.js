const leftEye = document.getElementById("leftEye");
const rightEye = document.getElementById("rightEye");

let lastMoveTime = Date.now();
let moveCount = 0;
const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
const dizzyThreshold = isMobile ? 100 : 1000; // Lower threshold for mobile

document.addEventListener("mousemove", (event) => {
    const now = Date.now();
    if (now - lastMoveTime < 100) { // 100 ms for rapid movement
        moveCount++;
        if (moveCount > dizzyThreshold) {
            makeDizzy();
        }
    } else {
        moveCount = 0;
        stopDizzy();
    }
    lastMoveTime = now;
});

document.addEventListener("touchmove", function(event) {
    // Get touch coordinates
    const touch = event.touches[0];
    updateEyePosition(leftEye, touch.clientX, touch.clientY);
    updateEyePosition(rightEye, touch.clientX, touch.clientY);
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
// Attach the event listener to mousemove and touchmove
document.addEventListener("mousemove", handleMove);
document.addEventListener("touchmove", handleMove);

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

    if (totalAcceleration > 20) { // Threshold for shake detection, adjust as needed
        makeDizzy();
    }
});