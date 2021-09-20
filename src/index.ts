const can: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D = can.getContext("2d");
document.body.appendChild(can);

let speed: number = 30;
let particles: Array<Particle> = [];
let mouse = {x: 0, y: 0};
let boost: boolean = false;
let boostA: number = 40;

class Particle {
  x: number = null;
  y: number = null;
  vx: number = null;
  vy: number = null;
  oRadius: number = null;
  color: any = null;
  c: number = null;
  gravity: number = null;
  bounce: number = null;
  xFriction: number = null;

  constructor(
    x: number,
    y: number,
    oRadius: number = 10,
    color: any = 0,
  ) {
    this.x = x;
    this.y = y;
    this.oRadius = oRadius;
    this.color = color;
    this.vx = 5.0;
    this.vy = 7.0;
    this.gravity = 0.5;
    this.bounce = 0.7;
    this.xFriction = 0.05;
  }

  update = (): void => {
    if (boost) {
      this.vy += boostA;
      this.vx += boostA / 4;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;

    if (this.x + this.oRadius > can.width || this.x - this.oRadius < 0) {
      this.vx *= -1;
    }//rand

    if (this.y + this.oRadius > can.height) { //floor
      this.y = can.height - this.oRadius;
      this.vy *= -this.bounce;

      if (this.vy<0 && this.vy>-2.1) this.vy=0;
      if (Math.abs(this.vx)<1.1) this.vx=0;

      if(this.vx>0) this.vx = this.vx - this.xFriction;
      if(this.vx<0) this.vx = this.vx + this.xFriction;
    }

    if ((this.y + this.oRadius) < 0) this.vy = Math.abs(this.vy);


    this.draw();
  };

  draw = (): void => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.oRadius, 0, Math.PI * 2)
    ctx.fillStyle = `hsl(${this.color}, 100%, 60%)`;
    this.color += 1;
    ctx.fill();
    ctx.closePath();
  };
}

const animate = (): void => {
  requestAnimationFrame(animate);
  //ctx.clearRect(0,0,can.width,can.height);
  ctx.fillStyle = "rgba(0,0,0, 0.05)"
  ctx.fillRect(0,0,can.width,can.height);
  particles.forEach((particle) => {
    particle.update();
  });
  boost = false;
};

for (let i = 0; i < 20; i++) {
  particles.push(new Particle(Math.random() * window.innerWidth,Math.random() * window.innerHeight, 15, 0, ));
}

const redrawCan = (): void => {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  ctx.fillStyle = "rgba(0,0,0,255)"
  ctx.fillRect(0,0,can.width,can.height);
};
redrawCan();
animate();
window.addEventListener("resize", redrawCan);
//document.addEventListener("mousemove", (evt) => {
  //mouse = {x: evt.x, y: evt.y}
//})
document.addEventListener("click", (evt) => {
  boost = true;
})
