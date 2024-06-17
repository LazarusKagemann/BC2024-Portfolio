var canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d");

var background = new Image();
background.src = "papertexture.jpg";

// Make sure the image is loaded first otherwise nothing will draw.


var myGamePiece;

function startGame() {
//   myGameArea.start();
    background.onload = function(){
        ctx.drawImage(background,0,0);
        myGamePiece = new component(30, 30, "red", 10, 120);
    }
    
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

// var img = document.getElementById("darkwood.jpg");
// ctx.drawImage(img, 100, 100);
startGame();