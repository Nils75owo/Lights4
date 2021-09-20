var can = document.createElement("canvas");
var ctx = can.getContext("2d");
document.body.appendChild(can);
var speed = 30;
var particles = [];
var mouse = { x: 0, y: 0 };
var boost = false;
var boostA = 40;
var Particle = /** @class */ (function () {
    function Particle(x, y, oRadius, color) {
        var _this = this;
        if (oRadius === void 0) { oRadius = 10; }
        if (color === void 0) { color = 0; }
        this.x = null;
        this.y = null;
        this.vx = null;
        this.vy = null;
        this.oRadius = null;
        this.color = null;
        this.c = null;
        this.gravity = null;
        this.bounce = null;
        this.xFriction = null;
        this.update = function () {
            if (boost) {
                _this.vy += boostA;
                _this.vx += boostA / 4;
            }
            _this.x += _this.vx;
            _this.y += _this.vy;
            _this.vy += _this.gravity;
            if (_this.x + _this.oRadius > can.width || _this.x - _this.oRadius < 0) {
                _this.vx *= -1;
            } //rand
            if (_this.y + _this.oRadius > can.height) { //floor
                _this.y = can.height - _this.oRadius;
                _this.vy *= -_this.bounce;
                if (_this.vy < 0 && _this.vy > -2.1)
                    _this.vy = 0;
                if (Math.abs(_this.vx) < 1.1)
                    _this.vx = 0;
                if (_this.vx > 0)
                    _this.vx = _this.vx - _this.xFriction;
                if (_this.vx < 0)
                    _this.vx = _this.vx + _this.xFriction;
            }
            if ((_this.y + _this.oRadius) < 0)
                _this.vy = Math.abs(_this.vy);
            _this.draw();
        };
        this.draw = function () {
            ctx.beginPath();
            ctx.arc(_this.x, _this.y, _this.oRadius, 0, Math.PI * 2);
            ctx.fillStyle = "hsl(" + _this.color + ", 100%, 60%)";
            _this.color += 1;
            ctx.fill();
            ctx.closePath();
        };
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
    return Particle;
}());
var animate = function () {
    requestAnimationFrame(animate);
    //ctx.clearRect(0,0,can.width,can.height);
    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, can.width, can.height);
    particles.forEach(function (particle) {
        particle.update();
    });
    boost = false;
};
for (var i = 0; i < 20; i++) {
    particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 15, 0));
}
var redrawCan = function () {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    ctx.fillStyle = "rgba(0,0,0,255)";
    ctx.fillRect(0, 0, can.width, can.height);
};
redrawCan();
animate();
window.addEventListener("resize", redrawCan);
//document.addEventListener("mousemove", (evt) => {
//mouse = {x: evt.x, y: evt.y}
//})
document.addEventListener("click", function (evt) {
    boost = true;
});
