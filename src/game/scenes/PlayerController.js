import EntityController from "./EntityController";

//  INPUT & STATE HANDLING - Bridge between the user and Game World
//  Sole Concern is is translating RAW hardware input into abstract directional data

export default class PlayerController {
    constructor (movement, cursors, wasd, interactionZone) {

        this.movement = movement;
        
        this.cursors = cursors;

        this.wasd = wasd;

        this.facing = new Phaser.Math.Vector2(0,1);

        this.interactionZone = interactionZone;
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
            console.log(this.facing instanceof Phaser.Math.Vector2);
            this.facing.set(x, y).normalize();
            this.movement.setDirection(x, y);
        }

    // --- ZONE ---

        const offset = 30;

        this.interactionZone.x = this.movement.entity.x + (this.facing.x * offset);
        this.interactionZone.y = this.movement.entity.y + (this.facing.y * offset);

        this.movement.update();
    }
}