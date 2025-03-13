const canvas = document.getElementById('dvdCanvas');
const ctx = canvas.getContext('2d');
const bounceSound = document.getElementById('bounceSound');
const logos = [];
const logoImage = new Image();
logoImage.src = 'dvd_logo.png'; // Add your DVD logo image file here

class DVDLogo {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = 100;
    this.height = 50;
  }

  draw() {
    ctx.drawImage(logoImage, this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.x + this.width >= canvas.width || this.x <= 0) {
      this.dx = -this.dx;
      bounceSound.play();
    }
    if (this.y + this.height >= canvas.height || this.y <= 0) {
      this.dy = -this.dy;
      bounceSound.play();
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function addLogo() {
  const x = Math.random() * (canvas.width - 100);
  const y = Math.random() * (canvas.height - 50);
  const dx = (Math.random() - 0.5) * 4;
  const dy = (Math.random() - 0.5) * 4;
  logos.push(new DVDLogo(x, y, dx, dy));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  logos.forEach(logo => logo.update());
  requestAnimationFrame(animate);
}

setInterval(addLogo, 5000); // Add a new logo every 5 seconds
logoImage.onload = () => {
  addLogo();
  animate();
};
