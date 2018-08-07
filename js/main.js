console.log('main.js working')

//global variables
var background;
var ocean;
var breaker;
var whitewash;
var thrilla;
var stand;
var cursors;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameboard', {preload: preload, create: create, update: update});


function preload(){
	console.log('preload');
	//loading game images
	game.load.image('sunset', './assets/img/sunset-background.jpg'); //sunset background
	game.load.image('horizon', './assets/img/flat-water-section.png'); //water horizon
	game.load.image('wave', './assets/img/breaking-wave-long.png'); //wave back

	

	//loading game animations
	game.load.spritesheet('wash', './assets/img/wave-tube-sheet.png', 137.5, 170);  //whitewash animation taking frames width: 137.5 and height: 170
	game.load.spritesheet('paddling', './assets/img/thrilla-paddling-sheet.png', 64, 64); //paddling animation taking frames width and height: 64
	game.load.spritesheet('master', './assets/img/thrilla-master-sheet.png', 64, 64); //standup animation taking frames width and height: 64
	game.load.spritesheet('surfLeft', './assets/img/surf-left-sheet.png', 64, 64); //surfing left animation taking frames width and height: 64
	game.load.spritesheet('surfRight', './assets/img/surf-right-sheet.png', 64, 64); //surfing right animation taking frames width and height: 64


	//loading game sounds
	game.load.audio('theme', './assets/audio/funky-surf-music.mp3');
};

function create(){
	console.log('create');
	game.physics.startSystem(Phaser.Physics.ARCADE); //adds game physics to the game

	//game images
	background = game.add.tileSprite(0, 0, game.width, game.height, 'sunset');  //adds sunset background
	background.scale.setTo(4) //rescales background

	ocean = game.add.tileSprite(0, 200, game.width, game.height - 200, 'horizon'); //adds ocean on top of sunset to make a horizon
	ocean.autoScroll(-20, 0) //creates a slow scroll so it appears we move along horizon

	breaker = game.add.tileSprite(0, 300, game.width, game.height, 'wave'); //adds "surfable" portion of wave
	breaker.scale.setTo(1, 1.75); //rescales wave to fit canvas
	breaker.autoScroll(-50, 0); //scrolls wave go simulate movement

	
	//game animations
	whitewash = game.add.sprite(-5, 300, 'wash'); //adds white wash to right side of screen
	whitewash.scale.setTo(1.5, 2); //scales whitewash
	whitewash.animations.add('crash'); //Names the animation "crash"
	whitewash.animations.play('crash', 10, true); //tells "crash" to play at 10 (fps?). The true loops the animation

	
	thrilla = game.add.sprite(99, 354, 'master'); //adds paddling sprite to screen
	thrilla.scale.setTo(1.5); //scales gorilla
	thrilla.animations.add('padIn', [0,1], 5, true); //names animation "padIn" using the first 2 frames of the sprite sheet, should show paddling
	thrilla.animations.add('popUp', [0, 1, 2, 3, 4], 5, false); //names animation "popUp" using the first 5 frames of the sprite sheet, should show standup
	thrilla.animations.add('surfRight', [4, 5], 5, true); //names animation "surfRight" using the 5th and 6th frames of the sprite sheet, should surf right
	thrilla.animations.add('surfLeft', [6, 7], 5, true); //names animation "surfLeft" using the last 2 frames of the sprite sheet, should surf left
	thrilla.animations.play('padIn'); //tells "padIn" to play at 5 (fps?). The true loops the animation
	game.physics.arcade.enable(thrilla); //allows gorilla to move around screen
	// thrilla.setAll('outOfBoundsKill', true);
	// thrilla.setAll('checkWorldBounds', true);

	//game sounds


	//add keyboard controls
	cursors = game.input.keyboard.createCursorKeys(); //sets cursor variable to this which assigns control to keys



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
	}



}