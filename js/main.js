console.log('main.js working')

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameboard', {preload: preload, create: create, update: update});


function preload(){
	console.log('preload');
	game.load.image('sunset', './assets/img/sunset-background.jpg');
	game.load.image('horizon', './assets/img/flat-water-section.png');
	game.load.image('pad1', './assets/img/thrilla-paddle-1.png');
};

function create(){
	console.log('create');
	//game images
	var  background = game.add.tileSprite(0, 0, game.width, game.height, 'sunset');
	background.scale.setTo(4)

	game.add.tileSprite(0, 200, game.width, game.height - 200, 'horizon');

	
	var thrilla = game.add.sprite(0, 0, 'pad1');
	thrilla.scale.setTo(1.5);
	

	//game animations

	//game sounds
};

function update(){
	console.log('update');
}