import PlayerController from './PlayerController.js';
import EntityController from './EntityController.js';

export class TopDown extends Phaser.Scene
{
    constructor ()
    {
        super({ key: "TopDown" });
    }

    create ()
    {
        // --- Player creation and input ---
        this.player = this.physics.add.sprite(25, 25, 'hero');
        this.player.setScale(0.1);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // --- Player movement ---
        this.playerMovement = new EntityController(this.player, 160);
        this.playerController = new PlayerController(
            this.playerMovement,
            this.cursors,
            this.wasd
        );

        // --- NPCs ---
        this.npcs = this.physics.add.group();
        const npc = this.npcs.create(150, 150, 'boar');
        npc.setScale(2);
        npc.body.setImmovable(true);

        this.npcMovement = new EntityController(npc, 100);
    }

    update (time, delta)
    {
        this.playerController.update();
        this.playerMovement.update();
        this.npcMovement.update();
    }
}
