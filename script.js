// --- PRELOADER ---
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);
});

// --- THEME TOGGLE ---
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('tripTraceTheme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    
    // Update icon and save preference
    themeIcon.classList.toggle('fa-moon', !isLight);
    themeIcon.classList.toggle('fa-sun', isLight);
    localStorage.setItem('tripTraceTheme', isLight ? 'light' : 'dark');
});

// --- MOBILE MENU ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// --- SCROLL REVEAL ANIMATION ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- TRIP PLANNER LOGIC ---
function generatePlan() {
    const from = document.getElementById('fromLoc').value;
    const to = document.getElementById('toLoc').value;
    const budget = document.getElementById('maxBudget').value;
    const resultDiv = document.getElementById('planner-result');

    if (!from || !to || !budget) {
        alert("Please fill in all details to plan your trip!");
        return;
    }

    // Dynamic calculations for the "Smart" feel
    const estCost = Math.floor(budget * 0.85);
    const transport = Math.floor(estCost * 0.4);
    const food = Math.floor(estCost * 0.3);
    const stays = Math.floor(estCost * 0.3);

    // Show loading state
    resultDiv.innerHTML = `<div class="loader" style="margin: auto;"></div>`;
    resultDiv.classList.remove('hidden');

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="summary-card">
                <h3><i class="fas fa-check-circle"></i> Optimized Route Found</h3>
                <div class="summary-item">
                    <p><strong>Route:</strong> ${from} ➔ Central Hub ➔ ${to}</p>
                </div>
                <div class="summary-item">
                    <p><strong>Estimated Total:</strong> ₹${estCost}</p>
                </div>
                <div class="summary-item">
                    <p><strong>Suggested Allocation:</strong></p>
                    <small>Transport: ₹${transport} | Food: ₹${food} | Stays: ₹${stays}</small>
                </div>
                <div class="summary-item">
                    <p><strong>Travel Tip:</strong> Best time to depart is 5:00 AM to avoid heavy traffic on the expressway.</p>
                </div>
                <button class="btn-primary" style="background: white; color: var(--primary); margin-top: 10px;" onclick="window.print()">Download Itinerary</button>
            </div>
        `;
    }, 1500);
}

// --- ACTIVE LINK ON SCROLL ---
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});