// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

// Sound Effects
let soundGameOver = "sounds/gameOver.wav";   //GAME OVER
let soundCaught = "sounds/caught.wav";      // Caught
let soundTimesUp = "sounds/timesUp.wav";    //TIMES UP
// Assign audio to soundEfx
let soundEfx = document.getElementById("soundEfx");

// Background image Object1
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src ="images/background.png";

// Border TOP image Object1
let borderTopReady = false;
let borderTopImage = new Image();
borderTopImage.onload = function () {
    borderTopReady = true;
};
borderTopImage.src ="images/cocoTopBorder.png";

// Border SIDE image Object1
let borderSideReady = false;
let borderSideImage = new Image();
borderSideImage.onload = function () {
    borderSideReady = true;
};
borderSideImage.src ="images/cocoSideBorder.png";

// Border BOTTOM image Object1
let borderBottomReady = false;
let borderBottomImage = new Image();
borderBottomImage.onload = function () {
    borderBottomReady = true;
};
borderBottomImage.src ="images/cocoBottomBorder.png";

// Basket image object2
let catchReady = false;
let catchImage= new Image();
catchImage.onload = function () {
    catchReady = true;
};
catchImage.src = "images/catch.png";

// green coconut image object3
let coconutReady = false;
let coconutImage = new Image();
coconutImage.onload = function () {
    coconutReady = true;
};
coconutImage.src = "images/coconut.png";

// Game objects
let coco = {
	speed: 256, // movement in pixels per second
	x: 0,  // where on the canvas are they?
	y: 0  // where on the canvas are they?
};
let coconut = {
// for this version, the monster does not move, so just and x and y
	x: 0,
	y: 0
};
let coconutCaught = 0;



// Handle keyboard controls
let keysDown = {}; //object were we properties when keys go down
// and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener( "keydown" , function (e) {
	// console.log(e.keyCode + "down");
    keysDown[e.keyCode] = true;
    console.log(keysDown)
}, false);

addEventListener("keyup", function (e) {
    // console.log(e.keyCode + "up")
    delete keysDown[e.keyCode];
}, false);



// *********** FUNCTIONS here  **************

/// UPDATE game objects
let update = function (modifier) {
    // modified to keep hero away from bushes
    if (38 in keysDown && coco.y > 32 + 2) {       //player holding UP
        coco.y -= coco.speed * modifier;
    }
    if (40 in keysDown && coco.y < canvas.height - (173 + 2)) {       //player holding DOWN
        coco.y += coco.speed * modifier;
    }    
    if (37 in keysDown && coco.x > (32 + 2)) {       //player holding LEFT
        coco.x -= coco.speed * modifier;
    }
    if (39 in keysDown && coco.x < canvas.width - (164 + 2)) {       //player holding RIGHT (32 width of tree)
        coco.x += coco.speed * modifier;
    }

    //are they touching?
    if (
        coco.x <= (coconut.x + 81)      // 81 is the width of the characters
        && coconut.x <= (coco.x + 81)
        && coco.y <= (coconut.y + 81)
        && coconut.y <= (coco.y + 81)
    ) {
        ++coconutCaught;            // keep track of our "score"
         // sound effect
         //soundEfx.src = soundCaught;
         //soundEfx.play();
        
        //GAME OVER
        if (coconutCaught == 5) {
            // sound effect
            soundEfx.src = soundGameOver;
            soundEfx.play();
            soundEfx.play();
            soundEfx.play();
            soundEfx.play();
            alert("GAME OVER! \nYou caught " + coconutCaught + " coconuts!" );
            soundEfx.play();
        }
        else {
            reset();
        }
        reset();                    // start a new cycle
    }
};


/// draw everything in the main RENDER
let render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }    
    if (borderTopReady) {
        ctx.drawImage(borderTopImage, 0, 0);
    }    
    if (borderSideReady) {
        ctx.drawImage(borderSideImage, 0, 0);
        ctx.drawImage(borderSideImage, 968, 0);
    }    
    if (borderBottomReady) {
        ctx.drawImage(borderBottomImage, 0, 968);
    }
    if (catchReady) {
        ctx.drawImage(catchImage, coco.x, coco.y);
    }
	if (coconutReady) {
		ctx.drawImage(coconutImage, coconut.x, coconut.y);
    }

    // SCORE
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Coconut: " + coconutCaught, 32, 32);
};

// Reset the game when the player catches a monster
let reset = function () {
    coco.x = canvas.width / 2;
    coco.y = canvas.height / 2;
    
    //Place the monster somewhere on the screen randomly
    // but not in the hedges, Article in wrong, the 64 needs to be 
    // hedge 32 + hedge 32 + char 32 = 192
        coconut.x = 32 + (Math.random() * (canvas.width - 150));
        coconut.y = 32 + (Math.random() * (canvas.height - 148));
    };
    

// The main game loop
let main = function () {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
	render();
    then = now;
// Request to do this again ASAP using the Canvas method,
// it’s much like the JS timer function “setInterval, it will
// call the main method over and over again so our players 
// can move and be re-drawn
	requestAnimationFrame(main); 
};


//// loop at the end after the loop is defined
//executing code
// Let's play this game!
let then = Date.now();
reset();
main();  // call the main game loop.


