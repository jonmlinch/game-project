var winGame = {
	create: function(){
	behindYou();
	theButton();
	backSong.pause();

	//add score to game
	thrilla.score = 100
	score = game.add.text(20, 20, 'You Are ' + thrilla.score.toString() + '% Drunk', {font: 'bold 35px Shadows Into Light'})
	youDrunk = game.add.text(150, 100, "Go home! You're Drunk!", {font: '45px Permanent Marker'});
	butstill = game.add.text(250, 150, "But...You're a winner!", {font: '25px Permanent Marker'});

	//add camera movement to thrilla
	game.camera.follow(thrilla);
	},
}
