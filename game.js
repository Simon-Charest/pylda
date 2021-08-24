const ROOT_DIR = 'http://localhost/resource/'
const MAP_X = 7
const MAP_Y = 7
const MAP_Z = 0
const SIZE = 48
const POS_X_CENTER = 8.5 * SIZE
const POS_Y_CENTER = 6 * SIZE
const POS_Y_BOTTOM = 11 * SIZE
const HEART = 3.0
const RUPEE = 0
const SCALE_GAME = 1
const SCALE_PLAYER = 1
const SCALE_TEXT = 2
const MOVE_SPEED = 250
const OCTOROK_SPEED = 120
const SLICER_SPEED = 200
const BEIGE_COLOR = [1, 0.86, 0.66, 1]
const BLACK_COLOR = [0, 0, 0, 1]

let music = null

kaboom({
	clearColor: BEIGE_COLOR,
	crisp: true,
	debug: true,
	fullscreen: true,
	global: true,
	scale: SCALE_GAME
})

loadSounds(ROOT_DIR)
loadSprites(ROOT_DIR)

start('game',
	{
		map_x: MAP_X,
		map_y: MAP_Y,
		map_z: MAP_Z,
		pos_x: POS_X_CENTER,
		pos_y: POS_Y_CENTER,
		heart: HEART,
		rupee: RUPEE
	}
)

scene('game', (
	{
		map_x,
		map_y,
		map_z,
		pos_x,
		pos_y,
		heart,
		rupee
	}
) => {
	playMusic()
	
	layers(['bg', 'obj', 'ui'], 'obj')

	// Load level
	addLevel(maps[map_z][map_y][map_x], getLevelConfiguration())

	addBackground()
	
	// Display scoreboard
	
	const rupeeLabel = add([
		text('Hearts: ' + heart.toFixed(1) + ' | Rupees: ' + rupee),
		pos(SIZE, 12.1 * SIZE),
		layer('ui'),
		{ value: rupee },
		scale(SCALE_TEXT)
	])
	
	add([
		text('Map: x=' + map_x + ', y=' + map_y + ', z=' + map_z),
		pos(SIZE, 12.6 * SIZE),
		scale(SCALE_TEXT)
	])

	// Create player
	const player = add([
		sprite('link-u1'),
		pos(pos_x, pos_y),
		{ dir: vec2(0, -1) },
		scale(SCALE_PLAYER),
		'killable'
	])

	player.action(() => { player.resolve() })
	
	player.collides('screen-up', () => {
		go('game', {
			heart: heart,
			rupee: rupeeLabel.value,
			map_x: map_x,
			map_y: map_y - 1,
			map_z: map_z,
			pos_x: player.pos.x,
			pos_y: 11 * SIZE
		})
	})
	
	player.collides('screen-down', () => {
		go('game', {
			heart: heart,
			rupee: rupeeLabel.value,
			map_x: map_x,
			map_y: map_y + 1,
			map_z: map_z,
			pos_x: player.pos.x,
			pos_y: 1 * SIZE
		})
	})
	
	player.collides('screen-left', () => {
		go('game', {
			heart: heart,
			rupee: rupeeLabel.value,
			map_x: map_x - 1,
			map_y: map_y,
			map_z: map_z,
			pos_x: 16 * SIZE,
			pos_y: player.pos.y
		})
	})
	
	player.collides('screen-right', () => {
		go('game', {
			heart: heart,
			rupee: rupeeLabel.value,
			map_x: map_x + 1,
			map_y: map_y,
			map_z: map_z,
			pos_x: 1 * SIZE,
			pos_y: player.pos.y
		})
	})
	
	manageKeys(player)
	
	// Door management

	player.collides('door', (d) => {
		// Sword cave entrance
		if (map_x == 7 && map_y == 7 && map_z == 0)
		{
			go('game', {
				heart: heart,
				rupee: rupeeLabel.value,
				map_x: 0,
				map_y: 0,
				map_z: 2,
				pos_x: POS_X_CENTER,
				pos_y: POS_Y_BOTTOM
			})
		}
		
		// Sword cave exit
		else if (map_x == 0 && map_y == 0 && map_z == 2)
		{
			// TODO: Fix this
			go('game', {
				heart: heart,
				rupee: rupeeLabel.value,
				map_x: 7,
				map_y: 7,
				map_z: 0,
				pos_x: 5,
				pos_y: 3
			})
		}
		
		// First dungeon entrance
		else if (map_x == 7 && map_y == 3 && map_z == 0)
		{
			go('game', {
				heart: heart,
				rupee: rupeeLabel.value,
				map_x: 3,
				map_y: 7,
				map_z: 1,
				pos_x: POS_X_CENTER,
				pos_y: POS_Y_BOTTOM
			})
		}
	})

	collides('kaboom', 'octorok', (k,s) => {
		camShake(4)
		wait(1, () => { destroy(k) })
		destroy(s)
		rupeeLabel.value ++
		rupeeLabel.text = 'Hearts: ' + heart.toFixed(1) + ' | Rupees: ' + rupeeLabel.value
	})

	action('slicer', (s) => {
		s.move(s.dir * SLICER_SPEED, 0)
	})

	collides('slicer', 'wall', (s) => {
		s.dir = -s.dir
	})

	// TODO: Fix monsters' collision detection
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

	player.overlaps('dangerous', (d) => {
		if (player.is('killable')) {
			// TODO: Bump and set invincible for 2 seconds
			destroy(d)
			
			heart -= 0.5
			rupeeLabel.text = 'Hearts: ' + heart.toFixed(1) + ' | Rupees: ' + rupeeLabel.value
		}
		
		if (heart <= 0) {
			go('lose', { rupee: rupeeLabel.value })
		}
	})
})

scene('lose', ({ rupee }) => {
	add([
		text(rupee, 32),
		origin('center'),
		pos(width() / 2, height() / 2)
	])
})
