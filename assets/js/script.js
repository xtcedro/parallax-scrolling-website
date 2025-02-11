import { loadHeader, loadFooter } from './load-components.js';
import { setupNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initializeChatbot } from './chatbot.js'; // ✅ Import chatbot module
import { fetchAppointments } from './public-appointments.js';
import { submitAppointments } from './appointment-booker.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    initAnimations();
    initializeChatbot(); // ✅ Initialize chatbot functionality
    fetchAppointments();
    submitAppointments();
});
