//botones "over"
function mouseBoton(posX, posY, tamX, tamY) {
  if (mouse(posX, posY, tamX, tamY)) {
    colorLinea=[152, 6, 6];
  } else {
    colorLinea=[0, 0, 0];
  }
}

//botones
function mouse(posX, posY, tamX, tamY) {
  if (mouseX>posX &&
    mouseX<posX + tamX &&
    mouseY>posY &&
    mouseY<posY+ tamY) {
    return true;
  } else {
    return false;
  }
}

//variables valor inicial "game over"
function reiniciarTodo() {
  explosionActualImg = [];
  explosionActualFrame = [];
  explosionActualX = [];
  explosionActualY = [];
  meteoritoX = [];
  meteoritoY = [];
  tamMeteoritoActualW = [];
  tamMeteoritoActualH = [];
  puntoMeteoritoActual = [];
  imgActual = [];
  frame = [];
  imgActualSinLlama = [];
  crearAlien();
  isGameOver=false;
  vida=3;
  puntaje=0;
  escudo = true;
  tiempoEscudo=millis();
  tiempoSiguienteMeteorito=millis();
  naveX=140;
  naveY=140;
  inicio=false;
}

function verificarColision(objX, objY, tamX, tamY, recX, recY, recTamX, recTamY) {
  if (
    objX + tamX-3 > recX &&
    objX < recX + recTamX &&
    objY + tamY-3 > recY &&
    objY < recY + recTamY
    ) {
    crearExplosion(objX+tamX/2, objY+tamY/2);
    return true;
  } else {
    return false;
  }
}

function crearExplosion(posX, posY) {
  explosionActualImg.push(0);
  explosionActualFrame.push(0);
  explosionActualX.push(posX);
  explosionActualY.push(posY);
}

function explosion() {
  for (let i=0; i<explosionActualImg.length; i++) {
    explosionActualFrame[i]+=1;
    image(explosionImg[explosionActualImg[i]], explosionActualX[i], explosionActualY[i], 79, 69);
    if ( (explosionActualFrame[i]>frameExplosion) && (explosionActualFrame[i]<frameExplosion*2)) {
      explosionActualImg[i]=1;
    } else if ( (explosionActualFrame[i]>=frameExplosion*2) && (explosionActualFrame[i]<frameExplosion*3)) {
      explosionActualImg[i]=2;
    } else if (explosionActualFrame[i]>=frameExplosion*3) {
      eliminarExplosion(i);
    }
  }
}

function eliminarExplosion(indice) {
  explosionActualImg.splice(indice, 1);
  explosionActualFrame.splice(indice, 1);
  explosionActualX.splice(indice, 1);
  explosionActualY.splice(indice, 1);
}

function eliminarMeteorito(indice) {
  meteoritoX.splice(indice, 1);
  meteoritoY.splice(indice, 1);
  tamMeteoritoActualW.splice(indice, 1);
  tamMeteoritoActualH.splice(indice, 1);
  puntoMeteoritoActual.splice(indice, 1);
  imgActual.splice(indice, 1);
  imgActualSinLlama.splice(indice, 1);
  frame.splice(indice, 1);
}

function direccionX(objUnoX, objDosX, objUnoY, objDosY) {
  let dx = objUnoX - objDosX;
  let dy = objUnoY - objDosY;
  let distancia = sqrt(dx * dx + dy * dy);
  return dx / distancia;
}

function direccionY(objUnoX, objDosX, objUnoY, objDosY) {
  let dx = objUnoX - objDosX;
  let dy = objUnoY - objDosY;
  let distancia = sqrt(dx * dx + dy * dy);
  return dy / distancia;
}

function comprobacionLimiteX(variable) {
  let limite=40
    let retorno;

  if (variable > (tamPantalla - limite)) {
    retorno = (tamPantalla - limite-2);
  } else if (variable < limite+2) {
    retorno = limite+2;
  } else {
    retorno = variable;
  }

  return retorno;
}

function comprobacionLimiteY(variable) {
  let limiteSuperior = 112;
  let limite=40
    let retorno;

  if (variable > (tamPantalla - limite)) {
    retorno = (tamPantalla - limite-2);
  } else if (variable < limiteSuperior+2) {
    retorno = limiteSuperior+2;
  } else {
    retorno = variable;
  }

  return retorno;
}

function moverNave() {
  naveX += direccionX(mouseX, naveX, mouseY, naveY) * naveVel[naveActual];
  naveY += direccionY(mouseX, naveX, mouseY, naveY) * naveVel[naveActual];
  naveX= comprobacionLimiteX( naveX );
  naveY= comprobacionLimiteY( naveY );
  image(naveImg[naveActual], naveX, naveY, tamNaveW[naveActual], tamNaveH[naveActual]);
  if (escudo) {
    stroke(255);
    noFill();
    ellipse( naveX+tamNaveW[naveActual]/2, naveY+tamNaveH[naveActual]/2, tamNaveW[naveActual]+5, tamNaveH[naveActual]+5 );
    noStroke();
  }
}

function moverAlien() {
  alienX += direccionX(naveX, alienX, naveY, alienY) * alienVel[alienActual];
  alienY += direccionY(naveX, alienX, naveY, alienY) * alienVel[alienActual];

  image(alienImg[alienActual], alienX, alienY, tamAlienW[alienActual], tamAlienH[alienActual]);
}

function crearAlien() {
  //si es mayor a 5 pos inicial alien "abajo", si no aparece "por arriba"
  let aleatorio = Math.floor(Math.random() * 11);
  if (aleatorio >= 5) {
    alienY = height;
  } else {
    alienY = 100;
  }
  alienX = random(40, width - 40);
  alienActual = floor(random(0, 4));
}

function crearMeteorito() {
  let indiceMeteorito = floor(random(0, 7));
  meteoritoX.push(width-5);
  meteoritoY.push(random(112, height - 60));
  imgActual.push(meteoritosImg[indiceMeteorito]);
  frame.push(0);
  imgActualSinLlama.push(meteoritosImgSinLlama[indiceMeteorito]);
  tamMeteoritoActualW.push(tamMeteoritoW[indiceMeteorito]);
  tamMeteoritoActualH.push(tamMeteoritoH[indiceMeteorito]);
  puntoMeteoritoActual.push(puntoMeteorito[indiceMeteorito]);
}

function juego() {
  // Dibuja y mueve los meteoritos, y verifica colisiones

  for (let i = meteoritoX.length - 1; i >= 0; i--) {
    frame[i]+=1;
    if (frame[i]<5) {
      image(imgActual[i], meteoritoX[i], meteoritoY[i], tamMeteoritoActualW[i], tamMeteoritoActualH[i]);
    } else {
      image(imgActualSinLlama[i], meteoritoX[i], meteoritoY[i], tamMeteoritoActualW[i], tamMeteoritoActualH[i]);
      frame[i] =0;
    }

    meteoritoX[i] -= 1;
    if (verificarColision(alienX, alienY, tamAlienW[alienActual], tamAlienH[alienActual], meteoritoX[i], meteoritoY[i], tamMeteoritoActualW[i], tamMeteoritoActualH[i])) {
      puntaje += Number(puntoMeteoritoActual[i])*Number(puntoAlien[alienActual]);
      eliminarMeteorito(i);
      crearAlien();
    }

//colisión
    if (verificarColision(naveX, naveY, tamNaveW[naveActual], tamNaveH[naveActual], meteoritoX[i], meteoritoY[i], tamMeteoritoActualW[i], tamMeteoritoActualH[i]) || (verificarColision(alienX, alienY, tamAlienW[alienActual], tamAlienH[alienActual], naveX, naveY, tamNaveW[naveActual], tamNaveH[naveActual]))) {
      if (!escudo) {
        vida-=1;
        if (vida<=0) {
          isGameOver=true;
        } else {
          tiempoEscudo=millis();
          escudo=true;
          naveX=140;
          naveY=140;
          eliminarMeteorito(i);
          crearAlien();
        }
      } else {
        eliminarMeteorito(i);
        crearAlien();
      }
    }
  }
}



/* 
push --> sumar dato/casillero al final del arreglo
pop --> eliminar dato/casillero al final del arreglo
floor --> calcular valor entero ("redondea")
sqrt --> función matematica (retorna raíz cuadrada)
splice --> "elimina" una posición/dato cargado especifico del array
*/
