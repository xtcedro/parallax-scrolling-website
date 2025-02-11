export function setupNavigation() {
    const navbar = document.querySelector(".navbar");

    // Insert HTML for the sticky navigation bar with a title
    navbar.innerHTML = `
        <div class="menu-container">
            <div class="navbar-title">
                <h1>Dominguez Tech Solutions</h1>
            </div>
            <button class="hamburger-menu" id="menu-toggle" aria-label="Open navigation">
                ☰
            </button>
            <div class="sidebar hidden" id="sidebar-menu">
                <div class="sidebar-header">
                    <h2>📌 Menu</h2>
                    <button class="close-menu" id="close-menu" aria-label="Close navigation">✖</button>
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">🏠 Home</a></li>
                    <li><a href="about.html">🧑‍💻 About Us</a></li>
                    <li><a href="crashcourse.html">📚 Crash Course</a></li>
                    <li><a href="chatbot.html">🤖 AI Chatbot</a></li>
                    <li><a href="services.html">🛠️ Services</a></li>
                    <li><a href="contact.html">📬 Contact</a></li>
                </ul>
                <div class="cta-container">
                    <a href="appointment-booker.html" class="cta-button">🚀 Reserve Your Spot</a>
                </div>
            </div>
            <div class="overlay hidden" id="menu-overlay"></div>
        </div>
    `;

    // Get elements
    const menuButton = document.getElementById("menu-toggle");
    const sidebarMenu = document.getElementById("sidebar-menu");
    const closeButton = document.getElementById("close-menu");
    const overlay = document.getElementById("menu-overlay");

    // Open Sidebar
    function openMenu() {
        sidebarMenu.classList.add("visible");
        sidebarMenu.classList.remove("hidden");
        overlay.classList.remove("hidden");
        document.body.classList.add("no-scroll"); // Prevent scrolling
    }

    // Close Sidebar
    function closeMenu() {
        sidebarMenu.classList.remove("visible");
        sidebarMenu.classList.add("hidden");
        overlay.classList.add("hidden");
        document.body.classList.remove("no-scroll");
    }

    // Event Listeners
    menuButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // Close menu on Escape key press
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && sidebarMenu.classList.contains("visible")) {
            closeMenu();
        }
    });

    // Highlight the active page
    const currentPath = window.location.pathname.split("/").pop();
    const links = sidebarMenu.querySelectorAll(".nav-links a");

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
}