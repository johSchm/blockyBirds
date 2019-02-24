


// constructor function
function Pipe(gapSize)
{
	this.minGapSize = 100;
	this.gapSize	= this.minGapSize;

	if (gapSize >= this.minGapSize)
	{
		this.gapSize = gapSize;
	}

	this.y0 		= 0
	this.y1 		= random(0, (height - this.gapSize));
	this.y2 		= this.y1 + this.gapSize;
	this.y3 		= height;
	this.x  		= width;

	this.width 		= 50;
	this.speed		= 2;
	this.highlight 	= false;
	this.passedBool	= false;


	// draw function
	this.show = function()
	{
		fill(255);

		// pipe obj hits by the bird - highlight it
		if (this.highlight)
		{
			fill(255,0,0);
		}

		// draws the rectangles
		rect(this.x, this.y0, this.width, this.y1);
		rect(this.x, this.y2, this.width, this.y3);

		//fill(0,0,0,0);
		//noStroke();
		//rect(this.x, this.y1, this.width, this.y2);
	}


	// spawn obstacles (pipes)
	this.update = function()
	{
		this.x -= this.speed;
	}


	// checks if the pipe is offset
	this.offscreen = function()
	{
		if (this.x < -this.width)
		{
			return true;
		}

		return false;
	}


	// bird passed bird
	this.passed = function(bird)
	{
		if ((bird.x >= (this.x + this.width)) && !this.passedBool)
		{
			//console.log("passed");
			this.passedBool = true;
			return true;
		}

		return false;
	}


	// hits the bird
	this.hits = function(bird)
	{
		// it hits the bird if the x-position is the same and
		// the y-position is one of the opposite pipes
		if (((bird.y >= this.y0 && bird.y <= this.y1)  ||
			 (bird.y >= this.y2 && bird.y <= this.y3)) &&
			 (bird.x >= this.x  && bird.x <= this.x + this.width))
		{
			this.highlight = true;
			return true;
		}

		this.highlight = false;
		return false;
	}
}


