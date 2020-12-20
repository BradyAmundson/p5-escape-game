const NUMBER_OF_ENEMIES = 3

let backgroundMusic
let appaGroan
let aangIntro
let cabbages

let backgroundImage
let appaImage
let balloonImage
let aangImage

let backgroundSprite
let appaSprite
let balloonSprite
let aangSprite

let enemies = []
let enemyCoordinates = [{
    x: 0,
    y: 65
  },
  {
    x: 85,
    y: 178
  },
  {
    x: 156,
    y: 178
  },
  {
    x: 202,
    y: 80
  },
  {
    x: 123,
    y: 23
  },
]
let appaCoordinates = [{
    x: 0,
    y: 80
  },
  {
    x: 75,
    y: 80
  },
  {
    x: 100,
    y: 60
  },
  {
    x: 100,
    y: 25
  },
  {
    x: 50,
    y: 20
  },
  {
    x: 10,
    y: 50
  },
]

let scarecrowActivated = false
let health = document.getElementById("health")
let timer = document.getElementById("scarecrow")

function preload() {
  backgroundMusic = loadSound('backgroundMusic.mp3')
  appaGroan = loadSound('AppaGroan.mp3')
  aangIntro = loadSound('aangIntro.mp3')
  cabbages = loadSound('cabbages.mp3')
  backgroundImage = loadImage("backgroundCanyon.png")
  appaImage = loadImage("appa.png")
  balloonImage = loadImage("balloon.png")
  aangImage = loadImage("avatar-aang.png")
}

function setup() {
  masterVolume(0.1)
  backgroundMusic.loop()
  const canvas = createCanvas(1200, 800)
  canvas.parent('sketch')
  noStroke()
  backgroundMusic.play()
  constructSprites()
}

function constructSprites() {
  backgroundSprite = new Backdrop(backgroundImage, 2500, 1, [])
  appaSprite = new Sprite(width / 2, height / 2, appaImage, 100, 0.1, appaCoordinates)
  addEnemies()
}

function draw() {
  makeSprites()
  allowScarecrow()
  healthStatus()
}

function makeSprites() {
  backgroundSprite.scrollSprite()
  appaSprite.makeSprite()
  drawScarecrow()

  for (let enemy of enemies)(
    enemy.intersects(appaSprite)
  )

  for (let i = 0; i < enemies.length; i++) {
    for (let j = i + 1; j < enemies.length; j++) {
      enemies[i].intersects(enemies[j])
    }
  }
}

function addEnemies() {
  while (enemies.length < NUMBER_OF_ENEMIES) {
    enemies.push(new Sprite(random(0, width), random(0, height), balloonImage, 200, random(0.001, 0.02), enemyCoordinates))
  }
}

function drawScarecrow() {
  if (scarecrowActivated) {
    aangSprite.makeSprite()

    for (let enemy of enemies)(
      enemy.attractSprite()
    )

    if (timer.value > 180) {
      scarecrowActivated = false
    }
  } else {
    drawEnemies()
  }
}

function drawEnemies() {
  for (let enemy of enemies)(
    enemy.makeSprite()
  )
}

function allowScarecrow() {
  timer.value += 1
  if (mouseIsPressed && timer.value >= timer.max) {
    aangIntro.play()
    aangSprite = new Sprite(mouseX, mouseY, aangImage, 150, 0, [])
    scarecrowActivated = true
    timer.value = 0
  }
}

function healthStatus() {
  if (health.value === 0) {
    endGame()
  }
}

function endGame() {
  backgroundMusic.stop()
  cabbages.play()
  fill('white')
  textFont('avatar-font')
  stroke('black')
  strokeWeight(5)
  textSize(width / 8)
  textAlign(CENTER)
  text('GAME OVER', width / 2, height / 2)
  noLoop()
}