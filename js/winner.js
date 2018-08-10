var winGame = {
		create: function(){
		//game images
		background = game.add.tileSprite(0, -200, game.width, game.height, 'sunset');  //adds sunset background
		background.scale.setTo(4) //rescales background

		ocean = game.add.tileSprite(0, 200, game.width, game.height - 200, 'horizon'); //adds ocean on top of sunset to make a horizon
		ocean.autoScroll(-20, 0) //creates a slow scroll so it appears we move along horizon
		

		breaker = game.add.tileSprite(0, 300, game.width, game.height, 'wave'); //adds "surfable" portion of wave
		breaker.scale.setTo(1, 1.75); //rescales wave to fit canvas
		breaker.autoScroll(-50, 0); //scrolls wave go simulate movement
		
		//background images/animations
		whitewash = game.add.sprite(-5, 300, 'wash'); //adds white wash to right side of screen
		whitewash.scale.setTo(1.5, 2); //scales whitewash
		whitewash.animations.add('crash'); //Names the animation "crash"
		whitewash.animations.play('crash', 10, true); //tells "crash" to play at 10 (fps?). The true loops the animation

		//start buttonstart
		startButton = game.add.button(300, 400, 'button', startClick, this, 0, 1, 2);
		function startClick(){
			startButton.visible =! startButton.visible;
			game.state.start('game');
		}

		//game sounds
		backSong = game.add.audio('theme'); //background music
		beach = game.add.audio('ocean', 0.9);  //ocean crashing for ambiance
		backSong.play();
		beach.play();

		//add score to game
		thrilla.score = 100
		score = game.add.text(20, 20, 'You Are ' + thrilla.score.toString() + '% Drunk', {font: 'bold 35px Shadows Into Light'})
		youDrunk = game.add.text(150, 100, "Go home! You're Drunk!", {font: '45px Permanent Marker'});
		butstill = game.add.text(250, 150, "But...You're a winner!", {font: '25px Permanent Marker'});

		//add camera movement to thrilla
		game.camera.follow(thrilla);
		},

	


		startClick: function(){
			startButton.visible =! startButton.visible;
			game.state.start('game');
		}
	}
