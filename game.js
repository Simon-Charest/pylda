// Speeds
const MOVE_SPEED = 250
const SLICER_SPEED = 200
const SKELETOR_SPEED = 120

kaboom({
	global: true,
	fullscreen: true,
	scale: 1,
	debug: true,
	clearColor: [1, 0.86, 0.66, 1]
})

// Game Logic
loadRoot('http://localhost/resource/')
loadSprite('link-up', 'link-u1.png')
loadSprite('link-down', 'link-d1.png')
loadSprite('link-left', 'link-l1.png')
loadSprite('link-right', 'link-r1.png')

/*
loadSprite('link-down', 'link-down.png', {
	sliceX: 2,
	sliceY: 1,
	anims: {
		run: {
			from: 0,
			to: 1,
		}
	},
});
*/

loadSprite('cave', 'cave.png')
loadSprite('octorok', 'octorok-d1.png')
loadSprite('sword-up', 'sword-u.png')
loadSprite('sword-down', 'sword-d.png')
loadSprite('sword-left', 'sword-l.png')
loadSprite('sword-right', 'sword-r.png')
loadSprite('tree', 'tree.png')
loadSprite('wall', 'wall.png')

loadSprite('left-wall', 'tree.png')
loadSprite('top-wall', 'tree.png')
loadSprite('bottom-wall', 'tree.png')
loadSprite('right-wall', 'tree.png')
loadSprite('bottom-left-wall', 'tree.png')
loadSprite('bottom-right-wall', 'tree.png')
loadSprite('top-left-wall', 'tree.png')
loadSprite('top-right-wall', 'tree.png')

loadSprite('top-door', 'wall.png')
loadSprite('fire-pot', 'wall.png')
loadSprite('left-door', 'wall.png')
loadSprite('lanterns', 'wall.png')
loadSprite('slicer', 'wall.png')
loadSprite('skeletor', 'wall.png')
loadSprite('kaboom', 'wall.png')
loadSprite('stairs', 'wall.png')

loadSprite('bg', 'bg.png')

loadSound("music", "overworld.mp3");
loadSound("attack", "LOZ_Sword_Slash.wav");

scene('game', ({ level, score }) => {
	const music = play("music");
	music.loop();

	layers(['bg', 'obj', 'ui'], 'obj')

	const maps = [
		[
			'wwwwwww  wwwwwww',
			'wwwwcw   wwwwwww',
			'www      wwwwwww',
			'ww       wwwwwww',
			'w         wwwwww',
			'                ',
			'w             ww',
			'ww o          ww',
			'ww            ww',
			'wwwwwwwwwwwwwwww',
			'wwwwwwwwwwwwwwww'
		],
		[
			'ttttttt  ttttttt',
			'ttttct   ttttttt',
			'ttt      ttttttt',
			'tt       ttttttt',
			't         tttttt',
			'                ',
			't             tt',
			'tt            tt',
			'tt            tt',
			'tttttttttttttttt',
			'tttttttttttttttt'
		],
		[
			'ycc)cc^ccw',
			'a        b',
			'a      * b',
			'a    (   b',
			'%        b',
			'a    (   b',
			'a   *    b',
			'a        b',
			'xdd)dd)ddz'
		],
		[
			'yccccccccw',
			'a        b',
			')        )',
			'a        b',
			'a        b',
			'a    $   b',
			')   }    )',
			'a        b',
			'xddddddddz'
		]
	]

	const levelCfg = {
		width: 48,
		height: 48,
		a: [sprite('left-wall'), solid(), 'wall'],
		b: [sprite('right-wall'), solid(), 'wall'],
		c: [sprite('cave'), solid(), 'door'],
		//c: [sprite('top-wall'), solid(), 'wall'],
		d: [sprite('bottom-wall'), solid(), 'wall'],
		o: [sprite('octorok'), 'dangerous', 'skeletor', { dir: -1, timer: 0 }],
		t: [sprite('tree'), solid(), 'wall'],
		w: [sprite('wall'), solid(), 'wall'],
		//w: [sprite('top-right-wall'), solid(), 'wall'],
		x: [sprite('bottom-left-wall'), solid(), 'wall'],
		y: [sprite('top-left-wall'), solid(), 'wall'],
		z: [sprite('bottom-right-wall'), solid(), 'wall'],
		'%': [sprite('left-door'), solid(), 'door'],
		'^': [sprite('top-door'), 'next-level'],
		$: [sprite('stairs'), 'next-level'],
		'*': [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous'],
		'}': [sprite('skeletor'), 'dangerous', 'skeletor', { dir: -1, timer: 0 }],
		')': [sprite('lanterns'), solid()],
		'(': [sprite('fire-pot'), solid()],
	}
	
	addLevel(maps[level], levelCfg)

	add([sprite('bg'), layer('bg')])

	const scoreLabel = add([
		text('0'),
		pos(400, 450),
		layer('ui'),
		{
			value: score
		},
		scale(2)
	])

	add([text('level ' + parseInt(level + 1)), pos(400, 465), scale(2)])

	const player = add([
		sprite('link-up'),
		pos(360, 240),
		{
			dir: vec2(1, 0)
		},
	])

	player.action(() => {
		player.resolve()
	})

	player.overlaps('next-level', () => {
		go('game', {
			level: (level + 1) % maps.length,
			score: scoreLabel.value,
		})
	})

	keyDown(['left', 'a'], () => {
		player.changeSprite('link-left')
		player.move(-MOVE_SPEED, 0)
		player.dir = vec2(-1, 0)
	})

	keyDown(['right', 'd'], () => {
		player.changeSprite('link-right')
		player.move(MOVE_SPEED, 0)
		player.dir = vec2(1, 0)
	})

	keyDown(['up', 'w'], () => {
		player.changeSprite('link-up')
		player.move(0, -MOVE_SPEED)
		player.dir = vec2(0, -1)
	})

	keyDown(['down', 's'], () => {
		player.changeSprite('link-down')
		player.move(0, MOVE_SPEED)
		player.dir = vec2(0, 1)
	})

	function attack(p) {
		var sword;
		
		if (player.dir.x == 0) {
			if (player.dir.y == -1) {
				sword = 'sword-up';
			}
			
			else if (player.dir.y == 1) {
				sword = 'sword-down';
			}
		}
		
		else if (player.dir.x == -1) {
			sword = 'sword-left';
		}
		
		else {
			sword = 'sword-right';
		}
		
		const obj = add([sprite(sword), pos(p), 'kaboom'])
		const attack = play("attack");
		wait(0.2, () => {
			destroy(obj)
		})
	}

	keyPress(['space', 'f'], () => {
		attack(player.pos.add(player.dir.scale(48)))
	})

	player.collides('door', (d) => {
		destroy(d)
	})

	collides('kaboom', 'skeletor', (k,s) => {
		camShake(4)
		wait(1, () => {
			destroy(k)
		})
		destroy(s)
		scoreLabel.value++
		scoreLabel.text = scoreLabel.value
	})

	action('slicer', (s) => {
		s.move(s.dir * SLICER_SPEED, 0)
	})

	collides('slicer', 'wall', (s) => {
		s.dir = -s.dir
	})

	action('skeletor', (s) => {
		s.move(0, s.dir * SKELETOR_SPEED)
		s.timer -= dt()
		
		if (s.timer <= 0) {
			s.dir = -s.dir
			s.timer = rand(5)
		}
	})

	collides('skeletor', 'wall', (s) => {
		s.dir = -s.dir
	})

	player.overlaps('dangerous', () => {
		go('lose', { score: scoreLabel.value })
	})
})

scene('lose', ({ score }) => {
	add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
})

start('game', { level: 0, score: 0 })
