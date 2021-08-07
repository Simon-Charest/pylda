// Speeds
const MOVE_SPEED = 250
const SLICER_SPEED = 200
const OCTOROK_SPEED = 120
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

loadSprite('bg-beige', 'bg-beige.png')
loadSprite('bg-grey', 'bg-grey.png')
loadSprite('dock-brown', 'dock-brown.png')
loadSprite('dock-green', 'dock-green.png')
loadSprite('ladder', 'ladder.png')
loadSprite('sand', 'sand.png')

loadSprite('boulder-brown', 'boulder-brown.png')
loadSprite('boulder-green', 'boulder-green.png')
loadSprite('statue-brown', 'statue-brown.png')
loadSprite('statue-green', 'statue-green.png')
loadSprite('statue-white', 'statue-white.png')
loadSprite('tomb', 'tomb.png')
loadSprite('tree-brown', 'tree-brown.png')
loadSprite('tree-green', 'tree-green.png')
loadSprite('tree-white', 'tree-white.png')
loadSprite('wall-brown', 'wall-brown.png')
loadSprite('wall-green', 'wall-green.png')
loadSprite('wall-white', 'wall-white.png')
loadSprite('water', 'water.png')
loadSprite('waterfall', 'waterfall.png')

loadSprite('cave', 'cave.png')
loadSprite('stairs', 'stairs.png')

loadSprite('link-u1', 'link-u1.png')
loadSprite('link-u2', 'link-u2.png')

/*
loadSprite('link-d', 'link-d.png', {
	sliceX: 2,
	sliceY: 1,
	anims: {
		idle: { from 1:, to: 1 },
		run: { from 1:, to: 2 }
	}
})
*/

loadSprite('link-d1', 'link-d1.png')
loadSprite('link-d2', 'link-d2.png')
loadSprite('link-l1', 'link-l1.png')
loadSprite('link-l2', 'link-l2.png')
loadSprite('link-r1', 'link-r1.png')
loadSprite('link-r2', 'link-r2.png')

loadSprite('sword-up', 'sword-u.png')
loadSprite('sword-down', 'sword-d.png')
loadSprite('sword-left', 'sword-l.png')
loadSprite('sword-right', 'sword-r.png')

loadSprite('octorok', 'octorok-d1.png')
loadSprite('octorok-up', 'octorok-u1.png')
loadSprite('octorok-down', 'octorok-d1.png')
loadSprite('octorok-left', 'octorok-l1.png')
loadSprite('octorok-right', 'octorok-r1.png')
loadSprite('slicer', 'sword-u.png')

loadSound('music', 'overworld.mp3');
loadSound('attack', 'LOZ_Sword_Slash.wav');

scene('game', ({ y_screen, x_screen, rupee }) => {
	const music = play('music');
	music.loop();

	layers(['bg', 'obj', 'ui'], 'obj')

	const levelCfg = {
		width: 48,
		height: 48,
		
		b: [sprite('boulder-brown'), solid(), 'wall'],
		t: [sprite('tree-brown'), solid(), 'wall'],
		u: [sprite('tree-green'), solid(), 'wall'],
		w: [sprite('wall-brown'), solid(), 'wall'],
		x: [sprite('wall-green'), solid(), 'wall'],
		
		c: [sprite('cave'), solid(), 'door'],
		'^': [sprite('bg-beige'), 'screen-up'],
		'v': [sprite('bg-beige'), 'screen-down'],
		'<': [sprite('bg-beige'), 'screen-left'],
		'>': [sprite('bg-beige'), 'screen-right'],
		
		o: [sprite('octorok'), 'dangerous', 'octorok', { dir: -1, timer: 0 }],
		s: [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous']
	}
	
	addLevel(maps[y_screen][x_screen], levelCfg)

	add([sprite('bg-beige'), layer('bg')])

	const rupeeLabel = add([
		text('Rupees: ' + rupee),
		pos(25, 575),
		layer('ui'),
		{
			value: rupee
		},
		scale(2)
	])

	add(
		[text('Screen: y=' + y_screen + ',x=' + x_screen + ''), pos(25, 550), scale(2)]
	)

	const player = add([
		sprite('link-u1'),
		/*
		sprite('link-u1' {
			animSpeed: 0.1,
			frame: 300
		},
		*/
		pos(360, 240),
		{
			dir: vec2(0, -1)
		},
		scale(1)
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
	
	keyDown(['up', 'w'], () => {
		player.changeSprite('link-u1')
		player.move(0, -MOVE_SPEED)
		player.dir = vec2(0, -1)
	})

	keyDown(['down', 's'], () => {
		player.changeSprite('link-d1')
		player.move(0, MOVE_SPEED)
		player.dir = vec2(0, 1)
	})

	keyDown(['left', 'a'], () => {
		player.changeSprite('link-l1')
		player.move(-MOVE_SPEED, 0)
		player.dir = vec2(-1, 0)
	})

	keyDown(['right', 'd'], () => {
		player.changeSprite('link-r1')
		player.move(MOVE_SPEED, 0)
		player.dir = vec2(1, 0)
	})
	
	keyPress(['space', 'f'], () => {
		attack(player.pos.add(player.dir.scale(48)))
	})

	function attack(p) {
		var sword;
		
		if (player.dir.x == 0 && player.dir.y == 1) {
			sword = 'sword-down';
		}
		
		else if (player.dir.x == -1) {
			sword = 'sword-left';
		}
		
		else if (player.dir.x == 1) {
			sword = 'sword-right';
		}
		
		else {
			sword = 'sword-up';
		}
		
		const obj = add([sprite(sword), pos(p), 'kaboom'])
		const attack = play('attack');
		
		wait(0.2, () => {
			destroy(obj)
		})
	}

	player.collides('door', (d) => {
		destroy(d)
	})

	collides('kaboom', 'octorok', (k,s) => {
		camShake(4)
		wait(1, () => {
			destroy(k)
		})
		destroy(s)
		rupeeLabel.value++
		rupeeLabel.text = 'Rupees: ' + rupeeLabel.value
	})

	action('slicer', (s) => {
		s.move(s.dir * SLICER_SPEED, 0)
	})

	collides('slicer', 'wall', (s) => {
		s.dir = -s.dir
	})

	action('octorok', (s) => {
		if (s.axis == 0) {
			s.move(s.dir * OCTOROK_SPEED, 0)
		}
		
		else {
			s.move(0, s.dir * OCTOROK_SPEED)
		}
		
		s.timer -= dt()
		
		if (s.timer <= 0) {
			s.axis = getRandomInt(0, 1)
			s.dir = -s.dir
			s.timer = rand(5)
		}
	})

	collides('octorok', 'wall', (s) => {
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

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
