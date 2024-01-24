const emoticons = ["< ⚆_⚆>", "<☉_☉ >", "< ◕‿◕>", "<◕‿◕ >", "<⇀‿‿↼>", "<≖‿‿≖>", "<◕‿‿◕>", "<-__->", "<°▃▃°>", "<⌐■_■>", "<•‿‿•>", "<ᵔ◡◡ᵔ>", "<^‿‿^>", "<☼‿‿☼>", "<≖__≖>", "<✜‿‿✜>", "<ب__ب>", "<╥☁╥ >", "<-_-'>", "<♥‿‿♥>", "<☓‿‿☓>", "<#__#>", "<1__0>", "<1__1>", "<0__1>"];
const emoticonElement = document.getElementById('emoticon');

function changeEmoticon() {
    // Fade out the emoticon
    emoticonElement.style.opacity = 0;

    setTimeout(() => {
        // Get a random emoticon
        const randomIndex = Math.floor(Math.random() * emoticons.length);
        emoticonElement.innerText = emoticons[randomIndex];

        // Fade in the new emoticon
        emoticonElement.style.opacity = 1;
    }, 500); // This should match half of the transition time in CSS
}

// Initial display and fade-in of the first emoticon
changeEmoticon();
setInterval(changeEmoticon, 3000); // Change emoticon every 3 seconds

document.body.addEventListener('click', function() {
    var notification = document.getElementById('notification');
    notification.style.display = 'block'; // Show the notification

    // Hide the notification after 3 seconds
    setTimeout(function() {
        notification.style.display = 'none';
    }, 3000);
});
