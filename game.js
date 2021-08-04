// Speeds
const MOVE_SPEED = 250
const SLICER_SPEED = 200
const SKELETOR_SPEED = 120
const ROOT_DIR = 'http://localhost/resource/'
const Y_SCREEN = 7
const X_SCREEN = 7

kaboom({
	global: true,
	fullscreen: true,
	scale: 1,
	debug: true,
	clearColor: [1, 0.86, 0.66, 1]
})

// Game Logic
loadRoot(ROOT_DIR)
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

loadSprite('bg', 'bg.png')

loadSprite('boulder', 'boulder.png')
loadSprite('tree-brown', 'tree-brown.png')
loadSprite('tree-green', 'tree-green.png')
loadSprite('wall-brown', 'wall-brown.png')
loadSprite('wall-green', 'wall-green.png')

loadSprite('cave', 'cave.png')

loadSprite('sword-up', 'sword-u.png')
loadSprite('sword-down', 'sword-d.png')
loadSprite('sword-left', 'sword-l.png')
loadSprite('sword-right', 'sword-r.png')

loadSprite('octorok', 'octorok-d1.png')
loadSprite('skeletor', 'sword-u.png')
loadSprite('slicer', 'sword-u.png')

loadSound('music', 'overworld.mp3');
loadSound('attack', 'LOZ_Sword_Slash.wav');

scene('game', ({ y_screen, x_screen, rupee }) => {
	const music = play('music');
	music.loop();

	layers(['bg', 'obj', 'ui'], 'obj')

	const maps = [
		[ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ],
		[ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ],
		[ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ],
		[ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ],
		[ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ],
		[ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ],
		[ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ],
		[ [], [], [], [], [], [], [],
		[
			'xxxxxxx^^xxxxxxx',
			'xxxxcx   xxxxxxx',
			'xxx      xxxxxxx',
			'xx       xxxxxxx',
			'x         xxxxxx',
			'<              >',
			'x             xx',
			'xx            xx',
			'xx            xx',
			'xxxxxxxxxxxxxxxx',
			'xxxxxxxxxxxxxxxx'
		],
		[
			'xxu^u^u^^u^u^u^u',
			'xxu u u  u u u u',
			'xx             >',
			'x     u  u u u >',
			'x u uo    o    >',
			'<     u  u u u >',
			'x u co    o    >',
			'x     u  u u u >',
			'xx             >',
			'xxuuuuuuuuuuuuuu',
			'xxuuuuuuuuuuuuuu'
		],
		[
			'xxu^u^u^^u^u^u^u',
			'xxu u u  u u u u',
			'xx             >',
			'x     u  u u u >',
			'x u uo    o    >',
			'<     u  u u u >',
			'x u co    o    >',
			'x     u  u u u >',
			'xx             >',
			'xxuuuuuuuuuuuuuu',
			'xxuuuuuuuuuuuuuu'
		],
		, [], [], [], [], [], [] ]
	]

	const levelCfg = {
		width: 48,
		height: 48,
		c: [sprite('cave'), solid(), 'door'],
		o: [sprite('octorok'), 'dangerous', 'skeletor', { dir: -1, timer: 0 }],
		
		b: [sprite('boulder'), solid(), 'wall'],
		t: [sprite('tree-brown'), solid(), 'wall'],
		u: [sprite('tree-green'), solid(), 'wall'],
		w: [sprite('wall-brown'), solid(), 'wall'],
		x: [sprite('wall-green'), solid(), 'wall'],
		
		'^': [sprite('bg'), 'screen-up'],
		'v': [sprite('bg'), 'screen-down'],
		'<': [sprite('bg'), 'screen-left'],
		'>': [sprite('bg'), 'screen-right'],
		
		'*': [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous'],
		'}': [sprite('skeletor'), 'dangerous', 'skeletor', { dir: -1, timer: 0 }],
	}
	
	addLevel(maps[y_screen][x_screen], levelCfg)

	add([sprite('bg'), layer('bg')])

	const rupeeLabel = add([
		text('0'),
		pos(400, 450),
		layer('ui'),
		{
			value: rupee
		},
		scale(2)
	])

	add([text('screen ' + y_screen + ', ' + x_screen), pos(400, 465), scale(2)])

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
	
	player.overlaps('screen-up', () => {
		go('game', {
			y_screen: y_screen - 1,
			x_screen: x_screen,
			rupee: rupeeLabel.value,
		})
	})
	
	player.overlaps('screen-down', () => {
		go('game', {
			y_screen: y_screen + 1,
			x_screen: x_screen,
			rupee: rupeeLabel.value,
		})
	})
	
	player.overlaps('screen-left', () => {
		go('game', {
			y_screen: y_screen,
			x_screen: x_screen - 1,
			rupee: rupeeLabel.value,
		})
	})
	
	player.overlaps('screen-right', () => {
		go('game', {
			y_screen: y_screen,
			x_screen: x_screen + 1,
			rupee: rupeeLabel.value,
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
		const attack = play('attack');
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
		rupeeLabel.value++
		rupeeLabel.text = rupeeLabel.value
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
		go('lose', { rupee: rupeeLabel.value })
	})
})

scene('lose', ({ rupee }) => {
	add([text(rupee, 32), origin('center'), pos(width() / 2, height() / 2)])
})

start('game', { x_screen: X_SCREEN, y_screen: Y_SCREEN, rupee: 0 })
