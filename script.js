// Roll dice function
function rollDice() {
    // Loop through 5 dice
    for (let i = 1; i <= 5; i++) {
        let dieValue = Math.floor(Math.random() * 6) + 1; // 1-6
        document.getElementById('die' + i).value = dieValue;
    }
}

// Allow pressing Enter to roll dice
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("rollButton").click();
    }
});
