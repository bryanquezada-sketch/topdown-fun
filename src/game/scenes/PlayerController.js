export default class PlayerController {
    constructor (player, speed, cursors, wasd, facing) {
        this.player = player;
        this.speed = speed;
        this.cursors = cursors;
        this.wasd = wasd;
        this.velocityX = 0;
        this.velocityY = 0;
        this.facing = facing;
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
            this.facing.set(-1, 0);
        }
        if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.velocityX += this.speed;
            this.facing.set(1, 0);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.velocityY -= this.speed;
            this.facing.set(0,-1);
        }

        if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.velocityY += this.speed;
            this.facing.set(0, 1)
        }

        const offsetDistance = 32;

        this.interactionZone.setPosition(
            this.player.x + this.facing.x * offsetDistance,
            this.player.y + this.facing.y * offsetDistance
        )

    }

    applyVelocity() {
        this.player.setVelocity(this.velocityX, this.velocityY);

        if (this.velocityX !== 0 && this.velocityY !== 0) {
            this.player.body.velocity.normalize().scale(this.speed);
        }
    }
}