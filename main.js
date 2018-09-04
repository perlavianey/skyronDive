var canvas1 = document.getElementById('canvas1');
var ctx1 = canvas1.getContext('2d');

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

//VARIABLES GLOBALES
var interval;
var frames = 0;
var images = {
    fondo:'./fondo.png',
    man:'./man.png',
    calceta:'./sock.png',
    flor:'./flower.png',
    corazon:'',
    nopal:'',
    ave:'',
    avion:'',
}
var calcetas1=[];
var calcetas2=[];
var flores1=[];
var flores2=[];
var puntaje1=0;
var puntaje2=0;

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
        this.y-=1
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
        this.y-=1
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
    crashWith(objeto){
        var crash = (this.y + this.height > objeto.y) &&
                    (this.y < objeto.y + objeto.height) &&
                    (this.x < objeto.x + objeto.width) && 
                    (this.x + this.width > objeto.x);
        if (crash) {
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
    crashWith(objeto){
        var crash2 = (this.y + this.height > objeto.y) &&
                    (this.y < objeto.y + objeto.height) &&
                    (this.x < objeto.x + objeto.width) && 
                    (this.x + this.width > objeto.x);
        if (crash2) {
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

//INSTANCIAS
var tablero1 = new Board1()
var tablero2 = new Board2()
var man1 = new Man1()
var man2 = new Man2()

 //FUNCIONES PRINCIPALES
 function update(){
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
}

function start(){
    if(interval) return
    frames = 0
    interval = setInterval(update,1000/60)
}

//CALCETINES
function generateSocks1(){
    if (frames % 300 === 0){
        var equis = Math.floor(Math.random() * 450)
        var sock1 = new Sock1(equis)
        calcetas1.push(sock1)
    }
}

function generateSocks2(){
    if (frames % 300 === 0){
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
        if(man1.crashWith(c1) === true){
            var pos = calcetas1.indexOf(c1);
            calcetas1.splice(pos, 1);
            puntaje1 = puntaje1 + 2;
        }
    }) 
}

function checkSocks2(){
    calcetas2.forEach(function(c2){
        if(man2.crashWith(c2) === true){
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
        if(man1.crashWith(c1) === true){
            var pos = flores1.indexOf(c1);
            flores1.splice(pos, 1);
            puntaje1 = puntaje1 + 1;
        }
    }) 
}

function checkFlowers2(){
    flores2.forEach(function(c2){
        if(man2.crashWith(c2) === true){
            var pos = flores2.indexOf(c2);
            flores2.splice(pos, 1);
            puntaje2 = puntaje2 + 1;
        }
    }) 
}

//FUNCIONES AUXILIARES

//OBSERVADORES
window.onload = function() {
    tablero1.draw();
    tablero2.draw();
}

addEventListener('keydown',function(e){ //recibe un evento (e)
    if(e.keyCode===13){
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