function addBackground()
{
	add([sprite('bg-beige'), layer('bg')])
}

function getLevelConfiguration()
{
	return {
		height: SIZE,
		width: SIZE,
		
		//' ': [sprite('bg-beige')],
		e: [sprite('dock-brown')],
		
		b: [sprite('boulder-brown'), solid(), 'wall'],
		d: [sprite('boulder-green'), solid(), 'wall'],
		r: [sprite('statue-brown'), solid(), 'wall'],
		t: [sprite('tree-brown'), solid(), 'wall'],
		u: [sprite('tree-green'), solid(), 'wall'],
		w: [sprite('wall-brown'), solid(), 'wall'],
		x: [sprite('wall-green'), solid(), 'wall'],
		a: [sprite('water'), solid(), 'wall'],
		
		c: [sprite('cave'), solid(), 'door'],
		s: [sprite('stairs'), solid(), 'door'],
		'^': [sprite('bg-black'), 'screen-up'],
		'v': [sprite('bg-black'), 'screen-down'],
		'<': [sprite('bg-black'), 'screen-left'],
		'>': [sprite('bg-black'), 'screen-right'],
		
		o: [sprite('octorok'), 'dangerous', 'octorok', { dir: -1, timer: 0 }],
		l: [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous']
	}
}

function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function loadSounds(root)
{
	loadRoot(root)
	
	loadSound('music', 'overworld.mp3')
	loadSound('attack', 'LOZ_Sword_Slash.wav')
}

function loadSprites(root)
{
	loadRoot(root)

	loadSprite('bg-beige', 'bg-beige.png')
	loadSprite('bg-black', 'bg-black.png')
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
}

function manageKeys(player)
{
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
		attack(player.pos.add(player.dir.scale(SIZE)))
	})

	function attack(p, time = 0.2) {
		var swordSprite
		
		if (player.dir.x == 0 && player.dir.y == 1) {
			swordSprite = 'sword-down'
		}
		
		else if (player.dir.x == -1) {
			swordSprite = 'sword-left'
		}
		
		else if (player.dir.x == 1) {
			swordSprite = 'sword-right'
		}
		
		else {
			swordSprite = 'sword-up'
		}
		
		const swordObject = add([sprite(swordSprite), pos(p), 'kaboom'])
		const attack = play('attack')
		
		wait(time, () => {
			destroy(swordObject)
		})
	}
}

function playMusic(id = 'music')
{
	if (music == null)
	{
		music = play(id)
		music.loop()
	}
}
