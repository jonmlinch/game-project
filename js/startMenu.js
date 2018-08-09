function startMenu(){
	function create(){
		console.log('create');
		game.physics.startSystem(Phaser.Physics.ARCADE); //adds game physics to the game
		game.world.setBounds(0, -200, 800, 800) //sets world bounds (starting width, starting height, max width, max height)

		//game images
		background = game.add.tileSprite(0, -200, game.width, game.height, 'sunset');  //adds sunset background
		background.scale.setTo(4) //rescales background

		ocean = game.add.tileSprite(0, 200, game.width, game.height - 200, 'horizon'); //adds ocean on top of sunset to make a horizon
		ocean.autoScroll(-20, 0) //creates a slow scroll so it appears we move along horizon
		// game.physics.arcade.enable(ocean); //enables arcade physics on tubby

		breaker = game.add.tileSprite(0, 300, game.width, game.height, 'wave'); //adds "surfable" portion of wave
		breaker.scale.setTo(1, 1.75); //rescales wave to fit canvas
		breaker.autoScroll(-50, 0); //scrolls wave go simulate movement
		

		
		//game animations

			//gorilla images/animations
		thrilla = game.add.sprite(99, 354, 'master'); //adds paddling sprite to screen
		thrilla.scale.setTo(1.5); //scales gorilla
		thrilla.animations.add('padIn', [0,1], 5, true); //names animation "padIn" using the first 2 frames of the sprite sheet, should show paddling
		thrilla.animations.add('popUp', [0, 1, 2, 3, 4], 5, false); //names animation "popUp" using the first 5 frames of the sprite sheet, should show standup
		thrilla.animations.add('surfRight', [4, 5], 5, true); //names animation "surfRight" using the 5th and 6th frames of the sprite sheet, should surf right
		thrilla.animations.add('surfLeft', [6, 7], 5, true); //names animation "surfLeft" using the last 2 frames of the sprite sheet, should surf left
		thrilla.animations.add('wipeout', [8, 9, 10, 11, 13, 14], 5, false);
		thrilla.animations.play('padIn'); //tells "padIn" to play at 5 (fps?). The true loops the animation
		game.physics.arcade.enable(thrilla); //allows gorilla to move around screen
		thrilla.outOfBoundsKill = true;
		thrilla.checkWorldBounds = true;
		thrilla.score = 50;

			//background images/animations
		whitewash = game.add.sprite(-5, 300, 'wash'); //adds white wash to right side of screen
		whitewash.scale.setTo(1.5, 2); //scales whitewash
		whitewash.animations.add('crash'); //Names the animation "crash"
		whitewash.animations.play('crash', 10, true); //tells "crash" to play at 10 (fps?). The true loops the animation


			//nasty tubers
		tubers = game.add.group();
		tubers.enableBody = true;
		tubers.physicBodyType = Phaser.Physics.ARCADE;
		tubers.createMultiple(20, 'tubby');
		tubers.createMultiple(20, 'wifey');
		game.time.events.loop(Phaser.Timer.SECOND * 3, tuberCreate);

			//Rum for points
		rum = game.add.group();
		rum.enableBody = true;
		rum.physicBodyType = Phaser.Physics.ARCADE;
		rum.createMultiple(10, 'rumDrink');
		var rumination = Phaser.Animation.generateFrameNames('rumDrink', 0, 10,);
		rum.callAll('animations.add', 'animations', 'drink', rumination, 5, true);
		rum.callAll('play', 'drink');
		game.time.events.loop(Phaser.Timer.SECOND * 5, rumCreate);	

			//collision animation
		// collide = game.add.sprite(-10, 200, 'collision');	
		// collide.scale.setTo(2);
		// collide.animations.add('bam', [0, 1, 2, 3, 4], 5, true);

		//game sounds
		backSong = game.add.audio('theme'); //background music
		beach = game.add.audio('ocean', 0.9);  //ocean crashing for ambiance
		inTheDrink = game.add.audio('splash'); //splash noise for wipeouts
		backSong.play();
		beach.play();



		//add keyboard controls
		cursors = game.input.keyboard.createCursorKeys(); //sets cursor variable to this which assigns control to keys

		//add score to game
		score = game.add.text(20, 20, 'You Are ' + thrilla.score.toString() + '% Drunk')

		//add camera movement to thrilla
		game.camera.follow(thrilla);



	};
}