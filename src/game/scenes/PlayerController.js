//  INPUT & STATE HANDLING - Bridge between the user and Game World
//  Sole Concern is is translating RAW hardware input into abstract directional data

import { Actions } from "phaser";

export default class PlayerController {
    constructor ( {movement, interaction, actions} ) {
        this.movement = movement;
        this.interaction = interaction;
        this.actions = actions;

        this.facing = new Phaser.Math.Vector2(0,1);
    }

    update ()
    {
        let x = 0;
        let y = 0;

        if (this.actions.left.isDown || this.actions.altLeft.isDown) {
            x -= 1;
        }
        if (this.actions.right.isDown || this.actions.altRight.isDown) {
            x += 1;
        }

        if (this.actions.up.isDown || this.actions.altUp.isDown) {
            y -= 1;
        }

        if (this.actions.down.isDown || this.actions.altDown.isDown) {
            y += 1;
        }

        if (x === 0 && y === 0) {
            this.movement.stop();
        } else {
            this.facing.set(x, y).normalize();
            this.movement.setDirection(x, y);
        }

        this.interaction.updateZone(this.facing.x, this.facing.y);
        this.movement.update();

    }
}