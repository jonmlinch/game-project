console.log('main.js working')

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameboard', {preload: preload, create: create, update: update});

function preload(){
	console.log('preload');
};

function create(){
	console.log('create');
};

function update(){
	console.log('update');
};