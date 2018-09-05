var canvas1 = document.getElementById('canvasUnico');
var ctx1 = canvas1.getContext('2d');


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
    avion:'./images/plane.png'
}
var audios = {
    game:'./audio/gameMusic.mp3',
    goodCrash:'./audio/take.mp3',
    badCrash:'./audio/wah.mp3',
    planeCrash:'./audio/planeCrash.mp3',
    end:'./audio/end.mp3',
    ave:'./audio/ave.mp3',
    avion:'./audio/avion.mp3'
}

var calcetas1=[];
var flores1=[];
var chinicuiles1=[];
var nopales1=[];
var aves1=[];
var aviones1=[];
var puntaje1=0;


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
    }
    draw(){
        this.y-=1.5
        if(this.y < -canvas1.height) this.y=0
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx1.drawImage(this.image,this.x, this.y + this.height,this.width,this.height)
        ctx1.font = '30px VT323'
        ctx1.fillStyle='black'
        ctx1.fillText('Score: '+ puntaje1,385,25)
        ctx1.font = '30px VT323'
        ctx1.fillStyle='black'
        if(timer() < 11){
            ctx1.font = '30px VT323'
            ctx1.fillStyle = 'rgb(209, 19, 19)'
        }
        ctx1.fillText('Time: '+ timer(),395,55)
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

class Bird1{
    constructor(y){
        this.x = 0
        this.y = y
        this.width = 35
        this.height = 35
        this.image = new Image()
        this.image.src = images.ave
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.x+=2;
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height)
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

//INSTANCIAS
var tablero1 = new Board1()
var man1 = new Man1()

 //FUNCIONES PRINCIPALES
 function update(){
    timer()
    frames++
    ctx1.clearRect(0,0,canvas1.width,canvas1.height)
    tablero1.draw()
    man1.draw()
    
    generateSocks1()
    drawSocks1()
    checkSocks1()
    
    generateFlowers1()
    drawFlowers1()
    if(checkFlowers1()) ctx1.fillText('Score: ' + puntaje1,400,25)

    generateChins1()
    drawChins1()
    if(checkChins1()) ctx1.fillText('Score: ' + puntaje1,400,25)

    generateNopales1()
    drawNopales1()
    if(checkNopales1()) ctx1.fillText('Score: ' + puntaje1,400,25)


    generateAves1()
    drawAves1()
    if(checkAves1()) ctx1.fillText('Score: ' + puntaje1,400,25)

    generateAviones1()
    drawAviones1()
    if(checkAviones1()) ctx1.fillText('Score: ' + puntaje1,400,25)

    if (timer() === 10){
        audioFondo.playbackRate = 1.8;
    }

    if (timer() === 0){
        audioFin.defaultPlaybackRate = 2;
        audioFin.src = audios.end
        audioFin.play()
        gameOver()
        document.getElementById('winner').innerHTML = 'Score: ' + puntaje1;
    }
}

function start(){
    if(interval)return

    frames = 0
    interval = setInterval(update,1000/60)
    calcetas1=[];
    flores1=[];
    chinicuiles1=[];
    nopales1=[];
    aves1=[];
    aviones1=[];
    puntaje1=0;

    man1.x = 250
    man1.y = 100
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

function drawSocks1(equis){
    calcetas1.forEach(function(calceta){
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

//FLORES
function generateFlowers1(){
    if (frames % 200 === 0){
        var equis = Math.floor(Math.random() * 450)
        var flower1 = new Flower1(equis)
        flores1.push(flower1)
    }
}


function drawFlowers1(equis){
    flores1.forEach(function(flor){
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

//CHINICUILES
function generateChins1(){
    if (frames % 500 === 0){
        var equis = Math.floor(Math.random() * 450)
        var chinicuil1 = new Chin1(equis)
        chinicuiles1.push(chinicuil1)
    }
}

function drawChins1(equis){
    chinicuiles1.forEach(function(chinicuil){
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

//NOPALES
function generateNopales1(){
    if (frames % 150 === 0){
        var equis = Math.floor(Math.random() * 450)
        var nop1 = new Nopal1(equis)
        nopales1.push(nop1)
    }
}

function drawNopales1(equis){
    nopales1.forEach(function(nopalito){
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

//AVES
function generateAves1(){
    if (frames % 120 === 0){
        var equis = Math.floor(Math.random() * 450)
        var ave1 = new Bird1(equis)
        aves1.push(ave1)
    }
}

function drawAves1(equis){
    aves1.forEach(function(ave){
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

//AVIONES
function generateAviones1(){
    if (frames % 700 === 0){
        var equis = Math.floor(Math.random() * 450)
        var avion1 = new Plane1(equis)
        aviones1.push(avion1)
    }
}

function drawAviones1(equis){
    aviones1.forEach(function(avion){
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

//FUNCIONES AUXILIARES

//OBSERVADORES
window.onload = function() {
    tablero1.draw();
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
    if(e.keyCode===37 && man1.x > 10){
        man1.x -=25;
    }
    if(e.keyCode===39 && man1.x < 450){
        man1.x +=25;
    }
    if(e.keyCode===38 && man1.y > 10){
        man1.y -=25;
    }
    if(e.keyCode===40 && man1.y < 450){
        man1.y +=25;
    }
})