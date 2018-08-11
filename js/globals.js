//global variables
var startButton;
var background;
var ocean;
var breaker;
var whitewash;
var thrilla;
var tubey;
var wifey;
var collide;
var startWidth;
var watchOut;
var tubers;
var rum;
var score;
var getDrunk;
var backSong;
var beach;
var cursors;

//"global" functions

function behindYou (){
	game.world.setBounds(0, 0, 800, 600) //sets world bounds (starting width, starting height, max width, max height)
	game.inputEnabled = true;
	
	//game images
	background = game.add.tileSprite(0, -200, game.width, game.height, 'sunset');  //adds sunset background
	background.scale.setTo(4) //rescales background

	ocean = game.add.tileSprite(0, 200, game.width, game.height - 200, 'horizon'); //adds ocean on top of sunset to make a horizon
	ocean.autoScroll(-20, 0) //creates a slow scroll so it appears we move along horizon

	breaker = game.add.tileSprite(0, 300, game.width, game.height, 'wave'); //adds "surfable" portion of wave
	breaker.scale.setTo(1, 1.75); //rescales wave to fit canvas
	breaker.autoScroll(-50, 0); //scrolls wave go simulate movement

	whitewash = game.add.sprite(-5, 300, 'wash'); //adds white wash to right side of screen
	whitewash.scale.setTo(1.5, 2); //scales whitewash
	whitewash.animations.add('crash'); //Names the animation "crash"
	whitewash.animations.play('crash', 10, true); //tells "crash" to play at 10 (fps?). The true loops the animation

};

function gorilla (surf){
	thrilla = game.add.sprite(99, 354, 'master'); //adds paddling sprite to screen
	thrilla.scale.setTo(1.5); //scales gorilla
	thrilla.animations.add('padIn', [0,1], 5, true); //names animation "padIn" using the first 2 frames of the sprite sheet, should show paddling
	thrilla.animations.add('popUp', [0, 1, 2, 3, 4], 5, false); //names animation "popUp" using the first 5 frames of the sprite sheet, should show standup
	thrilla.animations.add('surfRight', [4, 5], 5, true); //names animation "surfRight" using the 5th and 6th frames of the sprite sheet, should surf right
	thrilla.animations.add('surfLeft', [6, 7], 5, true); //names animation "surfLeft" using the last 2 frames of the sprite sheet, should surf left
	thrilla.animations.add('wipeout', [8, 9, 10, 11, 13, 14], 5, false);
	thrilla.animations.play(surf); //tells "padIn" to play at 5 (fps?). The true loops the animation
	game.physics.arcade.enable(thrilla); //allows gorilla to move around screen
	thrilla.outOfBoundsKill = true;
	thrilla.checkWorldBounds = true;
	thrilla.score = 90;
};

function tubeyTubey(){
	tubers = game.add.group();
	tubers.enableBody = true;
	tubers.physicBodyType = Phaser.Physics.ARCADE;
	tubers.createMultiple(20, 'tubby');
	tubers.createMultiple(20, 'wifey');
	game.time.events.loop(Phaser.Timer.SECOND * 2, tuberCreate);
	function tuberCreate(){
		startWidth = game.rnd.between(50, 580) //chooses a random number between 20 and 580 
		watchOut = tubers.getFirstExists(false); //tells game to treat each instance of group as individual
		watchOut.reset(startWidth, 600); //place a new sprite from group on (x,y)
		watchOut.body.velocity.x =  game.rnd.between(-20, 20); //gives a random x speed
		watchOut.body.velocity.y =  game.rnd.between(-20, -100);//give a random y speed
		watchOut.scale.setTo(2); //doubles size of each sprite
		watchOut.body.setSize(10, 10, 10, 10); //adjusts collision box
		watchOut.body.bounce.setTo(1,1);

	}
};

function rummyRumRum(){
	rum = game.add.group();
	rum.enableBody = true;
	rum.physicBodyType = Phaser.Physics.ARCADE;
	rum.createMultiple(10, 'rumDrink');
	var rumination = Phaser.Animation.generateFrameNames('rumDrink', 0, 10,);
	rum.callAll('animations.add', 'animations', 'drink', rumination, 3, true);
	rum.callAll('play', 'drink');
	game.time.events.loop(Phaser.Timer.SECOND * 5, rumCreate);	
	function rumCreate(){
		getDrunk = rum.getFirstExists(false); //tells game to treat each instance of rum as individual
		getDrunk.reset(startWidth, 600); //play a new sprite at (x,y)
		getDrunk.body.velocity.x = game.rnd.between(-20, 20);;
		getDrunk.body.velocity.y = game.rnd.between(-40, -100);
		//getDrunk.animations.play()
		getDrunk.scale.setTo(2);
		getDrunk.body.setSize(32, 32, 15, 15);
	}
}

function tunes(){
	backSong = game.add.audio('theme'); //background music
	beach = game.add.audio('ocean', 0.9);  //ocean crashing for ambiance
	backSong.play();
	beach.play();
};

function theButton(){
	startButton = game.add.button(300, 400, 'button', startClick, this, 0, 1, 2);
		function startClick(){
			startButton.visible =! startButton.visible;
			game.state.start('game');
		}
};

function gimmeControl(){
	cursors = game.input.keyboard.createCursorKeys(); //sets cursor variable to this which assigns control to keys
};

function keyStrokes(){
	if(thrilla.score <= 90){
		if(cursors.left.isDown){
			thrilla.body.velocity.x = -100;
			thrilla.animations.play('surfLeft');
		} 
		else if (cursors.right.isDown){
			thrilla.body.velocity.x = 100;
			thrilla.animations.play('surfRight');
		};
		if(cursors.up.isDown){
			thrilla.body.velocity.y = -100;
			if(thrilla.y <= 250){
			thrilla.y = 250
			}
		} 
		else if(cursors.down.isDown){
			thrilla.body.velocity.y = 200;
			
		};
	} else {
		return;
	}
		
};

function pause(){
	game.input.onUp.add(function(){
		game.paused = true;
		game.input.onUp.add(function(){
			game.paused = false;
		});
	});
};

function endGame(){
	game.state.start('gameOver');
};

function winner(){
	game.state.start('winner')
};

function wipeout(){
	if(thrilla.score > 10){
		lessDrunk(10);
	} else{
		thrilla.animations.play('wipeout');
		thrilla.score = 0
		score.text = 'You Are ' + thrilla.score.toString() + '% Drunk';
		cursors.left.isDown.enabled = false;
		cursors.right.isDown.enabled = false;
		game.time.events.add(Phaser.Timer.SECOND * 2, endGame);
		
	}

}

function getSome(){
	if(thrilla.score < 90){
		drunkeness(10);
		rum.forEach(function(r){
			r.kill();
		});
	} else {
		thrilla.animations.play('wipeout');
		thrilla.score = 100
		score.text = 'You Are ' + thrilla.score.toString() + '% Drunk';
		cursors.left.isDown.enabled = false;
		cursors.right.isDown.enabled = false;
		game.time.events.add(Phaser.Timer.SECOND * 2, winner);
		
	}

}

function dieFloatyDie(){
	tubers.forEach(function(t){ //kills tubers when they reach top of wave
		if(t.body.position.y < 300){
			t.kill();
		}
	})

	rum.forEach(function(r){ //kills rum bottles when they reach top of wave
		if(r.body.position.y < 300){
			r.kill();
		}
	})
}

function drunkeness(booze){
	thrilla.score += booze;
	score.text = 'You Are ' + thrilla.score.toString() + '% Drunk';
}

function lessDrunk(yuck){
	thrilla.score -= yuck;
	score.text = 'You Are ' + thrilla.score.toString() + '% Drunk';
}	





