function addBackground()
{
	add([sprite('bg-beige'), layer('bg')])
}

function doDebug(string = null, exit = true)
{
	if (string) {
		console.log(string)
	}
	
	if (exit) {
		throw '';
	}
}

function getLevelConfiguration()
{
	return {
		height: SIZE,
		width: SIZE,
		
		// Tiles
		e: [sprite('bg-beige')],
		f: [sprite('bg-black')],
		g: [sprite('bg-grey')],
		h: [sprite('dock-brown')],
		i: [sprite('dock-green')],
		j: [sprite('ladder')],
		k: [sprite('sand')],
		
		// Walls
		l: [sprite('boulder-brown'), solid(), 'wall'],
		m: [sprite('boulder-green'), solid(), 'wall'],
		n: [sprite('statue-brown'), solid(), 'wall'],
		o: [sprite('statue-green'), solid(), 'wall'],
		p: [sprite('statue-white'), solid(), 'wall'],
		q: [sprite('stone_statue'), solid(), 'wall'],
		r: [sprite('tomb'), solid(), 'wall'],
		s: [sprite('tree-brown'), solid(), 'wall'],
		t: [sprite('tree-green'), solid(), 'wall'],
		u: [sprite('tree-white'), solid(), 'wall'],
		v: [sprite('wall-brown'), solid(), 'wall'],
		w: [sprite('wall-green'), solid(), 'wall'],
		x: [sprite('wall-white'), solid(), 'wall'],
		y: [sprite('water'), solid(), 'wall'],
		z: [sprite('waterfall'), solid(), 'wall'],
		
		// Doors
		'!': [sprite('cave'), solid(), 'door'],
		'"': [sprite('stairs'), solid(), 'door'],
		
		// Screen overlaps
		'^': [sprite('bg-black'), solid(), 'wall', 'screen-up'],
		'_': [sprite('bg-black'), solid(), 'wall', 'screen-down'],
		'<': [sprite('bg-black'), solid(), 'wall', 'screen-left'],
		'>': [sprite('bg-black'), solid(), 'wall', 'screen-right'],
		
		// Enemies
		0: [sprite('armos'), 'armos', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		1: [sprite('blade_trap'), 'blade_trap', 'dangerous', { dir: -1 }],
		2: [sprite('boulder'), 'boulder', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		3: [sprite('bubble-blue'), 'bubble', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		4: [sprite('bubble-red'), 'bubble', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		5: [sprite('bubble-white'), 'bubble', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		6: [sprite('darknut-blue'), 'darknut', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		7: [sprite('darknut-red'), 'darknut', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		8: [sprite('gel'), 'gel', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		9: [sprite('ghini'), 'ghini', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		A: [sprite('gibdo'), 'gibdo', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		B: [sprite('goriya-blue'), 'goriya', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		C: [sprite('goriya-red'), 'goriya', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		D: [sprite('keese'), 'keese', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		E: [sprite('lanmola-blue'), 'lanmola', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		F: [sprite('lanmola-red'), 'lanmola', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		G: [sprite('leever-blue'), 'leever', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		H: [sprite('leever-red'), 'leever', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		I: [sprite('like_like'), 'like_like', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		J: [sprite('lynel-blue'), 'lynel', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		K: [sprite('lynel-red'), 'lynel', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		L: [sprite('moblin-blue'), 'moblin', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		M: [sprite('moblin-red'), 'moblin', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		N: [sprite('moldorm'), 'moldorm', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		O: [sprite('octorok-blue'), 'octorok', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		P: [sprite('octorok-red'), 'octorok', 'dangerous', { dir: -1, timer: 0, heart: 0.5 }],
		Q: [sprite('patra'), 'patra', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		R: [sprite('peahat'), 'peahat', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		S: [sprite('pols_voice'), 'pols_voice', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		T: [sprite('river_zora'), 'river_zora', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		U: [sprite('rope-blue'), 'rope', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		V: [sprite('rope-red'), 'rope', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		W: [sprite('stalfos'), 'stalfos', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		X: [sprite('tektite-blue'), 'tektite', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		Y: [sprite('tektite-red'), 'tektite', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		Z: [sprite('vire'), 'vire', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		a: [sprite('wallmaster'), 'wallmaster', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		b: [sprite('wizzrobe-blue'), 'wizzrobe', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		c: [sprite('wizzrobe-red'), 'wizzrobe', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }],
		d: [sprite('zol'), 'zol', 'dangerous', { dir: -1, timer: 0, heart: 1.0 }]
	}
}

function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function loadAudio(directory)
{
	loadRoot(directory)
	
	loadSound('music', 'overworld.mp3')
	loadSound('attack', 'LOZ_Sword_Slash.wav')
}

function loadEnemy(directory)
{
	loadRoot(directory)
	
	loadSprite('armos', 'armos.png')
	loadSprite('blade_trap', 'blade_trap.png')
	loadSprite('boulder', 'boulder.png')
	loadSprite('bubble-blue', 'bubble-blue.png')
	loadSprite('bubble-red', 'bubble-red.png')
	loadSprite('bubble-white', 'bubble-white.png')
	loadSprite('darknut-blue', 'darknut-blue.png')
	loadSprite('darknut-red', 'darknut-red.png')
	loadSprite('gel', 'gel.png')
	loadSprite('ghini', 'ghini.png')
	loadSprite('gibdo', 'gibdo.png')
	loadSprite('goriya-blue', 'goriya-blue.png')
	loadSprite('goriya-red', 'goriya-red.png')
	loadSprite('keese', 'keese.png')
	loadSprite('lanmola-blue', 'lanmola-blue.png')
	loadSprite('lanmola-red', 'lanmola-red.png')
	loadSprite('leever-blue', 'leever-blue.png')
	loadSprite('leever-red', 'leever-red.png')
	loadSprite('like_like', 'like_like.png')
	loadSprite('lynel-blue', 'lynel-blue.png')
	loadSprite('lynel-red', 'lynel-red.png')
	loadSprite('moblin-blue', 'moblin-blue.png')
	loadSprite('moblin-red', 'moblin-red.png')
	loadSprite('moldorm', 'moldorm.png')
	loadSprite('octorok-blue', 'octorok-blue.png')
	
	/*
	loadSprite('octorok-red-d1', 'octorok-red-d1.png')
	loadSprite('octorok-red-l1', 'octorok-red-l1.png')
	loadSprite('octorok-red-r1', 'octorok-red-r1.png')
	loadSprite('octorok-red-u1', 'octorok-red-u1.png')
	*/
	
	loadSprite('octorok-red', 'octorok-red.png')
	loadSprite('patra', 'patra.png')
	loadSprite('peahat', 'peahat.png')
	loadSprite('pols_voice', 'pols_voice.png')
	loadSprite('river_zora', 'river_zora.png')
	loadSprite('rope-blue', 'rope-blue.png')
	loadSprite('rope-red', 'rope-red.png')
	loadSprite('stalfos', 'stalfos.png')
	loadSprite('tektite-blue', 'tektite-blue.png')
	loadSprite('tektite-red', 'tektite-red.png')
	loadSprite('vire', 'vire.png')
	loadSprite('wallmaster', 'wallmaster.png')
	loadSprite('wizzrobe-blue', 'wizzrobe-blue.png')
	loadSprite('wizzrobe-red', 'wizzrobe-red.png')
	loadSprite('zol', 'zol.png')
}

function loadPlayer(directory)
{
	loadRoot(directory)
	
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
}

function loadDoor(directory)
{
	loadRoot(directory)

	loadSprite('cave', 'cave.png')
	loadSprite('stairs', 'stairs.png')
}

function loadTile(directory)
{
	loadRoot(directory)

	loadSprite('bg-beige', 'bg-beige.png')
	loadSprite('bg-black', 'bg-black.png')
	loadSprite('bg-grey', 'bg-grey.png')
	loadSprite('dock-brown', 'dock-brown.png')
	loadSprite('dock-green', 'dock-green.png')
	loadSprite('ladder', 'ladder.png')
	loadSprite('sand', 'sand.png')
}

function loadWall(directory)
{
	loadRoot(directory)

	loadSprite('boulder-brown', 'boulder-brown.png')
	loadSprite('boulder-green', 'boulder-green.png')
	loadSprite('statue-brown', 'statue-brown.png')
	loadSprite('statue-green', 'statue-green.png')
	loadSprite('statue-white', 'statue-white.png')
	loadSprite('stone_statue', 'stone_statue.png')
	loadSprite('tomb', 'tomb.png')
	loadSprite('tree-brown', 'tree-brown.png')
	loadSprite('tree-green', 'tree-green.png')
	loadSprite('tree-white', 'tree-white.png')
	loadSprite('wall-brown', 'wall-brown.png')
	loadSprite('wall-green', 'wall-green.png')
	loadSprite('wall-white', 'wall-white.png')
	loadSprite('water', 'water.png')
	loadSprite('waterfall', 'waterfall.png')
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
		let swordSprite
		
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
	if (music == null) {
		music = play(id)
		music.loop()
	}
}

function createGame(map_x=7, map_y=7, map_z=0, size=48, x=8.5, y=6, heart=3.0, rupee=0)
{
	return {
		map_x: map_x,
		map_y: map_y,
		map_z: map_z,
		pos_x: size * x,
		pos_y: size * y,
		heart: heart,
		rupee: rupee
	}
}

function deleteGame(value='', name='TheLegendOfZelda', expires='Thu, 01 Jan 1970 00:00:00 UTC', path='/', sameSite='None', secure='Secure')
{
	document.cookie = name + '=' + value + ';expires=' + expires + ';path=' + path + ';SameSite=' + sameSite + ';' + secure + ';' 
}

function loadGame()
{
	let value = document.cookie.split('=')[1]
	
	if (value) {
		return JSON.parse(value)
	}
	
	return null
}

function saveGame(value, name='TheLegendOfZelda', expires=2147483647, path='/', sameSite='None', secure='Secure')
{
	document.cookie = name + '=' + JSON.stringify(value) + ';expires=' + expires + ';path=' + path + ';SameSite=' + sameSite + ';' + secure + ';' 
}
