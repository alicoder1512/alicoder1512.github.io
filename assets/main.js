const MAX_CLICKS = 100;
let coinCount = 0;

let progressCurrent = MAX_CLICKS;

document.getElementById("coin-count").textContent = coinCount;

function incrementCoins(event) {
  if (progressCurrent > 0) {
    coinCount += 1;
    progressCurrent -= 1;
    updateProgressBar();
    document.getElementById("coin-count").textContent = coinCount;

    const incrementElement = document.getElementById("increment");
    const rect = event.target.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    incrementElement.style.left = x + "px";
    incrementElement.style.top = y + "px";

    incrementElement.classList.remove("animate");
    void incrementElement.offsetWidth; // trigger reflow
    incrementElement.classList.add("animate");

    // Remove text selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }

    // Coinlar avtomatik saqlansin
  }
}

// Sahifa yuklanganda boshlang'ich sozlamalarni yuklash
document.addEventListener("DOMContentLoaded", function () {
  startAutoIncrement();
});

// Increment functionni to'g'ri bog'lash
document.querySelector(".coin").onclick = incrementCoins;

// Rasmni olishni taqiqlash
document.querySelectorAll("img").forEach((img) => {
  img.ondragstart = function () {
    return false;
  };
});

// Progress barni yangilash
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-current");
  const percentage = ((MAX_CLICKS - progressCurrent) / MAX_CLICKS) * 100;
  progressBar.style.width = percentage + "%";
  progressText.textContent = MAX_CLICKS - progressCurrent;
}

// Har sekundda progressni oshirish
function startAutoIncrement() {
  setInterval(function () {
    if (progressCurrent < MAX_CLICKS) {
      progressCurrent += 1;
      updateProgressBar();
    }
  }, 1000);
}
