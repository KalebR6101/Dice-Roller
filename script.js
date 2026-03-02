// script.js

// Function to roll five dice
async function rollDice() {
  try {
    for (let i = 1; i <= 5; i++) {
      const response = await fetch(
        "https://web-dice-node-awgqftcadtajdyhz.canadacentral-01.azurewebsites.net/roll"
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      document.getElementById(`die${i}`).value = data.dice;

      console.log(`Die ${i} rolled: ${data.dice}`);
    }
  } catch (err) {
    console.error("Error fetching dice:", err);

    for (let i = 1; i <= 5; i++) {
      document.getElementById(`die${i}`).value = "ERR";
    }
  }
}

// Function to wake up backend
async function wakeUpBackend() {
  console.log("Trying to wake up backend...");

  try {
    const response = await fetch(
      "https://web-dice-node-awgqftcadtajdyhz.canadacentral-01.azurewebsites.net/roll"
    );

    if (response.ok) {
      console.log("Backend woken up successfully!");
    } else {
      console.warn("Backend wakeup fetch returned status:", response.status);
    }
  } catch (err) {
    console.error("Backend wake-up failed:", err);
  }
}

// Wake backend when page loads
wakeUpBackend();

// Allow Enter key to roll dice
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    rollDice();
  }
});
