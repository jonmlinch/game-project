console.log('main.js working')

//global variables
var startButton;
var background;
var ocean;
var breaker;
var whitewash;
var thrilla;
var tubey;
var wifey;
var watchOut;
var tubers;
var stack;
var backSong;
var beach;
var splash;
var cursors;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameboard', {preload: preload, create: create, update: update, render:render});


function preload(){
	console.log('preload');
	//loads start button
	startButton = 

	//loading game images
	game.load.image('sunset', './assets/img/sunset-background.jpg'); //sunset background
	game.load.image('horizon', './assets/img/flat-water-section.png'); //water horizon
	game.load.image('wave', './assets/img/breaking-wave-long.png'); //wave back
	game.load.image('tubby', './assets/img/tuber-obstacle-male.png'); //Tubby tuber obstacle
	game.load.image('wifey', './assets/img/tuber-obstacle-female.png'); // Wife of Tubby
	game.load.image('ssright', './assets/img/silver-surfer-attacks-from-right.png'); //silver surfer attacks
	game.load.image('ssleft', './assets/img/silver-surfer-attacks-from-left.png'); //silver surfer from the other side
	game.load.image('collision', './assets/img/collision-mark.png'); //collision pop up
	game.load.image('life', './assets/img/life-counter.png'); //head shot for tracking lives

	

	//loading game animations
	game.load.spritesheet('wash', './assets/img/wave-tube-sheet.png', 137.5, 170);  //whitewash animation taking frames width: 137.5 and height: 170
	game.load.spritesheet('master', './assets/img/revised--thrilla-master-sheet.png', 64, 64); //standup animation taking frames width and height: 64
	


	//loading game sounds
	game.load.audio('theme', './assets/audio/funky-surf-music.mp3');
	game.load.audio('crash', './assets/audio/splash-noise.mp3');
	game.load.audio('ocean', './assets/audio/Ocean-waves.mp3');
};

function create(){
	console.log('create');
	game.physics.startSystem(Phaser.Physics.ARCADE); //adds game physics to the game
	game.world.setBounds(0, -200, 800, 800) //sets world bounds (starting width, starting height, max width, max height)

	//game images
	background = game.add.tileSprite(0, -200, game.width, game.height, 'sunset');  //adds sunset background
	background.scale.setTo(4) //rescales background

	ocean = game.add.tileSprite(0, 200, game.width, game.height - 200, 'horizon'); //adds ocean on top of sunset to make a horizon
	ocean.autoScroll(-20, 0) //creates a slow scroll so it appears we move along horizon
	// game.physics.arcade.enable(ocean); //enables arcade physics on tubby

	breaker = game.add.tileSprite(0, 300, game.width, game.height, 'wave'); //adds "surfable" portion of wave
	breaker.scale.setTo(1, 1.75); //rescales wave to fit canvas
	breaker.autoScroll(-50, 0); //scrolls wave go simulate movement
	

	
	//game animations

		//gorilla images/animations
	thrilla = game.add.sprite(99, 354, 'master'); //adds paddling sprite to screen
	thrilla.scale.setTo(1.5); //scales gorilla
	thrilla.animations.add('padIn', [0,1], 5, true); //names animation "padIn" using the first 2 frames of the sprite sheet, should show paddling
	thrilla.animations.add('popUp', [0, 1, 2, 3, 4], 5, false); //names animation "popUp" using the first 5 frames of the sprite sheet, should show standup
	thrilla.animations.add('surfRight', [4, 5], 5, true); //names animation "surfRight" using the 5th and 6th frames of the sprite sheet, should surf right
	thrilla.animations.add('surfLeft', [6, 7], 5, true); //names animation "surfLeft" using the last 2 frames of the sprite sheet, should surf left
	thrilla.animations.add('wipeout', [8, 9, 10, 11, 13, 14], 5, false);
	thrilla.animations.play('padIn'); //tells "padIn" to play at 5 (fps?). The true loops the animation
	game.physics.arcade.enable(thrilla); //allows gorilla to move around screen
	thrilla.outOfBoundsKill = true;
	thrilla.checkWorldBounds = true;

		//background images/animations
	whitewash = game.add.sprite(-5, 300, 'wash'); //adds white wash to right side of screen
	whitewash.scale.setTo(1.5, 2); //scales whitewash
	whitewash.animations.add('crash'); //Names the animation "crash"
	whitewash.animations.play('crash', 10, true); //tells "crash" to play at 10 (fps?). The true loops the animation


		//nasty tubers
		

	// tubey = game.add.sprite(startWidth, 600, 'tubby'); //creates tuber sprite on gameboard
	// tubey.scale.setTo(2); //doubles size of tubby
	// game.physics.arcade.enable(tubey); //enables arcade physics on tubby
	// tubey.body.setSize(30, 30, 25, 25); //resets bounding box for collision purposes
	// tubey.body.immovable = true; //gorilla should be able to go through
	// tubey.body.velocity.y = -100 //starting speed
	// tubey.body.immovable = true;

	// wubey = game.add.sprite(startWidth, 600, 'wifey'); //creates tuber sprite on gameboard
	// wubey.scale.setTo(2); //doubles size of wifey
	// game.physics.arcade.enable(wubey); //enables arcade physics on wifey
	// wubey.body.setSize(30, 30, 25, 25); //resets bounding box for collision purposes
	// wubey.body.immovable = true; //gorilla should be able to go through
	// wubey.body.velocity.y = -100; ////starting speed

	tubers = game.add.group();
	tubers.enableBody = true;
	tubers.physicBodyType = Phaser.Physics.ARCADE;
	tubers.createMultiple(6, 'tubby');
	tubers.createMultiple(6, 'wifey');
	game.time.events.loop(Phaser.Timer.SECOND * 3, tuberCreate);	



	//game sounds
	backSong = game.add.audio('theme'); //background music
	beach = game.add.audio('ocean', 0.9);  //ocean crashing for ambiance
	splash = game.add.audio('splash'); //splash noise for wipeouts
	backSong.play();
	beach.play();



	//add keyboard controls
	cursors = game.input.keyboard.createCursorKeys(); //sets cursor variable to this which assigns control to keys

	//add camera movement to thrilla
	game.camera.follow(thrilla);



};

function update(){
	console.log('update');
	//assigns initial velocity to gorilla, as set he stays in same horizontal plane but slowly moves down the wave. Will need to play with this speed
	thrilla.body.velocity.x = 0;
	thrilla.body.velocity.y = 20;

	//assigns specific key functions
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
	} 
	else if(cursors.down.isDown){
		thrilla.body.velocity.y = 200;
	};

	
	game.physics.arcade.overlap(thrilla, tubers, wipeout);
	// game.physics.arcade.collide(tubers, ocean, overFalls);
	tubers.forEach(function(t){
		if(t.body.position.y < 300){
			t.kill();
		}
	})
}


function wipeout(){
	console.log('WIPEOUT!!!');
	thrilla.animations.play('wipeout');
}


function tuberCreate(){
	var startWidth = game.rnd.between(20, 580) //chooses a random number between 20 and 580
	var watchOut = tubers.getFirstExists(false); //tells game to treat each instance of group as individual
	watchOut.reset(startWidth, 600); //place a new sprite from group on (x,y)
	watchOut.body.velocity.x = game.rnd.between(-75, 75); //gives a random x speed
	watchOut.body.velocity.y = game.rnd.between(-5, -100); //give a random y speed
	watchOut.scale.setTo(2); //doubles size of each sprite
	watchOut.body.setSize(30, 30, 25, 25); //adjusts collision box
	
	// if(watchOut.y <= 300){ //should kill eacj sprite at 300px make ******NOT CURRENTLY WORKING**********
	// 	watchOut.kill();
	// };

}

function render(){
    // game.debug.body(ocean);
    // game.debug.body(thrilla);
    // game.debug.body(tubers);
}

