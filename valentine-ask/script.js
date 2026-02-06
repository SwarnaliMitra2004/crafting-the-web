// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn"); // Selected by class for reliability

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Logic to make YES btn grow 
let yesScale = 1;
yesBtn.style.transition = "transform 0.3s ease";

noBtn.addEventListener("click", () => {
    yesScale += 1.5; // Adjusted growth rate

    if (yesBtn.style.position !== "fixed") {
        yesBtn.style.position = "fixed";
        yesBtn.style.top = "50%";
        yesBtn.style.left = "50%";
    }
    // translate(-50%, -50%) keeps it centered while scaling
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
});

// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yipeeeee!"; // Fixed the comma typo here
    catImg.src = "cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
    
    // Reset position if it was fixed
    yesBtn.style.position = "relative";
    yesBtn.style.top = "0";
    yesBtn.style.left = "0";
    yesBtn.style.transform = "scale(1)";
});