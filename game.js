const ROOT_DIR = 'http://localhost/resource/'
const HEART = 3.0
const SCREEN_X = 8
const SCREEN_Y = 7
const SIZE = 48
const POS_X = 8.5 * SIZE
const POS_Y = 6 * SIZE
const SCALE_GAME = 1
const SCALE_PLAYER = 1
const SCALE_TEXT = 2
const MOVE_SPEED = 250
const OCTOROK_SPEED = 120
const SLICER_SPEED = 200
const BEIGE_COLOR = [1, 0.86, 0.66, 1]

let music = null

kaboom({
	clearColor: BEIGE_COLOR,
	debug: true,
	fullscreen: true,
	global: true,
	scale: SCALE_GAME
})

loadSounds(ROOT_DIR)
loadSprites(ROOT_DIR)

start('game',
	{
		screen_x: SCREEN_X,
		screen_y: SCREEN_Y,
		pos_x: POS_X,
		pos_y: POS_Y,
		heart: HEART,
		rupee: 0
	}
)

scene('game', (
	{
		screen_x,
		screen_y,
		pos_x,
		pos_y,
		heart,
		rupee
	}
) => {
	playMusic()
	
	layers(['bg', 'obj', 'ui'], 'obj')

	// Load level
	addLevel(overworld[screen_y][screen_x], getLevelConfiguration())

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
		text('Screen: x=' + screen_x + ', y=' + screen_y),
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
	
	player.overlaps('screen-up', () => {
		go('game', {
			heart: heart,
			rupee: rupeeLabel.value,
			screen_x: screen_x,
			screen_y: screen_y - 1,
			pos_x: player.pos.x,
			pos_y: 11 * SIZE
		})
	})
	
	player.overlaps('screen-down', () => {
		go('game', {
			heart: heart,
			rupee: rupeeLabel.value,
			screen_x: screen_x,
			screen_y: screen_y + 1,
			pos_x: player.pos.x,
			pos_y: 1 * SIZE
		})
	})
	
	player.overlaps('screen-left', () => {
		go('game', {
			heart: heart,
			rupee: rupeeLabel.value,
			screen_x: screen_x - 1,
			screen_y: screen_y,
			pos_x: 16 * SIZE,
			pos_y: player.pos.y
		})
	})
	
	player.overlaps('screen-right', () => {
		go('game', {
			heart: heart,
			rupee: rupeeLabel.value,
			screen_x: screen_x + 1,
			screen_y: screen_y,
			pos_x: 1 * SIZE,
			pos_y: player.pos.y
		})
	})
	
	manageKeys(player)

	player.collides('door', (d) => {
		destroy(d)
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
