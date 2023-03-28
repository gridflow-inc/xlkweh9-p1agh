
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






