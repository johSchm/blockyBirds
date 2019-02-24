


// bird constructor function
function Bird()
{
	this.x = 50;
	this.y = height / 2;
	
	this.gravity  	= 0.6;
	this.lift 		= -25;
	this.velocity 	= 0;
	this.airRes		= 0.1;

	// draws the bird
	this.show = function()
	{
		fill(29, 183, 150);
		rect(this.x, this.y, 20, 20);
		fill(255);
	}


	// physics function
	this.update = function()
	{
		this.velocity += this.gravity;
		this.velocity *= (1 - this.airRes);
		this.y += this.velocity;
	}


	// resets all parameters
	this.reset = function()
	{
		this.y = height / 2;
		this.gravity = 1;
		this.velocity = 0;
	}


	// pushes bird up
	this.up = function()
	{
		this.velocity += this.lift;
	}


	// death function
	this.death = function()
	{
		// bird reaches the bottom of the canvas
		if (this.y > height)
		{
			this.reset();
			return true;
		}

		// bird reaches the top of the canvas
		else if (this.y < 0)
		{
			this.reset();
			return true;
		}

		return false;
	}
}