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
    chinicuil1:'./images/chinicuil1.png',
    chinicuil2:'./images/chinicuil2.png',
    nopal:'./images/nopal.png',
    ave1:'./images/bird.png',
    ave2:'./images/bird2.png',
    avion:'./images/plane.png',
    trophy:'./images/trophy.png'
}
var audios = {
    game:'./audio/gameMusic.mp3',
    goodCrash:'./audio/take.mp3',
    badCrash:'./audio/wah.mp3',
    planeCrash:'./audio/planeCrash.mp3',
    end:'./audio/end.mp3',
    ave:'./audio/ave.mp3'
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
var aviones1=[];
var aviones2=[];
var puntaje1=0;
var puntaje2=0;

var audioFondo = new Audio() //Audio de fondo
var audioFin = new Audio()

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
        this.win = new Image ()
        this.win.src = images.trophy
    }
    draw(){
        this.y-=1.5
        if(this.y < -canvas1.height) this.y=0
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx1.drawImage(this.image,this.x, this.y + this.height,this.width,this.height)
        ctx1.font = '30px VT323'
        ctx1.fillStyle='black'
        ctx1.fillText('Score: '+ puntaje1,375,25)
        ctx1.font = '30px VT323'
        ctx1.fillStyle='black'
        if(timer() < 11){
            ctx1.font = '30px VT323'
            ctx1.fillStyle = 'rgb(209, 19, 19)'
        }
        ctx1.fillText('Time: '+ timer(),385,55)
    }

    drawWinner(){
        ctx1.drawImage(this.win,85,60,330,500)
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
        this.win = new Image ()
        this.win.src = images.trophy
    }
    draw(){
        this.y-=1.5
        if(this.y < -canvas2.height) this.y=0
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx2.drawImage(this.image,this.x, this.y + this.height,this.width,this.height)
        ctx2.font = '30px VT323'
        ctx2.fillStyle='black'
        ctx2.fillText('Score: '+ puntaje2,375,25)
        ctx2.font = '30px VT323'
        ctx2.fillStyle='black'
        if(timer() < 11){
            ctx2.font = '30px VT323'
            ctx2.fillStyle = 'rgb(209, 19, 19)'
        }
        ctx2.fillText('Time: '+ timer(),385,55)
    }
    drawWinner(){
        ctx2.drawImage(this.win,85,60,330,500)
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
            else if(es === 'avion'){
                var audio = new Audio()
                audio.src = audios.planeCrash
                audio.play()
            }
            else if(es === 'ave'){
                var audio = new Audio()
                audio.src = audios.ave
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
            else if(es === 'avion'){
                var audio = new Audio()
                audio.src = audios.planeCrash
                audio.play()
            }
            else if(es === 'ave'){
                var audio = new Audio()
                audio.src = audios.ave
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
        this.image1 = new Image()
        this.image1.src = images.chinicuil1
        this.image2 = new Image()
        this.image2.src = images.chinicuil2
        this.theImage = this.image1

    }

    draw(){
        if (frames % 12 === 0) {
            if (this.theImage === this.image1) this.theImage = this.image2
            else this.theImage = this.image1;
        }
        this.y-=2;
        this.x-=0.2;
        ctx1.drawImage(this.theImage,this.x,this.y,this.width,this.height)
    }
}

class Chin2{
    constructor(x){
        this.x = x
        this.y = 650
        this.width = 25
        this.height = 25
        this.image1 = new Image()
        this.image1.src = images.chinicuil1
        this.image2 = new Image()
        this.image2.src = images.chinicuil2
        this.theImage = this.image1

    }

    draw(){
        if (frames % 12 === 0) {
            if (this.theImage === this.image1) this.theImage = this.image2
            else this.theImage = this.image1;
        }
        this.y-=2;
        this.x-=0.2;
        ctx2.drawImage(this.theImage,this.x,this.y,this.width,this.height)
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
    constructor(y){
        this.x = 0
        this.y = y
        this.width = 35
        this.height = 35
        this.image1 = new Image()
        this.image1.src = images.ave1
        this.image2 = new Image()
        this.image2.src = images.ave2
        this.theImage = this.image1
    }
    draw(){
        if (frames % 8 === 0) {
            if (this.theImage === this.image1) this.theImage = this.image2
            else this.theImage = this.image1;
        }
        this.x+=2;
        ctx1.drawImage(this.theImage,this.x,this.y,this.width,this.height)
    }
}

class Bird2{
    constructor(y){
        this.x = 0
        this.y = y
        this.width = 35
        this.height = 35
        this.image1 = new Image()
        this.image1.src = images.ave1
        this.image2 = new Image()
        this.image2.src = images.ave2
        this.theImage = this.image1
    }
    draw(){
        if (frames % 8 === 0) {
            if (this.theImage === this.image1) this.theImage = this.image2
            else this.theImage = this.image1;
        }
        this.x+=2;
        ctx2.drawImage(this.theImage,this.x,this.y,this.width,this.height)
    }
}

class Plane1{
    constructor(y){
        this.x = 650
        this.y = y
        this.width = 45
        this.height = 30
        this.image = new Image()
        this.image.src = images.avion
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.x-=4;
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Plane2{
    constructor(y){
        this.x = 650
        this.y = y
        this.width = 35
        this.height = 25
        this.image = new Image()
        this.image.src = images.avion
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.x-=4;
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
    checkSocks1()
    checkSocks2()
    //if(checkSocks1()) ctx1.fillText('Score: ' + puntaje1,400,25)
    //if(checkSocks2()) ctx2.fillText('Score: ' + puntaje2,400,25)
    
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

    generateAviones1()
    generateAviones2()
    drawAviones1()
    drawAviones2()
    
    if(checkAviones1()) ctx1.fillText('Score: ' + puntaje1,400,25)
    if(checkAviones2()) ctx2.fillText('Score: ' + puntaje2,400,25)

    if (timer() === 10){
        audioFondo.playbackRate = 1.8;
    }

    if (timer() === 50){
        audioFin.defaultPlaybackRate = 2;
        audioFin.src = audios.end
        audioFin.play()
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
    aves1=[];
    aves2=[];
    aviones1=[];
    aviones2=[];
    puntaje1=0;
    puntaje2=0;

    man1.x = 250
    man1.y = 100
    man2.x = 250
    man2.y = 100
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
        aves1.push(ave1)
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

//AVIONES
function generateAviones1(){
    if (frames % 700 === 0){
        var equis = Math.floor(Math.random() * 450)
        var avion1 = new Plane1(equis)
        aviones1.push(avion1)
    }
}

function generateAviones2(){
    if (frames % 700 === 0){
        var equis = Math.floor(Math.random() * 450)
        var avion2 = new Plane2(equis)
        aviones2.push(avion2)
    }
}

function drawAviones1(equis){
    aviones1.forEach(function(avion){
        avion.draw()
    })
}

function drawAviones2(equis){
    aviones2.forEach(function(avion){
        avion.draw()
    })
}

function checkAviones1(){
    aviones1.forEach(function(c1){
        if(man1.crashWith(c1,'avion') === true){
            var pos = aviones1.indexOf(c1);
            aviones1.splice(pos, 1);
            puntaje1 = puntaje1 - 20;
        }
    }) 
}

function checkAviones2(){
    aviones2.forEach(function(c2){
        if(man2.crashWith(c2,'avion') === true){
            var pos = aviones2.indexOf(c2);
            aviones2.splice(pos, 1);
            puntaje2 = puntaje2 - 20;
        }
    }) 
}

function timer(){
    var tiempo = Math.floor(frames/60)
    return 60-tiempo
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
        tablero1.drawWinner()
        return 'Player 1 won'
    }
    else if(puntaje2 > puntaje1){
        tablero2.drawWinner()
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
    document.getElementById('enter').innerHTML = 'Press Enter to start'
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
    
    //Controles para el jugador 1
    if(e.keyCode===65 && man1.x > 10){
        man1.x -=25;
    }
    if(e.keyCode===68 && man1.x < 450){
        man1.x +=25;
    }
    if(e.keyCode===87 && man1.y > 10){
        man1.y -=25;
    }
    if(e.keyCode===83 && man1.y < 450){
        man1.y +=25;
    }

    //Controles para el jugador 2
    if(e.keyCode===37 && man2.x > 10){
        man2.x -=25;
    }
    if(e.keyCode===39 && man2.x < 450){
        man2.x +=25;
    }
    if(e.keyCode===38 && man2.y > 10){
        man2.y -=25;
    }
    if(e.keyCode===40 && man2.y < 450){
        man2.y +=25;
    }
})