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
  
  