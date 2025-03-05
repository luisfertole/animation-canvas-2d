const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = 300;
const window_width = 300;

// El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
    this.counter = 0; // Contador de repeticiones
    this.isStopped = false; // Bandera para detener el círculo
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    
    // Si el texto es "Tec1", lo reemplazamos con el contador
    if (this.text === "Tec1") {
      context.fillText(this.counter, this.posX, this.posY);
    } else {
      context.fillText(this.text, this.posX, this.posY);
    }

    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Si el círculo ya está detenido, no hacer nada
    if (this.isStopped) {
      return;
    }

    // Si el círculo supera el margen derecho entonces se mueve a la izquierda
    if (this.posX + this.radius > window_width) {
      this.dx = -this.dx;
      this.counter++; // Incrementar el contador
    }

    // Si el círculo supera el margen izquierdo entonces se mueve a la derecha
    if (this.posX - this.radius < 0) {
      this.dx = -this.dx;
      this.counter++; // Incrementar el contador
    }

    // Si el círculo supera el margen superior entonces se mueve hacia abajo
    if (this.posY - this.radius < 0) {
      this.dy = -this.dy;
      this.counter++; // Incrementar el contador
    }

    // Si el círculo supera el margen inferior entonces se mueve hacia arriba
    if (this.posY + this.radius > window_height) {
      this.dy = -this.dy;
      this.counter++; // Incrementar el contador
    }

    // Si el contador llega a 15, detener el círculo
    if (this.counter >= 15) {
      this.isStopped = true; // Detener el círculo
      return;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Función para generar un círculo dentro de los límites del canvas
function generateCircleWithinBounds(radius, color, text, speed) {
  // Asegurar que el radio no sea mayor que la mitad del ancho o alto del canvas
  const maxRadius = Math.min(window_width, window_height) / 2;
  radius = Math.min(radius, maxRadius);

  // Generar coordenadas aleatorias dentro de los límites del canvas
  const posX = Math.random() * (window_width - 2 * radius) + radius;
  const posY = Math.random() * (window_height - 2 * radius) + radius;

  return new Circle(posX, posY, radius, color, text, speed);
}

// Generar círculos dentro de los límites del canvas
let miCirculo = generateCircleWithinBounds(50, "blue", "Tec1", 5);
let miCirculo2 = generateCircleWithinBounds(50, "red", "Tec2", 2);

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  
  // Actualizar ambos círculos
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

updateCircle();