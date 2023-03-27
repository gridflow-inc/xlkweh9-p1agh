
AOS.init({
    duration: 1000, // Animation duration in milliseconds (e.g., 1000ms = 1s)
    once: true, // Whether the animation should happen only once or every time you scroll
  });
const heroContent = document.querySelector('.hero-content');
const circles = document.querySelectorAll('.circle');

function updateCircles() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    circles.forEach((circle, index) => {
        const factor = 0.1 * (index + 1);
        circle.style.transform = `translateY(${scrollTop * factor}px)`;
    });
}

window.addEventListener('scroll', updateCircles);

heroContent.addEventListener('mouseenter', () => {
    circles.forEach((circle, index) => {
        const factor = 10 * (index + 1);
        circle.style.transition = 'transform 0.3s';
        circle.style.transform += `translate(${factor}px, ${factor}px)`;
    });
});

heroContent.addEventListener('mouseleave', () => {
    circles.forEach((circle) => {
        circle.style.transition = 'transform 0.3s';
        circle.style.transform = circle.style.transform.replace(/translate\(\d+px, \d+px\)/, '');
        updateCircles();
    });
});

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

const menuToggle = document.querySelector("#menu-toggle");
menuToggle.addEventListener("click", toggleMenu);


const features = document.querySelectorAll('.feature');
const featureModal = document.querySelector('.feature-modal');
const modalContent = featureModal.querySelector('.modal-content');
const closeModal = featureModal.querySelector('.close');
const modalTitle = modalContent.querySelector('.modal-title');
const modalDescription = modalContent.querySelector('.modal-description');

const featureDetails = {
    "software-suite": {
        title: "GridFlow Software Suite",
        description: "Our comprehensive software suite helps deploy and manage EV charging infrastructure. It offers real-time monitoring, usage analytics, pricing optimization, and more."
    },
    "ai-powered": {
        title: "AI-Powered Features",
        description: "GridFlow integrates AI algorithms for enhanced efficiency and user experience. AI-powered features include predictive maintenance, energy optimization, customer behavior analysis, and more."
    },
    "mobile-app": {
        title: "Mobile App for EV Drivers",
        description: "Our user-friendly mobile app offers real-time charging station information, customizable payment options, detailed station information, user reviews, and more."
    }
};

function openFeatureModal(feature) {
    const { title, description } = featureDetails[feature];
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    featureModal.classList.remove('hidden');
}

function closeFeatureModal() {
    featureModal.classList.add('hidden');
}

features.forEach(feature => {
    feature.addEventListener('click', () => {
        openFeatureModal(feature.dataset.feature);
    });
});

closeModal.addEventListener('click', closeFeatureModal);
featureModal.addEventListener('click', (e) => {
    if (e.target === featureModal) {
        closeFeatureModal();
    }
});
