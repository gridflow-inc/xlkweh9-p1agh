
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


  function smoothScroll(target, duration) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      smoothScroll(target, 2000); // 1000ms = 1s scrolling duration
    });
  });


// Get the feature cards and the modal elements
const cards = document.querySelectorAll(".feature-card");
const modal = document.getElementById("modal");
const close = document.querySelector(".close");
const modalContent = document.getElementById("modal-content");

// Add an event listener for each feature card
cards.forEach((card) => {
  card.addEventListener("click", () => {
    // Load the corresponding content based on the card's ID
    if (card.id === "card1") {
      modalContent.innerHTML = "<h2>Seamless Integration</h2><p>Feature 1 description...</p>";
    } else if (card.id === "card2") {
      modalContent.innerHTML = "<h2>Intelligent Charging</h2><p>Feature 2 description...</p>";
    }
    // ...add more conditions for other cards

    // Show the modal
    modal.style.display = "block";
  });
});

// Close the modal when the close button is clicked
close.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

//BREAK 
//BREAK
//BREAK

document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});

//BREAK
//BREAK
//BREAK

let particles = [];
let blurredCircle;


function setup() {
    let industrySection = document.getElementById('industries');
    let rect = industrySection.getBoundingClientRect();
  
    let canvas = createCanvas(windowWidth, rect.height);
    canvas.position(0, rect.top);
    canvas.style('z-index', '-1');
  }
  

  function draw() {
    background(0);
    if (frameCount % 1 === 0) { // Change the number 10 to control the rate of particle generation
      createParticles();
      createParticles();
    }
    moveParticles();
    removeParticles();
  }

function windowResized() {
    let industrySection = document.getElementById('industries');
    let rect = industrySection.getBoundingClientRect();
  
    resizeCanvas(windowWidth, rect.height);
    canvas.position(0, rect.top);
  }
  

  function createParticles() {
    // Get the position of the industries-content
    const industriesContent = document.querySelector(".industries-content");
    const rect = industriesContent.getBoundingClientRect();
  
    // Generate random spawn points within the industries-content element
    const spawnX = random(rect.left, rect.left + rect.width);
    const spawnY = random(rect.top, rect.top + rect.height);
  
    let p = new Particle(spawnX, spawnY);
    particles.push(p);
  }
  
  
  
  
  function moveParticles() {
    for (let p of particles) {
      p.update();
      p.display();
    }
  }
  
  function removeParticles() {
    particles = particles.filter(p => !p.isOutside());
  }

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = random(5, 20);
      this.vx = random(-3, 3);
      this.vy = random(-3, 3);
      this.alpha = 0;
    }
  
    update() {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = dist(this.x, this.y, mouseX, mouseY)*5;
      const force = 100 / distance;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
  
      this.vx += fx;
      this.vy += fy;
      this.x += this.vx;
      this.y += this.vy;
  
      // Increase the alpha value over time (adjust the value to control the fade-in speed)
      if (this.alpha < 255) {
        this.alpha += 2;
      }
    }
  
    display() {
        // Calculate distance to the closest edge of the industry section
        const industrySection = document.getElementById("industries");
        const rect = industrySection.getBoundingClientRect();
        const distToLeft = Math.abs(this.x - rect.left);
        const distToRight = Math.abs(this.x - rect.right);
        const distToTop = Math.abs(this.y - rect.top);
        const distToBottom = Math.abs(this.y - rect.bottom);
        const minDistToEdge = Math.min(distToLeft, distToRight, distToTop, distToBottom);
    
        // Calculate transparency based on distance to the edge (0 at the edge, 100 at 100px or more from the edge)
        const transparency = Math.min(200, minDistToEdge);
    
        fill(253, 154, 39, transparency);
        noStroke();
        ellipse(this.x, this.y, this.size);
      }
    
  
    isOutside() {
      return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
    }
  }
  
