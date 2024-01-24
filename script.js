const emoticons = ["< ⚆_⚆>", "<☉_☉ >", "< ◕‿◕>", "<◕‿◕ >", "<⇀‿‿↼>", "<≖‿‿≖>", "<◕‿‿◕>", "<-__->", "<°▃▃°>", "<⌐■_■>", "<•‿‿•>", "<ᵔ◡◡ᵔ>", "<^‿‿^>", "<☼‿‿☼>", "<≖__≖>", "<✜‿‿✜>", "<ب__ب>", "<╥☁╥ >", "<-_-'>", "<♥‿‿♥>", "<☓‿‿☓>", "<#__#>", "<1__0>", "<1__1>", "<0__1>"];
function changeEmoticon() {
    const randomIndex = Math.floor(Math.random() * emoticons.length);
    document.getElementById('emoticon').innerText = emoticons[randomIndex];
}
setInterval(changeEmoticon, 2000); // Change emoticon every 2 seconds
