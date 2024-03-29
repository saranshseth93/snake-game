document.addEventListener("DOMContentLoaded", function () {
  //****************//
  //*Initialization*//
  //*******UI*******//
  //****************//
  var data = "";
  {
    data +=
      '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">';
    data += '<div id="app"></div>';
    data += '<div id="control"></div>';
    data += '<div id="score">000</div>';
    data += '<div id="point0">+100</div>';
    data += '<div id="point1">+100</div>';
    data += '<div id="point2">+100</div>';
    data += '<div id="point3">+100</div>';
    data += '<div id="start">Click to play</div>';
    data +=
      '<div id="gameover"><img src="/assets/laugh.gif" class="laugh" />GAME OVER</div>';
    data +=
      '<div id="playagain"><img src="/assets/laugh.gif" class="laugh" />Play again?</div>';
    data += '<div id="test"></div>';
  }
  document.getElementById("root").innerHTML = data;
  //****************//
  //****THE*GAME****//
  //****************//
  var snake = [];
  /*Our snake and the other */ {
    snake[0] = { x: 105, y: 95 }; // Initialization
    snake[1] = { x: 100, y: 95 }; // of three first
    snake[2] = { x: 95, y: 95 }; // snake elements
    var stagecolors = [
      "white",
      "#00a8ff",
      "#fbc531",
      "#4cd137",
      "#e84118",
      "#9c88ff",
      "#487eb0",
      "#7f8fa6",
      "#f5f6fa",
      "#273c75",
      "#ff9ff3",
      "#feca57",
      "#ff6b6b",
      "#48dbfb",
      "#1dd1a1",
      "#5f27cd",
      "#ff5252",
      "#ff793f",
      "#40407a",
      "#ffb142",
      "#706fd3",
      "#34ace0",
      "#ffda79",
    ]; // Stage colors
    var snakecolors = [
      "#44bd32",
      "#bdc3c7",
      "#9b59b6",
      "#d35400",
      "#e67e22",
      "#f39c12",
      "#f1c40f",
    ]; // snake colors
    var pointcolors = [
      "#d63031",
      "#fab1a0",
      "#8e44ad",
      "#833471",
      "#B53471",
      "#be2edd",
      "#e056fd",
    ]; // point colors
    var playeriter = 0; // player colors iterator
    var points = 2; // The length of our snake
    var pointx = [];
    var pointy = [];
    pointx[0] = Math.floor(Math.random() * 40 + 0) * 5; // Our goal
    pointy[0] = Math.floor(Math.random() * 40 + 0) * 5; // generated randomly
    var exist = 0;
    var score = 0; // Variable that has our score
    var pointval = 0;
    var changedir = 1; // Variable that checks if direction was changed
    var direction = 1; // Variable of directions that snake goes
    var icon = ""; // Variable of Icon that display while we click control
    var limiter = 0; // Variable to limit the time and speed up the game
    var timechange = 1; // Variable to multiply the limit so every stage lasts 1 min
    var gamespeed = 200; // Variable showing how fast is game working
    var coloriter = 0; // Color iteration
    var scale = 1; // Device scale
    var game;
  } // Variables
  setscale();
  function setscale() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (height < 550 || width < 450) {
      document.getElementById("root").style.height = 300 + "px";
      document.getElementById("root").style.width = 300 + "px";
      document.getElementById("root").style.fontSize = 48 + "px";
      scale = 0.75;
    }
    if (width < 700) {
      document.getElementById("keyboard").style.display = "none";
    }
  }
  function drawme(snakecolor, pointcolor) {
    let data = '<svg viewbox="0 0 200 200">'; // Start drawing svq
    for (let i = 0; i <= exist; i++) {
      data +=
        '<rect x="' +
        pointx[i] +
        '" y="' +
        pointy[i] +
        '" width="5" height="5"'; // Draw our points
      data += 'style="fill:' + pointcolor + ';stroke:none;"/>';
    }
    for (let i = 0; i <= points; i++) {
      // Draw our snake
      data +=
        '<rect x="' +
        snake[i].x +
        '" y="' +
        snake[i].y +
        '" width="5" height="5"';
      data += 'style="fill:' + snakecolor + ';stroke:none;"/>';
    }
    data += "</svg>"; // End drawing svq
    document.getElementById("app").innerHTML = data; // Display that
  } // Function drawing the game
  drawme(snakecolors[0], pointcolors[0]); // Draw the first frame of the game
  placepoint(0); // Place the label for pointing in the game
  document.onkeydown = function (event) {
    if (changedir == 1) {
      /*If you can change direction now*/ let control = event.keyCode; // Read the keycode of pressed key
      if ((control == 38 || control == 87) && direction != 2) {
        direction = 4;
        icon = '<i class="fas fa-arrow-circle-up"></i>';
      } // And adjust to the
      if ((control == 39 || control == 68) && direction != 3) {
        direction = 1;
        icon = '<i class="fas fa-arrow-circle-right"></i>';
      } // right event
      if ((control == 40 || control == 83) && direction != 4) {
        direction = 2;
        icon = '<i class="fas fa-arrow-circle-down"></i>';
      } // also display
      if ((control == 37 || control == 65) && direction != 1) {
        direction = 3;
        icon = '<i class="fas fa-arrow-circle-left"></i>';
      } // the right icon
      animatecontrol();
      changedir = 0; // You changed direction so u cannot execute the function for a while
      setTimeout(function () {
        changedir = 1;
      }, (3 * gamespeed) / 4); // The time is over no u can change direction again
    } // Do it else you need to wait a second
  }; // Snake control function
  document.getElementById("start").onclick = function () {
    document.getElementById("start").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("start").style.display = "none";
    }, 500);
    game = setInterval(running, gamespeed); // Our game works on the interval of game
  };
  document.getElementById("start").ontouchstart = function () {
    document.getElementById("start").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("start").style.display = "none";
    }, 500);
    game = setInterval(running, gamespeed); // Our game works on the interval of game
  };
  function handlekeys(dir) {
    if (dir == 1) {
      if (direction != 2) {
        icon = '<i class="fas fa-arrow-circle-up"></i>';
        direction = 4;
      }
    } else if (dir == 2) {
      if (direction != 4) {
        icon = '<i class="fas fa-arrow-circle-down"></i>';
        direction = 2;
      }
    } else if (dir == 3) {
      if (direction != 3) {
        icon = '<i class="fas fa-arrow-circle-right"></i>';
        direction = 1;
      }
    } else if (dir == 4) {
      if (direction != 1) {
        icon = '<i class="fas fa-arrow-circle-left"></i>';
        direction = 3;
      }
    }
    animatecontrol();
  }
  setupTouchControls();

  function setupTouchControls() {
    let startx, starty;

    document.addEventListener(
      "touchstart",
      function (e) {
        startx = e.touches[0].clientX;
        starty = e.touches[0].clientY;
        e.preventDefault();
      },
      false
    );

    document.addEventListener(
      "touchend",
      function (e) {
        const endx = e.changedTouches[0].clientX;
        const endy = e.changedTouches[0].clientY;

        const dx = endx - startx;
        const dy = endy - starty;

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            changeDirection("right");
          } else {
            changeDirection("left");
          }
        } else {
          if (dy > 0) {
            changeDirection("down");
          } else {
            changeDirection("up");
          }
        }
        e.preventDefault();
      },
      false
    );
  }

  function changeDirection(newDirection) {
    // Prevent the snake from reversing directly
    if (newDirection === "right" && direction !== "left") {
      direction = "right";
    } else if (newDirection === "left" && direction !== "right") {
      direction = "left";
    } else if (newDirection === "up" && direction !== "down") {
      direction = "up";
    } else if (newDirection === "down" && direction !== "up") {
      direction = "down";
    }
  }

  function running() {
    for (let i = points; i > 0; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    } // Moving every element of the snake except head
    // Head is moving in the if statements below
    if (direction == 1) {
      snake[0].x = snake[0].x + 5;
      if (snake[0].x > 195) snake[0].x = 0;
    } // Snake moves right
    if (direction == 2) {
      snake[0].y = snake[0].y + 5;
      if (snake[0].y > 195) snake[0].y = 0;
    } // Snake moves down
    if (direction == 3) {
      snake[0].x = snake[0].x - 5;
      if (snake[0].x < 0) snake[0].x = 195;
    } // Snake moves left
    if (direction == 4) {
      snake[0].y = snake[0].y - 5;
      if (snake[0].y < 0) snake[0].y = 195;
    } // Snake moves up
    if (snake[0].x == pointx[0] && snake[0].y == pointy[0]) pointcollision(0);
    if (exist >= 1 && snake[0].x == pointx[1] && snake[0].y == pointy[1])
      pointcollision(1);
    if (exist >= 2 && snake[0].x == pointx[2] && snake[0].y == pointy[2])
      pointcollision(2);
    if (exist >= 3 && snake[0].x == pointx[3] && snake[0].y == pointy[3])
      pointcollision(3);
    //**LEVEL*UP*SYSTEM**//
    if (score >= 600 && score <= 700) {
      colorchanger(1);
      playeriter = 1;
      if (exist == 0) {
        pointx[1] = Math.floor(Math.random() * 40 + 0) * 5;
        pointy[1] = Math.floor(Math.random() * 40 + 0) * 5;
        exist++;
      }
    }
    if (score >= 1200 && score <= 1500) {
      colorchanger(2);
      if (exist == 1) {
        pointx[2] = Math.floor(Math.random() * 40 + 0) * 5;
        pointy[2] = Math.floor(Math.random() * 40 + 0) * 5;
        exist++;
      }
    }
    if (score >= 1800 && score <= 2100) {
      colorchanger(14);
      playeriter = 2;
      if (exist == 2) {
        pointx[3] = Math.floor(Math.random() * 40 + 0) * 5;
        pointy[3] = Math.floor(Math.random() * 40 + 0) * 5;
        exist++;
      }
    }
    if (score >= 2500) {
      colorchanger(coloriter);
      coloriter++;
      playeriter = 3;
      if (coloriter >= 5) coloriter = 1;
    }
    if (score >= 5000) {
      colorchanger(coloriter);
      coloriter++;
      playeriter++;
      if (coloriter >= 10) coloriter = 1;
      if (playeriter > 6) playeriter = 5;
    }
    if (score >= 10000) {
      colorchanger(coloriter);
      coloriter++;
      playeriter++;
      if (coloriter >= 15) coloriter = 1;
      if (playeriter > 6) playeriter = 4;
    }
    if (score >= 15000) {
      colorchanger(coloriter);
      coloriter++;
      playeriter++;
      if (coloriter >= 21) coloriter = 1;
      if (playeriter > 6) playeriter = 3;
    }
    //********************//
    drawme(snakecolors[playeriter], pointcolors[playeriter]); // Draw the current frame of the game
    limiter++; // Increment the limiter every time interval ticks
    if (gamespeed > 30) speedup(); // If the game isn't too fast u can speed it up
    if (gameover() == true) {
      document.getElementById("gameover").style.display = "flex"; // display
      setTimeout(function () {
        document.getElementById("gameover").style.opacity = "1"; // gameover screen
        setTimeout(displayagain, 3000);
        clearInterval(game);
      }, 10);
    } // If the head of the snaek hit the body the game is over
  } // The function that controls the whole game
  function speedup() {
    if (limiter > 300 * timechange) {
      // If the stage lasts  1 min
      gamespeed = gamespeed - 10; // speed up the game making interval tick faster
      limiter = 0; // Make limiter 0 again
      timechange = timechange * 1.05; // And adjust the multiplier
      clearInterval(game); // To make changes u need to restart the interval
      game = setInterval(running, gamespeed); // So we clear it and run with proper arguments
    }
  } // The function that speeds up the game so it won't be that easy
  function accept(point) {
    for (let i = 0; i <= points; i++) {
      // Check if position of snake doesn't match with the new position of point
      if (snake[i].x == pointx[point] && snake[i].y == pointy[point])
        return false; // If its match return false
    } // And try again
    return true; // Else if everything is okay just return true the position doesn't match
  } // The function that inspect the generated points
  function gameover() {
    for (let i = 3; i <= points; i++) {
      // Check if the head doesn't interfere with body
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) return true; //if it does return true
    } //the game is over you lost
    return false; // Else return false and you can still try to be the best
  } // The function that inspects the colision between the head and the body
  function placepoint(point) {
    pointval = parseInt(100 * timechange);
    document.getElementById("point" + point).innerHTML = "+" + pointval;
    document.getElementById("point" + point).style.top =
      pointy[point] * 2 * scale + "px";
    document.getElementById("point" + point).style.left =
      pointx[point] * 2 * scale + "px";
  } // Position the point label
  function animatePoint(point) {
    document.getElementById("point" + point).style.transitionDuration = "1s"; // set transition
    setTimeout(function () {
      document.getElementById("point" + point).style.transform =
        "translate(-50%,-150%)scale(1.5)"; // set pulsing out
      document.getElementById("point" + point).style.opacity = "1"; // animation
    }, 10);
    setTimeout(function () {
      document.getElementById("point" + point).style.opacity = "0"; // hide the element
    }, 500);
    setTimeout(function () {
      document.getElementById("point" + point).style.transform =
        "translate(-50%,-50%)scale(1)"; // return to default
      document.getElementById("point" + point).style.transitionDuration = "0s"; // set transition to 0
    }, 1000);
  } // Animation gaining the point
  function colorchanger(color) {
    document.getElementById("app").style.color = stagecolors[color];
    document.getElementById("app").style.border =
      "3px solid " + stagecolors[color];
    document.getElementById("score").style.color = stagecolors[color];
    document.getElementById("point0").style.color = stagecolors[color];
    document.getElementById("point1").style.color = stagecolors[color];
    document.getElementById("point2").style.color = stagecolors[color];
    document.getElementById("point3").style.color = stagecolors[color];
    document.getElementById("control").style.color = stagecolors[color];
  } // Changing the color of the stage
  function displayagain() {
    document.getElementById("gameover").style.opacity = "0";
    document.getElementById("playagain").style.display = "flex";
    setTimeout(function () {
      document.getElementById("gameover").style.display = "none";
      document.getElementById("playagain").style.opacity = "1";
    }, 500);
  }
  function animatecontrol() {
    document.getElementById("control").innerHTML = icon; // Write the right icon on the screen
    document.getElementById("control").style.transform =
      "translate(-50%,-50%)scale(1.1)"; // animate the control icon
    setTimeout(function () {
      document.getElementById("control").style.transform =
        "translate(-50%,-50%)scale(1)";
    }, 100); // display default icon
  }
  function again() {
    snake.length = 3;
    score = 0;
    points = 2;
    exist = 0;
    pointx.length = 1;
    pointy.length = 1;
    pointx[0] = Math.floor(Math.random() * 40 + 0) * 5;
    pointy[0] = Math.floor(Math.random() * 40 + 0) * 5;
    changedir = 1;
    direction = 1;
    icon = "";
    limiter = 0;
    timechange = 1;
    placepoint(0);
    gamespeed = 200;
    coloriter = 0;
    playeriter = 0;
    colorchanger(coloriter);
    document.getElementById("score").innerHTML = score;
    document.getElementById("playagain").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("playagain").style.display = "none";
    }, 500);
    game = setInterval(running, gamespeed);
  }
  function pointcollision(point) {
    snake[points + 1] = { x: snake[points].x, y: snake[points].y }; // Generate element on the end of snake
    for (let i = points; i > 0; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    } // Sort the elements of the snake move them from first to last
    snake[0].x = pointx[point]; // Set the head of the snake
    snake[0].y = pointy[point]; // And make it current position
    points++; // Increment our points and the length of the snake
    pointx[point] = -5; // Make points go out from
    pointy[point] = -5; // the screen for a second
    animatePoint(point); // Animate point gaining
    score += pointval;
    document.getElementById("score").innerHTML = score;
    document.getElementById("score").style.transform =
      "translate(-50%,-50%)scale(1.1)";
    setTimeout(function () {
      document.getElementById("score").style.transform =
        "translate(-50%,-50%)scale(1)";
    }, 100);
    setTimeout(function () {
      pointx[point] = Math.floor(Math.random() * 40 + 0) * 5; // Generate new points
      pointy[point] = Math.floor(Math.random() * 40 + 0) * 5; // Randomly
      let accepted = accept(point); // Check if the point is generated properly
      while (accepted == false) {
        // If not execute it until its good
        pointx[point] = Math.floor(Math.random() * 40 + 0) * 5; // Generate position
        pointy[point] = Math.floor(Math.random() * 40 + 0) * 5; // to our point
        accepted = accept(point); // Check again if the point is generated properly
      }
      if (accepted == true) placepoint(point);
    }, 1500);
  }
  document.getElementById("playagain").onclick = again;
  document.getElementById("playagain").ontouchstart = again;
});
