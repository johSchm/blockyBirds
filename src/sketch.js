// vars
var bird;
var pipes = [];
var gameCounter = 0;
var pipeSpawnSpeed = 120;
var pipeGapSize = 350;
var restart = false;


// setup
function setup()
{
	createCanvas(800,800);

	bird = new Bird();
	//pipes.push(new Pipe(pipeGapSize));
}


// draw
function draw()
{
	background(0);

	if (!restart)
	{
		controlBird();
		controlPipes();
	}
	else
	{
		gameRestartFragment()
	}

	textSize(100);
	text(gameCounter, (width / 2), 100);
	textAlign(CENTER, CENTER);
}


// draw and handel the bird obj
function controlBird()
{
	bird.show();
	bird.update();

	if (bird.death() === true)
	{
		gameOver();
	}
}


// draw and handel the pipe obj
function controlPipes()
{
	// spawn a pipe every x frame
	if (frameCount % pipeSpawnSpeed == 0)
	{
		pipes.push(new Pipe(pipeGapSize));
	}

	// inverse loop, because otherwise the
	// deleting pipes out of the array
	// will cause memory problems
	for (var i = (pipes.length - 1); i > 0; i--)
	{
		pipes[i].show();
		pipes[i].update();

		// handle the event that the player
		// one of the pipes -> gameover
		if (pipes[i].hits(bird))
		{
			gameOver();
			break;
		}

		// bird passes the current pipe
		if (pipes[i].passed(bird))
		{
			console.log("true");
			gameCounter++;
		}
		else
			console.log("false");

		// constrains the pipes in memory
		// delete it when its offscreen
		if (pipes[i].offscreen())
		{
			pipes.splice(i, 1);
			pipeGapSize -= 5;
		}
	}
}


// key control
function keyPressed()
{
	// space pressed
	if (key == ' ')
	{
		if (restart)
		{
			gameRestart();
		}
		else
		{
			bird.up();
		}
	}
}


// mouse control
function mousePressed()
{
	// game over screen
	if (restart)
	{
		gameRestart();
	}
	else
	{
		bird.up();
	}
}


// gameover
function gameOver()
{
	restart = true;
}


// gameover restart fragment screen
function gameRestartFragment()
{
	textSize(100);
	text("GAMEOVER", width/2, height/2);
	textAlign(CENTER, CENTER);

	//resetBtn = createButton('RESET');
  	//resetBtn.position(width/2 - 70, height/2 + 100);
  	//resetBtn.mousePressed(mousePressed);
}


// game restart function
function gameRestart()
{
	//resetBtn.remove();
	background(0); // clears the whole canvas
	gameCounter = 0;
	bird.reset();
	pipes.splice(0, pipes.length);
	restart = false;
}


