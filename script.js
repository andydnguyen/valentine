// References to elements
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const heartContainer = document.getElementById("heartContainer");

// 1) NO BUTTON RUNS AWAY
// Desktop hover
noBtn.addEventListener("mouseover", moveNoButton);
// Mobile touch
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // stops the default tap
  moveNoButton();
});
// If somehow clicked
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  message.innerText = "Nice try! I'm not taking ‘No’ for an answer, Jennifer. ❤️";
  moveNoButton();
});

function moveNoButton() {
  const offsetX = Math.floor(Math.random() * (window.innerWidth - 100));
  const offsetY = Math.floor(Math.random() * (window.innerHeight - 50));
  noBtn.style.position = "absolute";
  noBtn.style.left = offsetX + "px";
  noBtn.style.top = offsetY + "px";
}

// 2) YES BUTTON
yesBtn.addEventListener("click", () => {
  message.innerText = "Thank you for forgiving my lateness, Jennifer! I love you so much. ❤️";
  createHearts();
});

// 3) HEARTS CONFETTI
function createHearts() {
  // Spawn hearts every 200ms
  const heartsInterval = setInterval(() => {
    // Create multiple hearts at once for a fuller effect
    for (let i = 0; i < 3; i++) {
      spawnSingleHeart();
    }
  }, 200);

  // Stop creating hearts after 10 seconds
  setTimeout(() => {
    clearInterval(heartsInterval);
  }, 10000);
}

function spawnSingleHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "&#10084;"; // Heart symbol
  heart.style.position = "absolute";
  heart.style.color = "red";

  // Randomize size
  const size = Math.floor(Math.random() * 20) + 10; // 10px to 30px
  heart.style.fontSize = size + "px";

  // Random start position
  let xPos = Math.random() * window.innerWidth;
  let yPos = -50; // start slightly above top

  heart.style.left = xPos + "px";
  heart.style.top = yPos + "px";
  heartContainer.appendChild(heart);

  // Random fall speed + slight horizontal drift
  const fallSpeed = Math.random() * 3 + 2; // 2 to 5
  const horizontalDrift = (Math.random() - 0.5) * 2; // -1 to 1

  // Animate the heart
  const fallInterval = setInterval(() => {
    xPos += horizontalDrift;
    yPos += fallSpeed;
    heart.style.left = xPos + "px";
    heart.style.top = yPos + "px";

    // Remove the heart if it goes off screen
    if (yPos > window.innerHeight || xPos < -50 || xPos > window.innerWidth + 50) {
      clearInterval(fallInterval);
      heartContainer.removeChild(heart);
    }
  }, 20);
}
