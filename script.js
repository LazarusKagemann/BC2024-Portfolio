var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var imageObject = new Image();
imageObject.src = "./darkwood.jpg";
imageObject.onload = () => {
    ctx.drawImage(imageObject);
}

var img = document.getElementById("darkwood.jpg");
ctx.drawImage(img, 100, 100);
