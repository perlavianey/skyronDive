var canvas1 = document.getElementById('canvas1');
var ctx1 = canvas1.getContext('2d');

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

//VARIABLES GLOBALES
var interval;
var frames = 0;
var images = {
    fondo:'./images/fondo.png',
    man:'./images/man.png',
    calceta:'./images/sock.png',
    flor:'./images/flower.png',
    chinicuil:'./images/chinicuil.png',
    nopal:'./images/nopal.png',
    ave:'./images/bird.png',
    avion:'',
}
var audios = {
    game:'./audio/gameMusic.mp3',
    goodCrash:'./audio/take.mp3',
    badCrash:'./audio/wah.mp3'
}
var calcetas1=[];
var calcetas2=[];
var flores1=[];
var flores2=[];
var chinicuiles1=[];
var chinicuiles2=[];
var nopales1=[];
var nopales2=[];
var aves1=[];
var aves2=[];
var puntaje1=0;
var puntaje2=0;

var audioFondo = new Audio() //Audio de fondo

//CLASES
class Board1{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas1.width
        this.height = canvas1.height
        this.image = new Image()
        this.image.src = images.fondo
        this.image.onload = () => {
            this.draw()
        }
    }
    draw(){
        this.y-=1.5
        if(this.y < -canvas1.height) this.y=0
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx1.drawImage(this.image,this.x, this.y + this.height,this.width,this.height)
        ctx1.font = '20px VT323'
        ctx1.fillStyle='black'
        ctx1.fillText('Score: '+ puntaje1,400,25)
    }
}

class Board2{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas1.width
        this.height = canvas1.height
        this.image = new Image()
        this.image.src = images.fondo
        this.image.onload = () => {
            this.draw()
        }
    }
    draw(){
        this.y-=1.5
        if(this.y < -canvas2.height) this.y=0
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx2.drawImage(this.image,this.x, this.y + this.height,this.width,this.height)
        ctx2.font = '20px VT323'
        ctx2.fillStyle='black'
        ctx2.fillText('Score: '+puntaje2,400,25)
    }
}

class Man1{
    constructor(x,y){
        this.x = 250
        this.y = 100
        this.width = 50
        this.height = 70
        this.image = new Image()
        this.image.src = images.man
        this.image.onload = () => {
            this.draw()
        }
    }
    draw(){
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    crashWith(objeto,es){
        var crash = (this.y + this.height > objeto.y) &&
                    (this.y < objeto.y + objeto.height) &&
                    (this.x < objeto.x + objeto.width) && 
                    (this.x + this.width > objeto.x);
        if (crash) {
            if(es == 'flor'|| es == 'calcetin'|| es == 'chinicuil'){
                var audio = new Audio()
                audio.src = audios.goodCrash
                audio.play()
            }
            else{
                var audio = new Audio()
                audio.src = audios.badCrash
                audio.play()
            }
            return true;
        }
        else {
          return false;  
        }
    }
}

class Man2{
    constructor(x,y){
        this.x = 250
        this.y = 100
        this.width = 50
        this.height = 70
        this.image = new Image()
        this.image.src = images.man
        this.image.onload = () => {
            this.draw()
        }
    }
    draw(){
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    crashWith(objeto,es){
        var crash2 = (this.y + this.height > objeto.y) &&
                    (this.y < objeto.y + objeto.height) &&
                    (this.x < objeto.x + objeto.width) && 
                    (this.x + this.width > objeto.x);
        if (crash2) {
            if(es == 'flor'|| es == 'calcetin'|| es == 'chinicuil'){
                var audio = new Audio()
                audio.src = audios.goodCrash
                audio.play()
            }
            else{
                var audio = new Audio()
                audio.src = audios.badCrash
                audio.play()
            }
            return true;
        }
        else {
          return false;  
        }
    }
}

class Sock1{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 25
        this.height = 35
        this.image = new Image()
        this.image.src = images.calceta
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Sock2{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 25
        this.height = 35
        this.image = new Image()
        this.image.src = images.calceta
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Flower1{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 25
        this.height = 25
        this.image = new Image()
        this.image.src = images.flor
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Flower2{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 25
        this.height = 25
        this.image = new Image()
        this.image.src = images.flor
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Chin1{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 25
        this.height = 25
        this.image = new Image()
        this.image.src = images.chinicuil
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Chin2{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 25
        this.height = 25
        this.image = new Image()
        this.image.src = images.chinicuil
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Nopal1{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 35
        this.height = 35
        this.image = new Image()
        this.image.src = images.nopal
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Nopal2{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 35
        this.height = 35
        this.image = new Image()
        this.image.src = images.nopal
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Bird1{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 35
        this.height = 35
        this.image = new Image()
        this.image.src = images.ave
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Bird2{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 35
        this.height = 35
        this.image = new Image()
        this.image.src = images.ave
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.y-=2;
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

//INSTANCIAS
var tablero1 = new Board1()
var tablero2 = new Board2()
var man1 = new Man1()
var man2 = new Man2()

 //FUNCIONES PRINCIPALES
 function update(){
    timer()
    frames++
    ctx1.clearRect(0,0,canvas1.width,canvas1.height)
    ctx2.clearRect(0,0,canvas2.width,canvas2.height)
    tablero1.draw()
    tablero2.draw()
    man1.draw()
    man2.draw()
    
    generateSocks1()
    generateSocks2()
    drawSocks1()
    drawSocks2()
    if(checkSocks1()) ctx1.fillText('Score: ' + puntaje1,400,25)
    if(checkSocks2()) ctx2.fillText('Score: ' + puntaje2,400,25)
    
    generateFlowers1()
    generateFlowers2()
    drawFlowers1()
    drawFlowers2()
    if(checkFlowers1()) ctx1.fillText('Score: ' + puntaje1,400,25)
    if(checkFlowers2()) ctx2.fillText('Score: ' + puntaje2,400,25)

    generateChins1()
    generateChins2()
    drawChins1()
    drawChins2()
    if(checkChins1()) ctx1.fillText('Score: ' + puntaje1,400,25)
    if(checkChins2()) ctx2.fillText('Score: ' + puntaje2,400,25)

    generateNopales1()
    generateNopales2()
    drawNopales1()
    drawNopales2()
    if(checkNopales1()) ctx1.fillText('Score: ' + puntaje1,400,25)
    if(checkNopales2()) ctx2.fillText('Score: ' + puntaje2,400,25)


    generateAves1()
    generateAves2()
    drawAves1()
    drawAves2()
    if(checkAves1()) ctx1.fillText('Score: ' + puntaje1,400,25)
    if(checkAves2()) ctx2.fillText('Score: ' + puntaje2,400,25)

    if (timer() === 60){
        gameOver()
        document.getElementById('winner').innerHTML = getWinner()
    }

}

function start(){
    if(interval)return

    frames = 0
    interval = setInterval(update,1000/60)
    calcetas1=[];
    calcetas2=[];
    flores1=[];
    flores2=[];
    chinicuiles1=[];
    chinicuiles2=[];
    nopales1=[];
    nopales2=[];
    puntaje1=0;
    puntaje2=0;
}

//CALCETINES
function generateSocks1(){
    var tSock1 = Math.floor(Math.random() * 625)
    if (frames % tSock1 === 0){
        var equis = Math.floor(Math.random() * 450)
        var sock1 = new Sock1(equis)
        calcetas1.push(sock1)
    }
}

function generateSocks2(){
    var tSock2 = Math.floor(Math.random() * 625)
    if (frames % tSock2 === 0){
        var equis = Math.floor(Math.random() * 450)
        var sock2 = new Sock2(equis)
        calcetas2.push(sock2)
    }
}

function drawSocks1(equis){
    calcetas1.forEach(function(calceta){
        calceta.draw()
    })
}

function drawSocks2(equis){
    calcetas2.forEach(function(calceta){
        calceta.draw()
    })
}

function checkSocks1(){
    calcetas1.forEach(function(c1){
        if(man1.crashWith(c1,'calcetin') === true){
            var pos = calcetas1.indexOf(c1);
            calcetas1.splice(pos, 1);
            puntaje1 = puntaje1 + 2;
        }
    }) 
}

function checkSocks2(){
    calcetas2.forEach(function(c2){
        if(man2.crashWith(c2,'calcetin') === true){
            var pos = calcetas2.indexOf(c2);
            calcetas2.splice(pos, 1);
            puntaje2 = puntaje2 + 2;
        }
    }) 
}

//FLORES
function generateFlowers1(){
    if (frames % 200 === 0){
        var equis = Math.floor(Math.random() * 450)
        var flower1 = new Flower1(equis)
        flores1.push(flower1)
    }
}

function generateFlowers2(){
    if (frames % 200 === 0){
        var equis = Math.floor(Math.random() * 450)
        var flower2 = new Flower2(equis)
        flores2.push(flower2)
    }
}

function drawFlowers1(equis){
    flores1.forEach(function(flor){
        flor.draw()
    })
}

function drawFlowers2(equis){
    flores2.forEach(function(flor){
        flor.draw()
    })
}

function checkFlowers1(){
    flores1.forEach(function(c1){
        if(man1.crashWith(c1,'flor') === true){
            var pos = flores1.indexOf(c1);
            flores1.splice(pos, 1);
            puntaje1 = puntaje1 + 1;
        }
    }) 
}

function checkFlowers2(){
    flores2.forEach(function(c2){
        if(man2.crashWith(c2,'flor') === true){
            var pos = flores2.indexOf(c2);
            flores2.splice(pos, 1);
            puntaje2 = puntaje2 + 1;
        }
    }) 
}

//CHINICUILES
function generateChins1(){
    if (frames % 500 === 0){
        var equis = Math.floor(Math.random() * 450)
        var chinicuil1 = new Chin1(equis)
        chinicuiles1.push(chinicuil1)
    }
}

function generateChins2(){
    if (frames % 500 === 0){
        var equis = Math.floor(Math.random() * 450)
        var chinicuil2 = new Chin2(equis)
        chinicuiles2.push(chinicuil2)
    }
}

function drawChins1(equis){
    chinicuiles1.forEach(function(chinicuil){
        chinicuil.draw()
    })
}

function drawChins2(equis){
    chinicuiles2.forEach(function(chinicuil){
        chinicuil.draw()
    })
}

function checkChins1(){
    chinicuiles1.forEach(function(c1){
        if(man1.crashWith(c1,'chinicuil') === true){
            var pos = chinicuiles1.indexOf(c1);
            chinicuiles1.splice(pos, 1);
            puntaje1 = puntaje1 + 10;
        }
    }) 
}

function checkChins2(){
    chinicuiles2.forEach(function(c2){
        if(man2.crashWith(c2,'chinicuil') === true){
            var pos = chinicuiles2.indexOf(c2);
            chinicuiles2.splice(pos, 1);
            puntaje2 = puntaje2 + 10;
        }
    }) 
}

//NOPALES
function generateNopales1(){
    if (frames % 150 === 0){
        var equis = Math.floor(Math.random() * 450)
        var nop1 = new Nopal1(equis)
        nopales1.push(nop1)
    }
}

function generateNopales2(){
    if (frames % 150 === 0){
        var equis = Math.floor(Math.random() * 450)
        var nop2 = new Nopal2(equis)
        nopales2.push(nop2)
    }
}

function drawNopales1(equis){
    nopales1.forEach(function(nopalito){
        nopalito.draw()
    })
}

function drawNopales2(equis){
    nopales2.forEach(function(nopalito){
        nopalito.draw()
    })
}

function checkNopales1(){
    nopales1.forEach(function(c1){
        if(man1.crashWith(c1,'nopal') === true){
            var pos = nopales1.indexOf(c1);
            nopales1.splice(pos, 1);
            puntaje1 = puntaje1 - 3;
        }
    }) 
}

function checkNopales2(){
    nopales2.forEach(function(c2){
        if(man2.crashWith(c2,'nopal') === true){
            var pos = nopales2.indexOf(c2);
            nopales2.splice(pos, 1);
            puntaje2 = puntaje2 -3;
        }
    }) 
}

//AVES
function generateAves1(){
    if (frames % 120 === 0){
        var equis = Math.floor(Math.random() * 450)
        var ave1 = new Bird1(equis)
        nopales1.push(ave1)
    }
}

function generateAves2(){
    if (frames % 120 === 0){
        var equis = Math.floor(Math.random() * 450)
        var ave2 = new Bird2(equis)
        aves2.push(ave2)
    }
}

function drawAves1(equis){
    aves1.forEach(function(ave){
        ave.draw()
    })
}

function drawAves2(equis){
    aves2.forEach(function(ave){
        ave.draw()
    })
}

function checkAves1(){
    aves1.forEach(function(c1){
        if(man1.crashWith(c1,'ave') === true){
            var pos = aves1.indexOf(c1);
            aves1.splice(pos, 1);
            puntaje1 = puntaje1 - 5;
        }
    }) 
}

function checkAves2(){
    aves2.forEach(function(c2){
        if(man2.crashWith(c2,'ave') === true){
            var pos = aves2.indexOf(c2);
            aves2.splice(pos, 1);
            puntaje2 = puntaje2 -5;
        }
    }) 
}

function timer(){
    var tiempo = Math.floor(frames/60)
    document.getElementById('timer').innerHTML = tiempo;
    return tiempo
}

function gameOver(){
    audioFondo.pause()   
    clearInterval(interval) 
    document.getElementById('over').innerHTML = 'Game Over'
    document.getElementById('enter').innerHTML = 'Press Enter to start'
    interval = null
}

function getWinner(){
    var winner;
    if(puntaje1 > puntaje2){
        return 'Player 1 won'
    }
    else if(puntaje2 > puntaje1){
        return 'Player2 won'
    }
    else{
        return "It's a tie"
    }
}

//FUNCIONES AUXILIARES

//OBSERVADORES
window.onload = function() {
    tablero1.draw();
    tablero2.draw();
}

addEventListener('keydown',function(e){ //recibe un evento (e)
    if(e.keyCode===13){ 
        audioFondo.defaultPlaybackRate = 1.2;
        audioFondo.src = audios.game
        audioFondo.play()
        document.getElementById('over').innerHTML = ' '
        document.getElementById('enter').innerHTML = ' '
        document.getElementById('winner').innerHTML = ' '
        start()
    }
    
    if(e.keyCode===65 && man1.x > 10){
        man1.x -=25;
    }
    if(e.keyCode===68 && man1.x < 450){
        man1.x +=25;
    }
    if(e.keyCode===37 && man2.x > 10){
        man2.x -=25;
    }
    if(e.keyCode===39 && man2.x < 450){
        man2.x +=25;
    }
})