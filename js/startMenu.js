var startUp = {
	create: function(){
		behindYou();
		gorilla('padIn');
		theButton();
		beach = game.add.audio('ocean', 0.9);
		beach.play();
		
		//add score to game
		score = game.add.text(20, 20, 'You Are ' + thrilla.score.toString() + '% Drunk', {font: 'bold 35px Shadows Into Light'})

		//add camera movement to thrilla
		game.camera.follow(thrilla);

	}

	
}