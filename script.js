// Get the canvas element
const canvas = document.querySelector('canvas');

// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the canvas context
const ctx = canvas.getContext('2d');

// Create an array to hold the lights
const lights = [];

// Create a Light class
class Light {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.alpha = 1;
		this.velocity = {
			x: Math.random() * 3 - 1.5,
			y: Math.random() * 3 - 1.5
		};
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = this.color;
		ctx.shadowColor = this.color;
		ctx.shadowBlur = 20;
		ctx.fill();
		ctx.restore();
	}

	update() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.alpha -= 0.01;
	}
}

// Create a function to animate the lights
function animate() {
	requestAnimationFrame(animate);

	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Update and draw the lights
	lights.forEach((light, index) => {
		light.update();
		light.draw();
		if (light.alpha <= 0) {
			lights.splice(index, 1);
		}
	});
}

// Add a click event listener to the canvas
canvas.addEventListener('click', (event) => {
	const x = event.clientX;
	const y = event.clientY;
	const radius = Math.random() * 50 + 10;
	const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

	lights.push(new Light(x, y, radius, color));
});

// Start the animation
animate();
