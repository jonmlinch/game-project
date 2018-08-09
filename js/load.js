function load(){
	function preload(){
		console.log('preload');
		
		//loading game images
		game.load.image('sunset', './assets/img/sunset-background.jpg'); //sunset background
		game.load.image('horizon', './assets/img/flat-water-section.png'); //water horizon
		game.load.image('wave', './assets/img/breaking-wave-long.png'); //wave back
		game.load.image('tubby', './assets/img/tuber-obstacle-male.png'); //Tubby tuber obstacle
		game.load.image('wifey', './assets/img/tuber-obstacle-female.png'); // Wife of Tubby
		game.load.image('ssright', './assets/img/silver-surfer-attacks-from-right.png'); //silver surfer attacks
		game.load.image('ssleft', './assets/img/silver-surfer-attacks-from-left.png'); //silver surfer from the other side
		game.load.image('life', './assets/img/life-counter.png'); //head shot for tracking lives

		//loading game animations
		game.load.spritesheet('wash', './assets/img/wave-tube-sheet.png', 137.5, 170);  //whitewash animation taking frames width: 137.5 and height: 170
		game.load.spritesheet('master', './assets/img/revised--thrilla-master-sheet.png', 64, 64); //standup animation taking frames width and height: 64
		game.load.spritesheet('rumDrink', './assets/img/rum-sheet.png', 32, 32); //rum animation to be collected for points
		game.load.spritesheet('collision', './assets/img/collision-sheet.png', 64, 64); //collision animation

		//loading game sounds
		game.load.audio('theme', './assets/audio/funky-surf-music.mp3');
		game.load.audio('crash', './assets/audio/splash-noise.mp3');
		game.load.audio('ocean', './assets/audio/Ocean-waves.mp3');
	};

	function create(){
		game.state.start('startMenu')
	}
	
}