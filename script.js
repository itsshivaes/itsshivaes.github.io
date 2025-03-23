// Dark Mode Toggle for Desktop
const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
const sunIconDesktop = document.getElementById('sun-icon-desktop');
const moonIconDesktop = document.getElementById('moon-icon-desktop');

// Dark Mode Toggle for Mobile
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const sunIconMobile = document.getElementById('sun-icon-mobile');
const moonIconMobile = document.getElementById('moon-icon-mobile');

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);

    // Toggle icons for desktop
    sunIconDesktop.style.display = isDarkMode ? 'none' : 'block';
    moonIconDesktop.style.display = isDarkMode ? 'block' : 'none';

    // Toggle icons for mobile
    sunIconMobile.style.display = isDarkMode ? 'none' : 'block';
    moonIconMobile.style.display = isDarkMode ? 'block' : 'none';
}

// Add event listeners
themeToggleDesktop.addEventListener('click', toggleDarkMode);
themeToggleMobile.addEventListener('click', toggleDarkMode);

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('dark-mode');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
    sunIconDesktop.style.display = 'none';
    moonIconDesktop.style.display = 'block';
    sunIconMobile.style.display = 'none';
    moonIconMobile.style.display = 'block';
} else {
    sunIconDesktop.style.display = 'block';
    moonIconDesktop.style.display = 'none';
    sunIconMobile.style.display = 'block';
    moonIconMobile.style.display = 'none';
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('header nav ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

//contact form
document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission

            // Get input values
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;

            // Construct the mailto link
            let subject = encodeURIComponent("New Contact Form Message from " + name);
            let body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);
            let mailtoLink = `mailto:itsshivaes@gmail.com?subject=${subject}&body=${body}`;

            // Open the user's email app
            window.location.href = mailtoLink;
        });