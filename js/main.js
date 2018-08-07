console.log('main.js working')

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
};

function create(){
	console.log('create');
	game.physics.startSystem(Phaser.Physics.ARCADE); //adds game physics to the game

	//game images
	var  background = game.add.tileSprite(0, 0, game.width, game.height, 'sunset');  //adds sunset background
	background.scale.setTo(4) //rescales background

	var ocean = game.add.tileSprite(0, 200, game.width, game.height - 200, 'horizon'); //adds ocean on top of sunset to make a horizon
	ocean.autoScroll(-20, 0) //creates a slow scroll so it appears we move along horizon

	var breaker = game.add.tileSprite(0, 300, game.width, game.height, 'wave'); //adds "surfable" portion of wave
	breaker.scale.setTo(1, 1.75); //rescales wave to fit canvas
	breaker.autoScroll(-50, 0); //scrolls wave go simulate movement

	
	//game animations
	var whitewash = game.add.sprite(-5, 300, 'wash'); //adds white wash to right side of screen
	whitewash.scale.setTo(1.5, 2); //scales whitewash
	whitewash.animations.add('crash'); //Names the animation "crash"
	whitewash.animations.play('crash', 10, true); //tells "crash" to play at 10 (fps?). The true loops the animation

	
	var thrilla = game.add.sprite(100, 350, 'paddling'); //adds paddling sprite to screen
	thrilla.scale.setTo(1.5); //scales gorilla
	thrilla.animations.add('padIn'); //names animation "padIn"
	thrilla.animations.play('padIn', 5, true); //tells "padIn" to play at 5 (fps?). The true loops the animation
	game.physics.arcade.enable(thrilla); //allows gorilla to move around screen

	//game sounds
};

function update(){
	console.log('update');
}