var confettiParticles = [];
var canvas;
var context;

function startConfetti() {
    canvas = document.getElementById('confetti');
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createConfetti();
    drawConfetti();
}

function drawConfetti() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < confettiParticles.length; i++) {
        var particle = confettiParticles[i];
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.fill();

        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.y += Math.cos(particle.d) + 2;
        particle.x += Math.sin(particle.tilt) / 2;

        if (particle.x > canvas.width || particle.y > canvas.height) {
            confettiParticles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(drawConfetti);
}

function createConfetti() {
    for (var i = 0; i < 150; i++) {
        var particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            radius: Math.random() * 5 + 5,
            color: ["#FF6600", "#FFB13D", "#FFD700", "#FFFF00"][Math.floor(Math.random() * 4)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05,
            tiltAngle: 0,
            d: Math.random() * 10 + 5 // density of the confetti particle
        };
        confettiParticles.push(particle);
    }
}

window.onload = function() {
    startConfetti();
};