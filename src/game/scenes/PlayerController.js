// We import Entity Controller so PlayerController class can access it
import EntityController from "./EntityController";

export default class PlayerController {
    constructor (sprite, cursors, wasd) {
        this.sprite = sprite;

        this.movement = new EntityController(sprite, 160);
        
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
        }
        if (this.cursors.right.isDown || this.wasd.right.isDown) {
            x += 1;
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            y -= 1;
        }

        if (this.cursors.down.isDown || this.wasd.down.isDown) {
            y += 1;
        }

        if (x === 0 && y === 0) {
            this.movement.stop();
        } else {
            this.facing.set(x, y).normalize();
            this.movement.setDirection(x, y);
        }

        this.movement.update();
    }
}