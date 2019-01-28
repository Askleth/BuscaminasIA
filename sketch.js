var cuad;
var nxn = 50
var rows = nxn;
var cols = nxn;
var scl;
var minas = 400;
var minasSiempre = minas
var gameState = false;
var privilegios = true;

var paco;
var pepe;
var pancho;
var paco1;
var pepe2;

//function preload() {
  //Block = loadImage('imagenes/Block.png');
	//Flag  = loadImage('imagenes/Flag.png');
	//FlagN = loadImage('imagenes/Flag1.png');
	//Bomb  = loadImage('imagenes/bomb.png');
	//BombW = loadImage('imagenes/bomb_win.png');
	//Blank = loadImage('imagenes/revelado.png');
	//Uno   = loadImage('imagenes/uno.png');
	//Dos   = loadImage('imagenes/dos.png');
	//Tres  = loadImage('imagenes/tres.png');
	//Cuatro= loadImage('imagenes/cuatro.png');
	//Cinco = loadImage('imagenes/cinco.png');
	//Seis  = loadImage('imagenes/seis.png');
	//Siete = loadImage('imagenes/siete.png');
	//Ocho  = loadImage('imagenes/ocho.png');
  //poiner= loadImage('imagenes/pointer.png');
  //poiner2= loadImage('imagenes/pointer.png.png');

//}


function setup() {
	createCanvas(windowWidth, windowHeight);
  privilegios = true;
	minas = minasSiempre
	scl = windowHeight/nxn;
	textAlign(CENTER,CENTER);
	textSize(50);
	cuad = make2dArray(rows,cols)
	landfield();
	if(minas > cols*rows) {
		minas = cols*rows;
	}
	while (minas > 0) {
		placeBombs();
	}

	for(let i = 0; i < rows; i++) {
		for(let j = 0; j < cols; j++) {
			cuad[i][j].searchNeighbors();
		}
	}


  paco = new Player(true);
  pepe = new Player();
  pancho = new Player();
  paco1 = new Player(true);
  pepe2 = new Player();
}

function draw() {
	background(0);
	for(let i = 0; i < rows; i++) {
		for(let j = 0; j < cols; j++) {
			cuad[i][j].show();
			isGameOver(cuad[i][j])
		}
	}

    if(gameState) {
    gameState = false;
    setup();
  }

	// if (gameState == true) {
	// 	for(let i = 0; i < rows; i++) {
	// 		for(let j = 0; j < cols; j++) {
	// 			if(cuad[i][j].mine == true) {
	// 				cuad[i][j].unhide();
	// 			}
	// 		}
	// 	}
  //  privilegios = false;
	// }
  paco.guess();
  // pepe.guess();
  // pancho.guess();
  // paco1.guess();
  // pepe2.guess();
  if (flagCounter() == minasSiempre) {
    textSize(50);
    stroke(100,20,255);
    text("Ganaste",width/2,height/2);
  }


}

function landfield() {
	for(let i = 0; i < rows; i++) {
		for(let j = 0; j < cols; j++) {
			cuad[i][j] = new cuadro (i,j,false);
		}
	}
}

function placeBombs() {

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let ran = Math.seededRandom();
			if (cuad[i][j].mine == false) {
				if (ran < 1/nxn/10) {
					cuad[i][j].mine = true;
					minas -= 1;
				}
			}
			if (minas == 0) {
				break;
			}
		}
	}
}

function make2dArray(rows,cols) {
	let arr = new Array(rows)
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(cols)
	}
	return arr;
}

function mouseReleased() {
	for(let i = 0; i < rows; i++) {
		for(let j = 0; j < cols; j++) {
			if (mouseX > cuad[i][j].pos.x && mouseX < cuad[i][j].pos.x+scl && mouseY > cuad[i][j].pos.y && mouseY < cuad[i][j].pos.y+scl) {
				if (mouseButton == CENTER) {
					cuad[i][j].signalSwitch()
				}
        if (mouseButton == LEFT) {
          cuad[i][j].unhide();
          cuad[i][j].chain();
        }


			}
		}
	}

}


function isGameOver(block) {
	if(block.hidden == false && block.mine == true) {
		gameState = true;
	}
}

function flagCounter() {
  let totalFlags = 0;
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if (cuad[i][j].signaled == true) {
        totalFlags += 1
      }
    }
  }
  return totalFlags;
}

// the initial seed
Math.seed = 3;

// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function(max, min) {
  max = max || 1;
  min = min || 0;

  Math.seed = (Math.seed * 9301 + 49297) % 233280;
  var rnd = Math.seed / 233280;

  return min + rnd * (max - min);
}
