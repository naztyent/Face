const leftEye = document.getElementById("leftEye");
const rightEye = document.getElementById("rightEye");

document.addEventListener("mousemove", (event) => {
    const { clientX: mouseX, clientY: mouseY } = event;
    
    updateEyePosition(leftEye, mouseX, mouseY);
    updateEyePosition(rightEye, mouseX, mouseY);
});

document.addEventListener("touchmove", function(event) {
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
    const eyeRadius = 5; 
    const eyeX = eyeRadius * Math.cos(angle);
    const eyeY = eyeRadius * Math.sin(angle);

    eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
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
    speechBubble.style.display = "block"; 

    setTimeout(() => {
        speechBubble.style.display = "none";
    }, 3000);
}

setInterval(showRandomSentence, Math.random() * 10000 + 20000); 

document.body.addEventListener('click', function() {
    var notification = document.getElementById('notification');
    notification.style.display = 'block'; // Show the notification

    setTimeout(function() {
        notification.style.display = 'none';
    }, 10000);
});
