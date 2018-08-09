var gameOn = {
	create: function(){
		thrilla.play('popUp');
	},

	update: function(){
		console.log('update');
		//assigns initial velocity to gorilla, as set he stays in same horizontal plane but slowly moves down the wave. Will need to play with this speed
		thrilla.body.velocity.x = 0;
		thrilla.body.velocity.y = 20;

		//assigns specific key functions
		if(cursors.left.isDown){
			console.log('left is down')
			thrilla.body.velocity.x = -100;
			thrilla.animations.play('surfLeft');
		} 
		else if (cursors.right.isDown){
			console.log('right is down')
			thrilla.body.velocity.x = 100;
			thrilla.animations.play('surfRight');
		};
		if(cursors.up.isDown){
			thrilla.body.velocity.y = -100;
			if(thrilla.y <= 250){
			thrilla.y = 250
			}
		} 
		else if(cursors.down.isDown){
			thrilla.body.velocity.y = 200;
			
		};

		function wipeout(){
		console.log(thrilla.score);
		if(thrilla.score > 0){
			lessDrunk(10);
			//collide.play('bam');
		} else{
			thrilla.animations.play('wipeout');
			game.state.start('gameOver')
		}
		
	}

		function getSome(){
			if(thrilla.score < 100){
				drunkeness(10);
				rum.forEach(function(r){
					r.kill();
				});
			} else {
				console.log('you win!')
				game.state.start('winner')
			}

		}

		function dieFloatyDie(){
			tubers.forEach(function(t){ //kills tubers when they reach top of wave
				if(t.body.position.y < 300){
					t.kill();
				}
			})

			rum.forEach(function(r){ //kills rum bottles when they reach top of wave
				if(r.body.position.y < 300){
					r.kill();
				}
			})
		}

		function drunkeness(booze){
			thrilla.score += booze;
			score.text = 'You Are ' + thrilla.score.toString() + '% Drunk';
		}

		function lessDrunk(yuck){
			thrilla.score -= yuck;
			score.text = 'You Are ' + thrilla.score.toString() + '% Drunk';
		}	

		game.physics.arcade.collide(thrilla, tubers, wipeout); //causes thrilla to wipeout when he hits a tuber
		game.physics.arcade.overlap(thrilla, rum, getSome); //causes thrilla to get points when he collects rum using the getSome function
			
		dieFloatyDie(); //kills obstacles when they get to top of wave
	}

		
		
}


	