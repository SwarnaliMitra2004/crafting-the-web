// Select DOM elements
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

// Add event listener to the generate button
generateBtn.addEventListener("click", generatePalette);

// Add event listener to the palette container for copy functionality (event delegation)
paletteContainer.addEventListener("click", function (e) {
    // Check if the clicked element is the copy button
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;

        // Copy hex value to clipboard
        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));
    } else if (e.target.classList.contains("color")) {
        // Check if the clicked element is the color block itself
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;

        // Copy hex value to clipboard
        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
            .catch((err) => console.log(err));
    }
});

/**
 * Temporarily changes the copy icon to a checkmark to indicate success
 * @param {HTMLElement} element - The copy button element
 */
function showCopySuccess(element) {
    // Change icon classes
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");

    // Change icon color
    element.style.color = "#48bb78";

    // Reset icon after 1.5 seconds
    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = "";
    }, 1500);
}

/**
 * Generates an array of random colors and updates the display
 */
function generatePalette() {
    const colors = [];

    // Generate 5 random colors
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

/**
 * Generates a single random hex color code
 * @returns {string} The hex color code
 */
function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Updates the UI with the generated colors
 * @param {Array<string>} colors - Array of hex color codes
 */
function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        // Apply background color and text content
        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

// Generate initial palette on load
generatePalette();