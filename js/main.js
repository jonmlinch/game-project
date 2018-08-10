var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameboard');

game.state.add('boot', bootState);
game.state.add('load', loadUp);
game.state.add('startMenu', startUp);
game.state.add('game', gameOn);
game.state.add('gameOver', loser);
game.state.add('winner', winGame);

game.state.start('boot');
