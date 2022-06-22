// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

// let chessBoard = [
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//     ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
// ];

// Sound Effects
let soundEfx;
let soundGameOver = "sounds/gameOver.wav";   //GAME OVER
let soundCaught = "sounds/caught.wav";      // Caught
let soundTimesUp = "sounds/timesUp.wav";    //TIMES UP
// Assign audio to soundEfx
soundEfx = document.getElementById("soundEfx");

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
let coconutImage = new Image();     // 64 x 64
coconutImage.onload = function () {
    coconutReady = true;
};
coconutImage.src = "images/coconut.png";

// // watermelon1 image object3
// let watermelon1Ready = false;
// let watermelon1Image = new Image();
// watermelon1Image.onload = function () {
//     watermelon1Ready = true;
// };
// watermelon1Image.src = "images/watermelon1.png";

// // watermelon2 image object3
// let watermelon2Ready = false;
// let watermelon2Image = new Image();
// watermelon2Image.onload = function () {
//     watermelon2Ready = true;
// };
// watermelon2Image.src = "images/watermelon2.png";

// // watermelon3 image object3
// let watermelon3Ready = false;
// let watermelon3Image = new Image();
// watermelon3Image.onload = function () {
//     watermelon3Ready = true;
// };
// watermelon3Image.src = "images/watermelon3.png";

// // watermelon4 image object3
// let watermelon4Ready = false;
// let watermelon4Image = new Image();
// watermelon4Image.onload = function () {
//     watermelon4Ready = true;
// };
// watermelon4Image.src = "images/watermelon4.png";


// Game objects
let cocoBasket = {
	speed: 256, // movement in pixels per second
	x: 0,  // where on the canvas are they?
	y: 0  // where on the canvas are they?
};

let coconut = {
// for this version, the monster does not move, so just and x and y
	x: 0,
	y: 0
};

// //Watermelon version
// let watermelon1 = {
//     x: 0,
//     y: 0
// };

// let watermelon2 = {
//     x: 0,
//     y: 0
// };

// let watermelon3 = {
//     x: 0,
//     y: 0
// };

// let watermelon4 = {
//     x: 0,
//     y: 0
// };

let coconutCaught = 0;
let notCoconut = false;
//let timesUp = 0; /// will add a timer in the new version




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


// RESET the game when player catches WATERMELON
let resetAgain = function () {
    if(notCoconut == true) {
        soundEfx.src = soundGameOver;
        soundEfx.play();
    }
    else {
        placeItem(cocoBasket);
        placeItem(coconut);
        // placeItem(watermelon1);
        // placeItem(watermelon2);
        // placeItem(watermelon3);
        // placeItem(watermelon4);

        if (coconutCaught == 5) {
            alert("You WON!");
            //sound effect
            soundEfx.src = soundGameOver;
            soundEfx.play();
        }
    }
};

// //WATERMELON version
// let placeItem = function (character) {
//     let X = 4;
//     let Y = 7;
//     let success = false;
//     while (!success) {
//         X = Math.floor( Math.random() * 9); //returns 0 thru 8
//         Y = Math.floor( Math.random() * 9); 

//         if (chessBoard[X][Y] == "x") {
//             success = true;
//         }
//     }
//     chessBoard[X][Y] = "O"; //mark the square as taken
//     character.x = (X*100) + 32;     // border is 32
//     character.y = (Y*100) + 32;
// }




// *********** FUNCTIONS here  **************

/// UPDATE game objects
let update = function (modifier) {
    // modified to keep hero away from bushes
    if (38 in keysDown && cocoBasket.y > 32 + 2) {       //player holding UP
        cocoBasket.y -= cocoBasket.speed * modifier;
    }
    if (40 in keysDown && cocoBasket.y < canvas.height - (173 + 2)) {       //player holding DOWN
        cocoBasket.y += cocoBasket.speed * modifier;
    }    
    if (37 in keysDown && cocoBasket.x > (32 + 2)) {       //player holding LEFT
        cocoBasket.x -= cocoBasket.speed * modifier;
       
    }
    if (39 in keysDown && cocoBasket.x < canvas.width - (164 + 2)) {       //player holding RIGHT (32 width of tree)
        cocoBasket.x += cocoBasket.speed * modifier;
    }

    //are they touching?
    if (
        cocoBasket.x <= (coconut.x + 81)      // 81 is the width of the characters
        && coconut.x <= (cocoBasket.x + 81)
        && cocoBasket.y <= (coconut.y + 81)
        && coconut.y <= (cocoBasket.y + 81)
    ) {
        ++coconutCaught;            // keep track of our "score"
        //  sound effect
         soundEfx.src = soundCaught;
         soundEfx.play();
        
        //GAME OVER
        if (coconutCaught == 5) {
            // sound effect
            // soundEfx.pause();
            soundEfx.src = soundGameOver;
            soundEfx.play();
            soundEfx.play();
            alert("GAME OVER! \nYou caught " + coconutCaught + " coconuts!" );
        }
        else {
            reset();
        }
        reset();                    // start a new cycle
    }
/// with WATERMELON version
    // if (
    //     cocoBasket.x + 4 <= (watermelon1.x + 35)
    //     && watermelon1.x <= (cocoBasket.x + 25)
    //     && cocoBasket.y <= (watermelon1.y + 35)
    //     && watermelon1.y <= (cocoBasket.y + 25)
    // ) {
    //     soundGameOver()
    // }

    // if (
    //     cocoBasket.x + 4 <= (watermelon1.x + 35)
    //     && watermelon2.x <= (cocoBasket.x + 25)
    //     && cocoBasket.y <= (watermelon2.y + 35)
    //     && watermelon2.y <= (cocoBasket.y + 25)
    // ) {
    //     soundGameOver()
    // }

    // if (
    //     cocoBasket.x + 4 <= (watermelon3.x + 35)
    //     && watermelon3.x <= (cocoBasket.x + 25)
    //     && cocoBasket.y <= (watermelon3.y + 35)
    //     && watermelon3.y <= (cocoBasket.y + 25)
    // ) {
    //     soundGameOver()
    // }
    // if (
    //     cocoBasket.x + 4 <= (watermelon4.x + 35)
    //     && watermelon4.x <= (cocoBasket.x + 25)
    //     && cocoBasket.y <= (watermelon4.y + 35)
    //     && watermelon4.y <= (cocoBasket.y + 25)
    // ) {
    //     soundGameOver()
    // }

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
        ctx.drawImage(catchImage, cocoBasket.x, cocoBasket.y);
    }
	if (coconutReady) {
		ctx.drawImage(coconutImage, coconut.x, coconut.y);
    }
    // if (watermelon1Ready) {
    //     ctx.drawImage(watermelon1Image, watermelon1.x, watermelon1.y);
    // }

    // if (watermelon2Ready) {
    //     ctx.drawImage(watermelon2Image, watermelon2.x, watermelon2.y);
    // }

    // if (watermelon2Ready) {
    //     ctx.drawImage(watermelon3Image, watermelon3.x, watermelon3.y);
    // }

    // if (watermelon4) {
    //     ctx.drawImage(watermelon4Image, watermelon4.x, watermelon4.y);
    // }

    // SCORE
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.font = "24px Courier";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Coconut: " + coconutCaught, 32, 32);

    // //TIMER
    //ctx.fillText("Timer: " + timesUp, 32, 64);
};

// Reset the game when the player catches a coconut
let reset = function () {
    cocoBasket.x = canvas.width / 2;
    cocoBasket.y = canvas.height / 2;
    
    //Place the coconut somewhere on the screen randomly
    // but not in the border
    // border 32 + border 32 + border 32 = 192
        coconut.x = 32 + (Math.random() * (canvas.width - 150));
        coconut.y = 32 + (Math.random() * (canvas.height - 148));
        //watermelon1.x = 32 +(Math.random() * (canvas.height - 148));
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


