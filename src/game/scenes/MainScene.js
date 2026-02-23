import PlayerController from './PlayerController.js';
import EntityController from './EntityController.js';
import InteractionController from './InteractionController.js';

// SCENE MANAGEMENT - The Orchestrator
// Handles high-level setup(preloading assets, creating game objects(Player, NPCs), and intializing physics groups.

export class MainScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: "MainScene" });
    }

    create ()
    {
        // --- Player creation and input ---
        this.player = this.physics.add.sprite(25, 25, 'hero');
        this.player.setScale(0.1);

        const keyConfig = {
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D',
            interact: 'E',
            
            altUp: 'UP',
            altDown: 'DOWN',
            altLeft: 'LEFT',
            altRight: 'RIGHT'
        }

        this.actions = this.input.keyboard.addKeys(keyConfig);

        // --- NPCs ---
        this.npcs = this.physics.add.group();
        const boar = this.npcs.create(150, 150, 'boar');
        boar.setScale(2);
        boar.body.setImmovable(true);

        boar.talk = () => {
            console.log("The boar grunts at you!");
        };

        this.npcMovement = new EntityController(boar, 100);

        // --- Player Movement ---
        this.playerMovement = new EntityController(this.player, 160);
        this.interactionController = new InteractionController(this, this.player, this.npcs);
        this.playerController = new PlayerController({
            movement: this.playerMovement,
            interaction: this.interactionController,
            actions: this.actions
        });


        // -- END OF CREATE() ---
    }
    

    update (time, delta)
    {
        this.playerController.update();
        this.npcMovement.update();
    }
}
