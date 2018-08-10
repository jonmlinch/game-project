var gameOn = {
	create: function(){

		behindYou();
		gorilla('popUp');
		tubeyTubey();
		rummyRumRum();
		tunes();
		gimmeControl();

		//add score to game
		score = game.add.text(20, 20, 'You Are ' + thrilla.score.toString() + '% Drunk', {font: 'bold 35px Shadows Into Light'})


		//add camera movement to thrilla
		game.camera.follow(thrilla);
	},

	update: function(){
		//assigns initial velocity to gorilla, as set he stays in same horizontal plane but slowly moves down the wave. Will need to play with this speed
		thrilla.body.velocity.x = 0;
		thrilla.body.velocity.y = 20;
		if(thrilla.y >= 601){
				game.state.start('gameOver');
			};
		pause();
		keyStrokes();
		game.physics.arcade.collide(thrilla, tubers, wipeout); //causes thrilla to wipeout when he hits a tuber
		game.physics.arcade.overlap(thrilla, rum, getSome); //causes thrilla to get points when he collects rum using the getSome function	
		dieFloatyDie(); //kills obstacles when they get to top of wave
	}	
}


	