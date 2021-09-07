const ROOT_DIR = 'http://localhost/resource/'
const AUDIO_DIR = ROOT_DIR + 'audio/'
const ENEMY_DIR = ROOT_DIR + 'enemy/'
const PLAYER_DIR = ROOT_DIR + 'player/'
const DOOR_DIR = ROOT_DIR + 'door/'
const TILE_DIR = ROOT_DIR + 'tile/'
const WALL_DIR = ROOT_DIR + 'wall/'
const MAP_X = 7
const MAP_Y = 7
const MAP_Z = 0
const SIZE = 48
const POS_X_CENTER = SIZE * 8.5
const POS_Y_CENTER = SIZE * 6
const POS_Y_BOTTOM = SIZE * 11
const HEART = 3.0
const RUPEE = 0
const SCALE_GAME = 1
const SCALE_PLAYER = 1
const SCALE_TEXT = 2
const MOVE_SPEED = 250
const OCTOROK_SPEED = 120
const BLADE_TRAP_SPEED = 200
const BEIGE_COLOR = [1, 0.86, 0.66, 1]
const BLACK_COLOR = [0, 0, 0, 1]

let music = null

// Initialize kaboom context
kaboom({
	clearColor: BEIGE_COLOR,	// Background color
	crisp: true,
	debug: true,				// Debug mode (F1 to inspect, F8 to pause, F7 F9 to manipulate time, F10 to skip frame)
	fullscreen: true,
	global: true,				// Import every kaboom function into global namespace
	scale: SCALE_GAME			// Pixel scale
})

// Load assets from url
loadAudio(AUDIO_DIR)
loadEnemy(ENEMY_DIR)
loadPlayer(PLAYER_DIR)
loadDoor(DOOR_DIR)
loadTile(TILE_DIR)
loadWall(WALL_DIR)

// Force start new game
//deleteGame()

// Defining a scene
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
	// Define layers and the default layer
	layers(['bg', 'obj', 'ui'], 'obj')
	
	// Play music
	playMusic()

	// Load level
	addLevel(maps[map_z][map_y][map_x], getLevelConfiguration())

	// Background
	addBackground()
	
	// Create player: each game object is composed from a list of components
	const player = add([
		sprite('link-u1'),
		pos(pos_x, pos_y),
		{ dir: vec2(0, -1) },
		scale(SCALE_PLAYER),
		'killable'
	])
	
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

	player.action(() => { player.resolve() })
	
	player.collides('screen-up', () => {
		let game = {
			heart: heart,
			rupee: rupeeLabel.value,
			map_x: map_x,
			map_y: map_y - 1,
			map_z: map_z,
			pos_x: player.pos.x,
			pos_y: SIZE * 11 - 1
		}
		
		saveGame(game)
		
		go('game', game)
	})
	
	player.collides('screen-down', () => {
		let game = {
			heart: heart,
			rupee: rupeeLabel.value,
			map_x: map_x,
			map_y: map_y + 1,
			map_z: map_z,
			pos_x: player.pos.x,
			pos_y: SIZE * 1 + 1
		}
		
		saveGame(game)
		
		go('game', game)
	})
	
	player.collides('screen-left', () => {
		let game = {
			heart: heart,
			rupee: rupeeLabel.value,
			map_x: map_x - 1,
			map_y: map_y,
			map_z: map_z,
			pos_x: SIZE * 16 - 1,
			pos_y: player.pos.y
		}
		
		saveGame(game)
		
		go('game', game)
	})
	
	player.collides('screen-right', () => {
		let game = {
			heart: heart,
			rupee: rupeeLabel.value,
			map_x: map_x + 1,
			map_y: map_y,
			map_z: map_z,
			pos_x: SIZE * 1 + 1,
			pos_y: player.pos.y
		}
		
		saveGame(game)
		
		go('game', game)
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

	action('blade_trap', (s) => {
		s.move(s.dir * BLADE_TRAP_SPEED, 0)
	})

	collides('blade_trap', 'wall', (s) => {
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

let game = loadGame()

if (!game) {
	game = loadNewGame()
}

start('game',
	{
		map_x: game.map_x,
		map_y: game.map_y,
		map_z: game.map_z,
		pos_x: game.pos_x,
		pos_y: game.pos_y,
		heart: game.heart,
		rupee: game.rupee
	}
)
