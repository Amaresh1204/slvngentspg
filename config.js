// EmailJS Configuration - Loads from API endpoint
let emailConfig = {};

// Fetch configuration from API
async function loadEmailConfig() {
    try {
        const response = await fetch('/api/config');
        emailConfig = await response.json();
        return emailConfig;
    } catch (error) {
        console.error('Failed to load email configuration:', error);
        return null;
    }
}

// Initialize configuration on page load
loadEmailConfig(); 