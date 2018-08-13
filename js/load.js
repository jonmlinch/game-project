var loadUp = {
	preload: function(){
		
		//loading game images
		game.load.image('sunset', './assets/img/sunset-background.jpg');
		game.load.image('horizon', './assets/img/flat-water-section.png');
		game.load.image('wave', './assets/img/breaking-wave-long.png');
		game.load.image('tubby', './assets/img/tuber-obstacle-male.png');
		game.load.image('wifey', './assets/img/tuber-obstacle-female.png');
		game.load.image('ssright', './assets/img/silver-surfer-attacks-from-right.png');
		game.load.image('ssleft', './assets/img/silver-surfer-attacks-from-left.png');
		game.load.image('life', './assets/img/life-counter.png');

		//loading game animations
		game.load.spritesheet('wash', './assets/img/wave-tube-sheet.png', 137.5, 170);
		game.load.spritesheet('master', './assets/img/revised--thrilla-master-sheet.png', 64, 64);
		game.load.spritesheet('rumDrink', './assets/img/rum-sheet.png', 32, 32);
		game.load.spritesheet('collision', './assets/img/collision-sheet.png', 64, 64);
		game.load.spritesheet('button', './assets/img/button-start-spritesheet.png', 196, 70);

		//loading game sounds
		game.load.audio('theme', './assets/audio/funky-surf-music.mp3');
		game.load.audio('crash', './assets/audio/splash-noise.mp3');
		game.load.audio('ocean', './assets/audio/Ocean-waves.mp3');
	},

	create: function(){
		game.state.start('startMenu')
	}
	
}