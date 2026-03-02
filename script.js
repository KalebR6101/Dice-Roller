// script.js

// Function to roll the dice
async function rollDice() {
  try {
    // Fetch from your Azure Node backend
    const response = await fetch(
      "https://web-dice-node-awgqftcadtajdyhz.canadacentral-01.azurewebsites.net/roll"
    );

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    // Display the dice result on the page
    const resultElement = document.getElementById("diceResult");
    resultElement.textContent = `🎲 You rolled: ${data.dice}`;
  } catch (err) {
    console.error("Error fetching dice:", err);

    // Display error message for the user
    const resultElement = document.getElementById("diceResult");
    resultElement.textContent = "❌ Failed to roll dice. Check console.";
  }
}

// Attach event listener to the Roll Dice button
document.getElementById("rollButton").addEventListener("click", rollDice);

// Optional: Wake up the backend on page load
async function wakeUpBackend() {
  try {
    await fetch(
      "https://web-dice-node-awgqftcadtajdyhz.canadacentral-01.azurewebsites.net/roll"
    );
    console.log("Backend woken up!");
  } catch (err) {
    console.error("Backend wake-up failed:", err);
  }
}

// Wake up backend immediately when page loads
wakeUpBackend();
