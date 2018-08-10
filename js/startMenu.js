var startUp = {
	create: function(){
		behindYou();
		gorilla('padIn');
		theButton();
		tunes()

		//add score to game
		score = game.add.text(20, 20, 'You Are ' + thrilla.score.toString() + '% Drunk', {font: 'bold 35px Shadows Into Light'})

	}

	
}