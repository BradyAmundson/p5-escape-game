class Backdrop {
  constructor(image, size, speed) {
    this.spriteImage = image
    this.x = 0
    this.y = -image.height / 1.4
    this.spriteSize = size
    this.speed = speed
  }

  scrollSprite() {
    image(this.spriteImage, this.x, this.y, this.spriteSize, this.spriteSize)
    image(this.spriteImage, this.x + this.spriteSize, this.y, this.spriteSize, this.spriteSize)
    this.x -= this.speed
    if (this.x < -this.spriteSize) {
      this.x = 0
    }
  }
}