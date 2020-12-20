class Sprite {
  constructor(x, y, image, size, speed, polygonCoordinates) {
    this.spriteImage = image
    this.x = x
    this.y = y
    this.spriteSize = size
    this.speed = speed
    this.targetX = 0
    this.targetY = 0
    this.polygon = polygonCoordinates
    this.hitboxCoordinates = Array(polygonCoordinates.length).fill()
  }

  makeSprite() {
    this.targetX = mouseX - this.spriteSize / 2
    this.targetY = mouseY - this.spriteSize / 2
    this.slowFollow()
    this.updateCoordinates()
    image(this.spriteImage, this.x, this.y, this.spriteSize, this.spriteSize)
  }

  slowFollow() {
    let xDifference = this.targetX - this.x
    this.x += xDifference * this.speed
    let yDifference = this.targetY - this.y
    this.y += yDifference * this.speed
  }

  updateCoordinates() {
    for (let i = 0; i < this.polygon.length; i++) {
      this.hitboxCoordinates[i] = createVector(this.x + this.polygon[i].x, this.y + this.polygon[i].y)
    }
  }

  attractSprite() {
    this.updateCoordinates()
    this.targetX = aangSprite.x
    this.targetY = aangSprite.y
    this.slowFollow()
    image(this.spriteImage, this.x, this.y, this.spriteSize, this.spriteSize)
  }


  intersects(other) {
    if (collidePolyPoly(this.hitboxCoordinates, other.hitboxCoordinates)) {
      this.impact(other, 4)
      if (other === appaSprite) {
        if (health.value % 25 === 0) {
          appaGroan.play()
        }

        health.value -= 1
      }
    }
  }

  impact(other, magnitude) {
    if (this.x > other.x) {
      this.x += magnitude
      other.x -= magnitude
    } else {
      this.x -= magnitude
      other.x += magnitude
    }
    if (this.y > other.y) {
      this.y += magnitude
      other.y -= magnitude
    } else {
      this.y -= magnitude
      other.y += magnitude
    }
  }
}