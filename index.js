const catList = document.getElementById("cat-list");
const dogList = document.getElementById("dog-list");

// Preload the audio so it plays instantly on first click
const coinSfx = new Audio("media/totallyCopyrightFreeCoinSfx.wav");

const emojis = {
    catEmojis: ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🐱"],
    dogEmojis: ["🐶", "🐕", "🦮", "🐩", "🐾", "🐺", "🦊", "🦝", "🐕‍🦺", "🐩‍🦱"],
};

function renderList(emojiArray, emojiContainer) {
    for (let i = 0; i < emojiArray.length; i++) {
        const emojiItem = document.createElement("li");
        emojiItem.innerText = emojiArray[i];
        emojiItem.addEventListener("click", onEmojiClick);
        emojiContainer.appendChild(emojiItem);
    }
}

renderList(emojis.catEmojis, catList);
renderList(emojis.dogEmojis, dogList);

function onEmojiClick(event) {
    const emoji = event.target;

    // Create a new audio each time to allow for spam click sounds
    const coinSfx = new Audio("media/totallyCopyrightFreeCoinSfx.wav");
    
    // Create a span element for the "Copied!" message
    const copiedBubble = document.createElement("span");
    copiedBubble.innerText = "Copied!";
    copiedBubble.classList.add("copied");
    
    // Copy the emoji text to the clipboard
    navigator.clipboard.writeText(emoji.innerText);
    
    // Play the coin sound effect
    coinSfx.play();

    // Add classes to the emoji for animation
    emoji.classList.add("bounceUp");
    emoji.classList.add("zAxis");

    // Prevent clicks on the copiedBubble from happening
    copiedBubble.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Append the copiedBubble to the emoji and set its initial opacity
    emoji.appendChild(copiedBubble);
    copiedBubble.style.opacity = 1;

    // Remove animation class and clean up after animation ends
    emoji.addEventListener("animationend", () => {
        emoji.classList.remove("bounceUp");

        // Fade out the copiedBubble after 200ms
        setTimeout(() => {
            copiedBubble.style.opacity = 0;
        }, 200);

        // Remove the copiedBubble and zAxis class after 400ms
        setTimeout(() => {
            emoji.removeChild(copiedBubble);
            emoji.classList.remove("zAxis");
        }, 400);
    });
}