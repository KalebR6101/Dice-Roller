// script.js

// Function to roll five dice
async function rollDice() {
  try {
    // Loop to fetch each die separately from the backend
    for (let i = 1; i <= 5; i++) {
      const response = await fetch(
        "https://web-dice-node-awgqftcadtajdyhz.canadacentral-01.azurewebsites.net/roll"
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Update each dice input box
      document.getElementById(`die${i}`).value = data.dice;

      // Optional: log to console
      console.log(`Die ${i} rolled: ${data.dice}`);
    }
  } catch (err) {
    console.error("Error fetching dice:", err);
    for (let i = 1; i <= 5; i++) {
      document.getElementById(`die${i}`).value = "ERR";
    }
  }
}

// Function to wake up backend on page load
async function wakeUpBackend() {
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

// Wake up backend immediately when page loads
wakeUpBackend();

// Optional: Press Enter to roll dice
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") rollDice();
});

// 🔹 New: Keep backend alive by pinging every 4 minutes
setInterval(() => {
  fetch("https://web-dice-node-awgqftcadtajdyhz.canadacentral-01.azurewebsites.net/roll")
    .then(res => console.log("Backend pinged:", res.status))
    .catch(err => console.error("Backend ping failed:", err));
}, 4 * 60 * 1000); // every 4 minutes
