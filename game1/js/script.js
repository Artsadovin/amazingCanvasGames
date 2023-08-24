let canvas = document.getElementById("canvas");
let canvasWidth = 1800;
let canvasHeight = 900;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
let canvasContext = canvas.getContext("2d");
let res = 0;

let fontTovari = new FontFace('tovari', 'url(font/tovari-sans.otf)');

fontTovari.load().then(function(font) {
  console.log('font ready');
  document.fonts.add(font);
});

let background = new Image();
background.src = 'img/bg.jpg';
background.onload = function() {
  canvasContext.drawImage(background, 0, 0, canvasWidth, canvasHeight);
}

let backgroundWithOutInstruction = new Image();
backgroundWithOutInstruction.src = 'img/bgWithOutInstruction.png';
backgroundWithOutInstruction.onload = function() {
}

let candy = new Image();
candy.src = 'img/sweet.png';
candy.onload = function () {
  canvasContext.drawImage(candy, CANDY.x, CANDY.y, CANDY.size, CANDY.size);
}

let arrowUp = new Image();
arrowUp.src = 'img/up.png';
arrowUp.onload = function () {
  canvasContext.drawImage(arrowUp, ARROW_UP.x, ARROW_UP.y, ARROW_UP.sizeX, ARROW_UP.sizeY);
}

let arrowDown = new Image();
arrowDown.src = 'img/down.png';
arrowDown.onload = function () {
  canvasContext.drawImage(arrowDown, ARROW_DOWN.x, ARROW_DOWN.y, ARROW_DOWN.sizeX, ARROW_DOWN.sizeY);
}

let ALL_WORDS = {
  wordsCrack:  ['р_збирать', 'р_звес', 'р_зыгрышный', 'р_здать', 'р_зберём', 'р_зведка'],
  wordsO:  ['розбирать', 'розвес', 'розыгрышный', 'роздать', 'розберём', 'розведка '],
  wordsA: ['разбирать', 'развес', 'разыгрышный', 'раздать', 'разберём', 'разведка '],
  wordsCorrect: ['разбирать', 'развес', 'розыгрышный', 'раздать', 'разберём', 'разведка'],
  wordNum: 0,
  x: 397,
  y: 520,
  startX: 397,
  startY: 520,
}



const mouse = {
  x: 0,
  y: 0,
  over: false,
};

let CANDY = {
  x: 400,
  y: 427,
  startX: 400,
  startY: 427,
  sizeX: 75,
  sizeY: 75,
  candyMoving: false,
  direction: 0,
  speedUp: 3,
  speedDown: -3,
  bottomMargin: 17,
  model: candy,
}

let ARROW_UP = {
  x: 550,
  y: 430,
  sizeX: 70,
  sizeY: 90,
  model: arrowUp,
}

let ARROW_DOWN = {
  x: 630,
  y: 432,
  sizeX: 70,
  sizeY: 90,
  model: arrowDown,
}

let BACKGROUND = {
  x: 0,
  y: 0,
  sizeX: canvasWidth,
  sizeY: canvasHeight,
  model: background,
}

let GAME = {
  isGame: true,
}

function mouseEnterHandler(event){
  mouse.over = true;
}

function mouseLeaveHandler(event){
  mouse.over = false;
}

function mouseDownHandler(event){
  if(mouse.x >= 550 && mouse.x <= 620 && mouse.y >= 430 && mouse.y <= 520 && !CANDY.candyMoving){
    isUpCorrect();
    CANDY.candyMoving = true;
    CANDY.direction = 2;
  } else if(mouse.x >= 630 && mouse.x <= 700 && mouse.y >= 432 && mouse.y <= 522 && !CANDY.candyMoving){
    isDownCorrect();
    CANDY.candyMoving = true;
    CANDY.direction = 1;
  }
}

function mouseMoveHandler(event){
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;

}

function isUpCorrect(){
  let wordWithoutSpace = ALL_WORDS.wordsCrack[ALL_WORDS.wordNum][ALL_WORDS.wordsCrack[ALL_WORDS.wordNum].indexOf('_')] = 'о';
  if(wordWithoutSpace === ALL_WORDS.wordsCorrect[ALL_WORDS.wordNum] && ALL_WORDS.wordNum < 6){
    res++;
  } else if(ALL_WORDS.wordNum >= 5){
    setTimeout(function (){GAME.isGame = false;}, 300);
  }
}

function isDownCorrect(){
  if(ALL_WORDS.wordsA[ALL_WORDS.wordNum] === ALL_WORDS.wordsCorrect[ALL_WORDS.wordNum] && ALL_WORDS.wordNum < 6){
    res++;
  } else if(ALL_WORDS.wordNum >= 5){
    setTimeout(function (){GAME.isGame = false;}, 300);
  }
}


//экран с объяснением
function loseScreen(){
  canvasContext.drawImage(backgroundWithOutInstruction, 0, 0, canvasWidth, canvasHeight);
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.4)";
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
  canvasContext.fillStyle = "black";
  canvasContext.font = '50px tovari';
  canvasContext.fillText(`Игра окончена! Результат: ${res}/6`, 600, 450);
}

function initEventListeners(){
  canvas.addEventListener('mousedown', mouseDownHandler);
  canvas.addEventListener('mouseenter', mouseEnterHandler);
  canvas.addEventListener('mouseleave', mouseLeaveHandler);
  canvas.addEventListener('mousemove', mouseMoveHandler);
}

function draw(obj){
  canvasContext.drawImage(obj.model, obj.x, obj.y, obj.sizeX, obj.sizeY)
}

function drawContent(){
  canvasContext.fillStyle = "white";
  canvasContext.font = '36px tovari';
  canvasContext.fillText('о', ARROW_UP.x + 27, 480);
  canvasContext.fillText('а', ARROW_DOWN.x + 27, 480);
  canvasContext.fillStyle = "black";
  canvasContext.font = '48px tovari';
  canvasContext.fillText(res + '/6', 800, 450);
  canvasContext.font = '20px tovari';
  canvasContext.fillText(ALL_WORDS.wordsCrack[ALL_WORDS.wordNum], ALL_WORDS.x, ALL_WORDS.y);
}

function drawFrame(){
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  draw(BACKGROUND);
  draw(CANDY);
  draw(ARROW_UP);
  draw(ARROW_DOWN);
  drawContent();
}

function update(){
  if(CANDY.direction === 1){
    ALL_WORDS.wordsCrack[ALL_WORDS.wordNum] = ALL_WORDS.wordsA[ALL_WORDS.wordNum];
    CANDY.y += CANDY.speedUp;
    ALL_WORDS.y = CANDY.y + CANDY.sizeY + CANDY.bottomMargin;
  } else if(CANDY.direction === 2){
    ALL_WORDS.wordsCrack[ALL_WORDS.wordNum] = ALL_WORDS.wordsO[ALL_WORDS.wordNum];
    CANDY.y += CANDY.speedDown;
    ALL_WORDS.y = CANDY.y + CANDY.sizeY + CANDY.bottomMargin;
  }
  isCandyAbort();
}

function isCandyAbort(){
  if(CANDY.y < 15 || CANDY.y > canvasHeight - CANDY.sizeX - 40){
    CANDY.candyMoving = false;
    ALL_WORDS.wordNum++;
    removeObject();
  }
}

function removeObject(){
  CANDY.y = CANDY.startY;
  ALL_WORDS.y = ALL_WORDS.startY;
}

function play(){
  if(GAME.isGame){
    drawFrame();
    if(CANDY.candyMoving) {
      update();
    }
    requestAnimationFrame(play);
  } else{
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    loseScreen();
  }
}

initEventListeners();
play();




