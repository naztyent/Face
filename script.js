const leftEye = document.getElementById("leftEye");
const rightEye = document.getElementById("rightEye");

document.addEventListener("mousemove", (event) => {
    const { clientX: mouseX, clientY: mouseY } = event;
    
    // Update each eye to follow the mouse cursor
    updateEyePosition(leftEye, mouseX, mouseY);
    updateEyePosition(rightEye, mouseX, mouseY);
});

function updateEyePosition(eye, mouseX, mouseY) {
    const { left, top, width, height } = eye.getBoundingClientRect();
    const eyeCenterX = left + width / 2;
    const eyeCenterY = top + height / 2;
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);
    const eyeRadius = 5; // Adjust for a more natural movement
    const eyeX = eyeRadius * Math.cos(angle);
    const eyeY = eyeRadius * Math.sin(angle);

    eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
}

// Event listener for the notification
document.body.addEventListener('click', function() {
    var notification = document.getElementById('notification');
    notification.style.display = 'block'; // Show the notification

    // Hide the notification after 3 seconds
    setTimeout(function() {
        notification.style.display = 'none';
    }, 3000);
});
