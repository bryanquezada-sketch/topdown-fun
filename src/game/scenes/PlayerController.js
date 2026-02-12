export default class PlayerController {
    constructor (player, speed, cursors, wasd) {
        this.player = player;
        this.speed = speed;
        this.cursors = cursors;
        this.wasd = wasd;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    update ()
    {
        this.resetVelocity();
        this.handleInput();
        this.applyVelocity();

    }

    resetVelocity() {
        this.velocityX = 0;
        this.velocityY = 0;
    }

    handleInput () {
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.velocityX -= this.speed;
        }
        if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.velocityX += this.speed;
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.velocityY -= this.speed;
        }

        if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.velocityY += this.speed;
        }

    }

    applyVelocity() {
        this.player.setVelocity(this.velocityX, this.velocityY);

        if (this.velocityX !== 0 && this.velocityY !== 0) {
            this.player.body.velocity.normalize().scale(this.speed);
        }
    }
}