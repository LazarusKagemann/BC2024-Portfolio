// Initialize canvas and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Images
var background = new Image();
background.src = "papertexture.jpg";

var playerImg = new Image();
playerImg.src = "player.png"; // Replace with the path to your player image

var gamePieceImg = new Image();
gamePieceImg.src = "gamePiece.png"; // Replace with the path to your game piece image

// Ensure all images are loaded before starting the game
Promise.all([
    new Promise((resolve, reject) => {
        background.onload = resolve;
        background.onerror = reject;
    }),
    new Promise((resolve, reject) => {
        playerImg.onload = resolve;
        playerImg.onerror = reject;
    }),
    new Promise((resolve, reject) => {
        gamePieceImg.onload = resolve;
        gamePieceImg.onerror = reject;
    })
]).then(() => {
    startGame();
}).catch((error) => {
    console.error("Error loading images:", error);
});

// Game pieces
var myGamePiece;
var player;
var gamePieces = [];

// Start the game
function startGame() {
    myGamePiece = new Component(gamePieceImg, 100, 100, 600, 150); // Non-player game piece
    player = new PlayerComponent(playerImg, 100, 100, 200, 150); // Player-controlled image
    
    // Example of adding multiple game pieces
    gamePieces.push(new Component(gamePieceImg, 100, 100, 110, 150));
    
    // Set collision callback for player
    player.onCollision = function() {
        // Handle collision with specific game piece (e.g., redirect to another page)
        console.log("Player collided with special game piece!");
        //window.location.href = "page2.html";
    };
    
    // Start updating the game
    updateGameArea();
}

// Base Component class
function Component(img, width, height, x, y) {
    this.img = img;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    
    this.update = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    this.isCollision = function(otherComponent) {
        // Basic axis-aligned bounding box (AABB) collision detection
        if (this.x < otherComponent.x + otherComponent.width &&
            this.x + this.width > otherComponent.x &&
            this.y < otherComponent.y + otherComponent.height &&
            this.y + this.height > otherComponent.y) {
            return true;
        }
        return false;
    }
}

// PlayerComponent inherits from Component
function PlayerComponent(img, width, height, x, y) {
    Component.call(this, img, width, height, x, y);
    
    this.onCollision = null; // Callback function to be called on collision
    
    this.move = function(dx, dy) {
        // Update player position and handle collision detection
        var originalX = this.x;
        var originalY = this.y;
        
        // Move player to new position (attempt)
        this.x += dx;
        
        // Check collision with myGamePiece after horizontal movement
        if (this.isCollision(myGamePiece)) {
            // Revert horizontal movement if collision
            this.x = originalX;
            
            // Check if collision with myGamePiece triggers a special action
            if (myGamePiece.specialAction) {
                if (this.onCollision) {
                    this.onCollision();
                }
            }
        }
        
        // Check collision with other game pieces
        gamePieces.forEach(piece => {
            if (this.isCollision(piece)) {
                // Revert movement if collision with other game piece
                this.x = originalX;
            }
        });
        
        // Check collision with canvas boundaries
        if (this.x < 0 || this.x + this.width > canvas.width) {
            // Handle collision with canvas boundaries if needed
            // Example: prevent player from moving out of bounds
            this.x = originalX;
        }
    }
}

// Define keys object to track pressed keys
var keys = {};
document.addEventListener('keydown', function(event) {
    keys[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    delete keys[event.key];
});

// Update game area function
function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    
    // Draw background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    // Update and draw game pieces
    myGamePiece.update();
    player.update();
    
    gamePieces.forEach(piece => {
        piece.update();
    });
    
    // Player movement based on keys pressed
    const speed = 15; // Adjust speed as needed
    
    if (keys['ArrowLeft'] || keys['KeyA']) {
        player.move(-speed, 0);
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
        player.move(speed, 0);
    }
    if (keys['ArrowUp'] || keys['KeyW']) {
        // Handle vertical movement if necessary (for jumping or similar)
        // Example: player.move(0, -speed);
    }
    if (keys['ArrowDown'] || keys['KeyS']) {
        // Handle downward movement if necessary (for crouching or similar)
        // Example: player.move(0, speed);
    }
    
    requestAnimationFrame(updateGameArea); // Request next frame
}
