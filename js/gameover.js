var loser = {
	create: function(){
		behindYou();
		theButton();
		tunes()

		//add score to game
		score = game.add.text(20, 20, 'You Are ' + thrilla.score.toString() + '% Drunk', {font: 'bold 35px Shadows Into Light'});
		gameEnd = game.add.text(200, 100, 'Game Over!', {font: '60px Permanent Marker'});
		butstill = game.add.text(120, 165, "Gorillas only surf when they're drunk", {font: '25px Permanent Marker'});
		//add camera movement to thrilla
		game.camera.follow(thrilla);
	},
}
