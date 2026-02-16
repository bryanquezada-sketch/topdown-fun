export default class PlayerController {
    constructor (movementController, cursors, wasd) {
        this.movement = movementController;
        this.cursors = cursors;
        this.wasd = wasd;

        this.facing = new Phaser.Math.Vector2(0,1);
    }

    update ()
    {
        let x = 0;
        let y = 0;

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            x -= 1;
            this.facing.set(-1, 0);
        }
        if (this.cursors.right.isDown || this.wasd.right.isDown) {
            x += 1;
            this.facing.set(1, 0);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            y -= 1;
            this.facing.set(0,-1);
        }

        if (this.cursors.down.isDown || this.wasd.down.isDown) {
            y += 1;
            this.facing.set(0, 1)
        }

        if (x === 0 && y === 0) {
            this.movement.stop();
        } else {
            this.movement.setDirection(x, y);
        }
    }
}

/*3. A Small "Facing" Detail
In your PlayerController, make sure you still wrap the this.facing.set(x, y) call in a check:
javascript
if (x !== 0 || y !== 0) {
    this.facing.set(x, y).normalize();
    this.movement.setDirection(x, y);
} else {
    this.movement.stop();
}
Use code with caution.

If you don't check for x !== 0 || y !== 0 before setting the vector, and the player stops, this.facing would be set to (0, 0). By wrapping it, you preserve that last moved direction you wanted*/