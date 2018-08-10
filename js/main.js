console.log('main.js working')

//global variables
// var startButton;
// var background;
// var ocean;
// var breaker;
// var whitewash;
// var thrilla;
// var tubey;
// var wifey;
// var collide;
// var startWidth;
// var watchOut;
// var randX;
// var randY;
// var tubers;
// var rum;
// var score;
// var getDrunk;
// var backSong;
// var beach;
// var splash;
// var cursors;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameboard');

game.state.add('boot', bootState);
game.state.add('load', loadUp);
game.state.add('startMenu', startUp);
game.state.add('game', gameOn);
game.state.add('gameOver', loser);
game.state.add('winner', winGame);

game.state.start('boot');


// function preload(){
// 	console.log('preload');

// 	//loading game images
// 	game.load.image('sunset', './assets/img/sunset-background.jpg'); //sunset background
// 	game.load.image('horizon', './assets/img/flat-water-section.png'); //water horizon
// 	game.load.image('wave', './assets/img/breaking-wave-long.png'); //wave back
// 	game.load.image('tubby', './assets/img/tuber-obstacle-male.png'); //Tubby tuber obstacle
// 	game.load.image('wifey', './assets/img/tuber-obstacle-female.png'); // Wife of Tubby
// 	game.load.image('ssright', './assets/img/silver-surfer-attacks-from-right.png'); //silver surfer attacks
// 	game.load.image('ssleft', './assets/img/silver-surfer-attacks-from-left.png'); //silver surfer from the other side
// 	game.load.image('life', './assets/img/life-counter.png'); //head shot for tracking lives

	

// 	//loading game animations
// 	game.load.spritesheet('wash', './assets/img/wave-tube-sheet.png', 137.5, 170);  //whitewash animation taking frames width: 137.5 and height: 170
// 	game.load.spritesheet('master', './assets/img/revised--thrilla-master-sheet.png', 64, 64); //standup animation taking frames width and height: 64
// 	game.load.spritesheet('rumDrink', './assets/img/rum-sheet.png', 32, 32); //rum animation to be collected for points
// 	game.load.spritesheet('collision', './assets/img/collision-sheet.png', 64, 64); //collision animation
// 	game.load.spritesheet('button', './assets/img/button-start-spritesheet.png', 196, 70); //start button animation


// 	//loading game sounds
// 	game.load.audio('theme', './assets/audio/funky-surf-music.mp3');
// 	game.load.audio('crash', './assets/audio/splash-noise.mp3');
// 	game.load.audio('ocean', './assets/audio/Ocean-waves.mp3');
// };

// function create(){
// 	console.log('create');
// 	game.physics.startSystem(Phaser.Physics.ARCADE); //adds game physics to the game
// 	game.world.setBounds(0, -200, 800, 800) //sets world bounds (starting width, starting height, max width, max height)

// 	//game images
// 	background = game.add.tileSprite(0, -200, game.width, game.height, 'sunset');  //adds sunset background
// 	background.scale.setTo(4) //rescales background

// 	ocean = game.add.tileSprite(0, 200, game.width, game.height - 200, 'horizon'); //adds ocean on top of sunset to make a horizon
// 	ocean.autoScroll(-20, 0) //creates a slow scroll so it appears we move along horizon
// 	// game.physics.arcade.enable(ocean); //enables arcade physics on tubby

// 	breaker = game.add.tileSprite(0, 300, game.width, game.height, 'wave'); //adds "surfable" portion of wave
// 	breaker.scale.setTo(1, 1.75); //rescales wave to fit canvas
// 	breaker.autoScroll(-50, 0); //scrolls wave go simulate movement
	

	
// 	//game animations

// 		//gorilla images/animations
// 	thrilla = game.add.sprite(99, 354, 'master'); //adds paddling sprite to screen
// 	thrilla.scale.setTo(1.5); //scales gorilla
// 	thrilla.animations.add('padIn', [0,1], 5, true); //names animation "padIn" using the first 2 frames of the sprite sheet, should show paddling
// 	thrilla.animations.add('popUp', [0, 1, 2, 3, 4], 5, false); //names animation "popUp" using the first 5 frames of the sprite sheet, should show standup
// 	thrilla.animations.add('surfRight', [4, 5], 5, true); //names animation "surfRight" using the 5th and 6th frames of the sprite sheet, should surf right
// 	thrilla.animations.add('surfLeft', [6, 7], 5, true); //names animation "surfLeft" using the last 2 frames of the sprite sheet, should surf left
// 	thrilla.animations.add('wipeout', [8, 9, 10, 11, 13, 14], 5, false);
// 	thrilla.animations.play('padIn'); //tells "padIn" to play at 5 (fps?). The true loops the animation
// 	game.physics.arcade.enable(thrilla); //allows gorilla to move around screen
// 	thrilla.outOfBoundsKill = true;
// 	thrilla.checkWorldBounds = true;
// 	thrilla.score = 50;

// 		//background images/animations
// 	whitewash = game.add.sprite(-5, 300, 'wash'); //adds white wash to right side of screen
// 	whitewash.scale.setTo(1.5, 2); //scales whitewash
// 	whitewash.animations.add('crash'); //Names the animation "crash"
// 	whitewash.animations.play('crash', 10, true); //tells "crash" to play at 10 (fps?). The true loops the animation


// 		//nasty tubers
// 	tubers = game.add.group();
// 	tubers.enableBody = true;
// 	tubers.physicBodyType = Phaser.Physics.ARCADE;
// 	tubers.createMultiple(20, 'tubby');
// 	tubers.createMultiple(20, 'wifey');
// 	game.time.events.loop(Phaser.Timer.SECOND * 3, tuberCreate);

// 		//Rum for points
// 	rum = game.add.group();
// 	rum.enableBody = true;
// 	rum.physicBodyType = Phaser.Physics.ARCADE;
// 	rum.createMultiple(10, 'rumDrink');
// 	var rumination = Phaser.Animation.generateFrameNames('rumDrink', 0, 10,);
// 	rum.callAll('animations.add', 'animations', 'drink', rumination, 5, true);
// 	rum.callAll('play', 'drink');
// 	game.time.events.loop(Phaser.Timer.SECOND * 5, rumCreate);	

// 		//start screen
// 	// game.stage.backgroundcolor = 'rgba (136, 136, 136, 0.5)'

// 	startButton = game.add.button(300, 400, 'button', startClick, this, 0, 1, 2);



// 		//collision animation
// 	// collide = game.add.sprite(-10, 200, 'collision');	
// 	// collide.scale.setTo(2);
// 	// collide.animations.add('bam', [0, 1, 2, 3, 4], 5, true);

// 	//game sounds
// 	backSong = game.add.audio('theme'); //background music
// 	beach = game.add.audio('ocean', 0.9);  //ocean crashing for ambiance
// 	inTheDrink = game.add.audio('splash'); //splash noise for wipeouts
// 	backSong.play();
// 	beach.play();



// 	//add keyboard controls
// 	cursors = game.input.keyboard.createCursorKeys(); //sets cursor variable to this which assigns control to keys

// 	//add score to game
// 	score = game.add.text(20, 20, 'You Are ' + thrilla.score.toString() + '% Drunk')

// 	//add camera movement to thrilla
// 	game.camera.follow(thrilla);



// };

// function update(){
// 	console.log('update');
// 	//assigns initial velocity to gorilla, as set he stays in same horizontal plane but slowly moves down the wave. Will need to play with this speed
// 	thrilla.body.velocity.x = 0;
// 	thrilla.body.velocity.y = 20;

// 	//assigns specific key functions
// 	if(cursors.left.isDown){
// 		console.log('left is down')
// 		thrilla.body.velocity.x = -100;
// 		thrilla.animations.play('surfLeft');
// 	} 
// 	else if (cursors.right.isDown){
// 		console.log('right is down')
// 		thrilla.body.velocity.x = 100;
// 		thrilla.animations.play('surfRight');
// 	};
// 	if(cursors.up.isDown){
// 		thrilla.body.velocity.y = -100;
// 		if(thrilla.y <= 250){
// 		thrilla.y = 250
// 		}
// 	} 
// 	else if(cursors.down.isDown){
// 		thrilla.body.velocity.y = 200;
		
// 	};



	
// 	game.physics.arcade.collide(thrilla, tubers, wipeout); //causes thrilla to wipeout when he hits a tuber
// 	game.physics.arcade.overlap(thrilla, rum, getSome); //causes thrilla to get points when he collects rum using the getSome function
	
// 	dieFloatyDie(); //kills obstacles when they get to top of wave
// }


// function wipeout(){
// 	console.log(thrilla.score);
// 	if(thrilla.score > 0){
// 		lessDrunk(10);
// 		//collide.play('bam');
// 	} else{
// 		thrilla.animations.play('wipeout');
// 		//**********Game Over stage****************
// 	}
	
// }

// function getSome(){
// 	if(thrilla.score < 100){
// 		drunkeness(10);
// 		rum.forEach(function(r){
// 			r.kill();
// 		});
// 	} else {
// 		console.log('you win!')
// 		//*******Win Game Stage********	
// 	}

// }


// function tuberCreate(){
// 	startWidth = game.rnd.between(20, 580) //chooses a random number between 20 and 580
// 	randX = game.rnd.between(-75, 75);
// 	randY = game.rnd.between(-5, -100);
// 	watchOut = tubers.getFirstExists(false); //tells game to treat each instance of group as individual
// 	watchOut.reset(startWidth, 600); //place a new sprite from group on (x,y)
// 	watchOut.body.velocity.x =  randX; //gives a random x speed
// 	watchOut.body.velocity.y =  randY;//give a random y speed
// 	watchOut.scale.setTo(2); //doubles size of each sprite
// 	watchOut.body.setSize(10, 10, 10, 10); //adjusts collision box
// 	watchOut.body.bounce.setTo(1,1);

// }

// function dieFloatyDie(){
// 	tubers.forEach(function(t){ //kills tubers when they reach top of wave
// 		if(t.body.position.y < 300){
// 			t.kill();
// 		}
// 	})

// 	rum.forEach(function(r){ //kills rum bottles when they reach top of wave
// 		if(r.body.position.y < 300){
// 			r.kill();
// 		}
// 	})
// }

// function rumCreate(){
// 	getDrunk = rum.getFirstExists(false); //tells game to treat each instance of rum as individual
// 	getDrunk.reset(startWidth, 600); //play a new sprite at (x,y)
// 	getDrunk.body.velocity.x = randX;
// 	getDrunk.body.velocity.y = randY;
// 	getDrunk.animations.play()
// 	getDrunk.scale.setTo(2);
// 	getDrunk.body.setSize(32, 32, 15, 15);
// }

// function drunkeness(booze){
// 	thrilla.score += booze;
// 	score.text = 'You Are ' + thrilla.score.toString() + '% Drunk';
// }

// function lessDrunk(yuck){
// 	thrilla.score -= yuck;
// 	score.text = 'You Are ' + thrilla.score.toString() + '% Drunk';
// }

// function startClick(){
// 	startButton.visible =! startButton.visible;
// }

// function render(){
//     // game.debug.body(ocean);
//     // game.debug.body(thrilla);
//     game.debug.body(tubers);
//     game.debug.body(rum);
// }

