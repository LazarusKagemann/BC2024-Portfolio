document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element and its context
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // Define the canvas dimensions
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // Define the player sprite properties
    var player = {
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        speed: 5
    };

    // Define other sprites
    var sprites = [
        { x: 200, y: 200, width: 50, height: 50, color: "blue" },
        { x: 400, y: 300, width: 50, height: 50, color: "green" }
    ];

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    // Function to draw a sprite
    function drawSprite(sprite) {
        ctx.fillStyle = sprite.color;
        ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
    }

    // Function to draw all sprites
    function drawSprites() {
        sprites.forEach(function(sprite) {
            drawSprite(sprite);
        });
    }

    // Function to update player position based on key input
    function updatePlayer() {
        // Update player position based on velocity
        player.x += player.dx;
        player.y += player.dy;

        // Boundary checks for player
        if (player.x < 0) {
            player.x = 0;
        }
        if (player.x + player.width > canvasWidth) {
            player.x = canvasWidth - player.width;
        }
        if (player.y < 0) {
            player.y = 0;
        }
        if (player.y + player.height > canvasHeight) {
            player.y = canvasHeight - player.height;
        }

        // Collision detection with other sprites
        sprites.forEach(function(sprite) {
            if (collision(player, sprite)) {
                // Handle collision (for example, alert and redirect)
                alert("Collided with sprite! Redirecting...");
                // Replace with window.location.href = "your_page_url_here";
                // For demo purposes, clear the alert after displaying once
                setTimeout(function() {
                    clearAlert();
                }, 100);
            }
        });
    }

    // Function to check collision between two sprites
    function collision(sprite1, sprite2) {
        return sprite1.x < sprite2.x + sprite2.width &&
               sprite1.x + sprite1.width > sprite2.x &&
               sprite1.y < sprite2.y + sprite2.height &&
               sprite1.y + sprite1.height > sprite2.y;
    }

    // Function to handle keyboard input
    var keys = {};
    document.addEventListener("keydown", function(event) {
        keys[event.key] = true;
        handleKeys();
    });

    document.addEventListener("keyup", function(event) {
        keys[event.key] = false;
        handleKeys();
    });

    function handleKeys() {
        // Reset player velocity
        player.dx = 0;
        player.dy = 0;

        // Set player velocity based on pressed keys
        if (keys["ArrowUp"] || keys["KeyW"]) {
            player.dy = -player.speed;
        }
        if (keys["ArrowDown"] || keys["KeyS"]) {
            player.dy = player.speed;
        }
        if (keys["ArrowLeft"] || keys["KeyA"]) {
            player.dx = -player.speed;
        }
        if (keys["ArrowRight"] || keys["KeyD"]) {
            player.dx = player.speed;
        }

        updatePlayer();
        drawCanvas();
    }

    // Function to draw the entire canvas
    function drawCanvas() {
        clearCanvas();
        drawSprites();
        drawSprite(player);
    }

    // Initial draw of the canvas
    drawCanvas();

    // Function to clear the alert after collision (for demo purposes)
    function clearAlert() {
        // Use a confirm dialog to clear alert
        if (confirm("Alert cleared. Continue?")) {
            // Do nothing, just close the confirm dialog
        }
    }
});
