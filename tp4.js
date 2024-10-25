//video presentación --> https://youtu.be/8prLTKIPiv4?si=asxSeS6vpMHRO5CN

// Fondo
let fondoImg=[];
let colorLinea = [0, 0, 0];

// explosiones
let frameExplosion = 11;
let explosionImg=[];
let explosionActualImg = [];
let explosionActualFrame = [];
let explosionActualX = [];
let explosionActualY = [];

// Estadisticas iniciales de meteoritos
let meteoritosImg = [];
let meteoritosImgSinLlama = [];
let tamMeteoritoW = [130, 78, 60, 36, 73, 69, 67];
let tamMeteoritoH = [102, 54, 39, 28, 25, 18, 21];
let puntoMeteorito = [10, 2, 4, 8, 3, 5, 7];

//Estadisticas iniciales de aliens
let alienImg = [];
let tamAlienW = [57, 38, 37, 31];
let tamAlienH = [43, 18, 26, 16];
let puntoAlien = [1, 2, 2, 3];
let alienVel = [2, 2.2, 1.8, 2.5];
let alienActual = 0;

//Estadisticas iniciales de naves
let naveImg = [];
let tamNaveW = [40, 20];
let tamNaveH = [21, 13];
let naveVel = [3, 3.5];
let naveActual = 0;

let naveX = 140;
let naveY = 140;

let alienX;
let alienY;

let tiempoSiguienteMeteorito = 0;
let meteoritoIntervalo = 2000; // Intervalo en milisegundos (2 segundos)
let meteoritoX = [];
let meteoritoY = [];
let tamMeteoritoActualW = [];
let tamMeteoritoActualH = [];
let puntoMeteoritoActual = [];
let imgActual = [];
let frame = [];
let imgActualSinLlama = [];

let puntaje = 0;
let vida = 3;
let tamPantalla = 600;
let tiempoEscudo = 0;
let tiempoEscudoIntervalo = 3000;
let escudo = true;

let isGameOver = false; // Variable para controlar el estado del juego
let inicio = true;

// cargado de imagenes
function preload() {
  // carga fondos
  for (let i = 1; i <= 4; i++) {
    let imgPath = 'assets/extras/fondo' + i + '.png';
    fondoImg.push(loadImage(imgPath));
  }
  // carga explosion
  for (let i = 1; i <= 3; i++) {
    let imgPath = 'assets/explosion/explosion' + i + '.png';
    explosionImg.push(loadImage(imgPath));
  }

  //carga los meteoritos con llama
  for (let i = 1; i <= 7; i++) {
    let imgPath = 'assets/meteorito/meteorito' + i + '.png';
    meteoritosImg.push(loadImage(imgPath));
  }
  // carga los meteoritos sin llama
  for (let i = 1; i <= 7; i++) {
    let imgPath = 'assets/meteorito1/meteorito' + i + '.png';
    meteoritosImgSinLlama.push(loadImage(imgPath));
  }
  //carga los alien
  for (let i = 1; i<=4; i++) {
    let imgPath = 'assets/alien/alien' + i + '.png';
    alienImg.push(loadImage(imgPath));
  }
  //carga la nave
  for (let i = 1; i<=1; i++) {
    let imgPath = 'assets/naves/nave' + i + '.png';
    naveImg.push(loadImage(imgPath));
  }
}

function setup() {
  createCanvas(tamPantalla, tamPantalla);
  crearAlien();
  tiempoEscudo= millis();
}

function draw() {
  if (inicio) {
    background(0);
    image(fondoImg[2], 0, 0, width, height);
  } else {
    if (isGameOver) {
      background(0);
      image(fondoImg[3], 0, 0, width, height);
      strokeWeight(2);
      stroke(colorLinea)
        fill(255, 199, 0);
      textSize(40);
      text(puntaje, 380, 442);
      rect(400, 475, 120, 50);
      fill(0);
      textSize(25);
      text(`INICIO`, 425, 507);
      mouseBoton(400, 475, 120, 50);
      return; // Sale de la función draw para detener el dibujo
    } else {

      background(220); // Fondo normal
      image(fondoImg[0], 0, 0, width, height);
      fill(255);

      moverNave();
      moverAlien();

      // Verifica si es momento de dibujar un nuevo meteorito
      if (millis() - tiempoSiguienteMeteorito > meteoritoIntervalo) {
        crearMeteorito();
        tiempoSiguienteMeteorito = millis();
      }

      if (millis() - tiempoEscudo>tiempoEscudoIntervalo) {
        escudo=false;
      } else {
        escudo=true
      }

      juego();
      explosion();

      textSize(32);
      fill(0);
      image(fondoImg[1], 0, 0);
      text(vida, 200, 93);
      text(puntaje, 485, 93);
    }
  }
}

function mousePressed() {
  if (inicio) {
    reiniciarTodo();
  } else {
    if ((isGameOver) && mouse(400, 475, 120, 50)) {
      inicio=true;
    }
  }
}
