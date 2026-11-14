document.addEventListener("DOMContentLoaded", () => {
    console.log("VELOCE.OS System Initialized successfully.");

    // Helper function to write messages to your STDOUT TERMINAL LOGS box
    const logToTerminal = (message) => {
        // Looks for common terminal log containers
        const terminal = document.querySelector("textarea, pre, .terminal-logs, [class*='terminal']");
        const timestamp = new Date().toLocaleTimeString();
        
        if (terminal) {
            if (terminal.tagName === "TEXTAREA") {
                terminal.value += `\n[${timestamp}] ${message}`;
                terminal.scrollTop = terminal.scrollHeight;
            } else {
                terminal.innerHTML += `<br>[${timestamp}] ${message}`;
            }
        }
        console.log(`[VELOCE LOG]: ${message}`);
    };

    // Make navigation and portal buttons interactive
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const actionText = btn.textContent.trim();
            logToTerminal(`Action triggered: ${actionText}`);

            // Specific handler for Book Ride button
            if (actionText.includes("Book Ride")) {
                logToTerminal("Processing dispatch request via VeloceCore...");
                setTimeout(() => {
                    logToTerminal("SUCCESS: Driver matched and en route.");
                }, 600);
            }

            // Specific handler for Cancel button
            if (actionText.includes("Cancel")) {
                logToTerminal("Transaction cancelled by user.");
            }
        });
    });

    logToTerminal("# System event listeners attached. Ready.");
});
