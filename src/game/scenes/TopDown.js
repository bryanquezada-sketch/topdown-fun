// These are two new classes that have to be imported 
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
        this.player = this.physics.add.sprite(25, 25, 'hero');
        this.player.setScale(0.1);

  
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.npc = this.physics.add.sprite(150, 150, 'boar');
        this.npc.setScale(2);

        // allocating memory for playerController. 
        //calls the constructor() inside PlayerController. 
        //Assigns the returned object reference to this.playerController
        //so after this line runes: this.playerController holds a reference to a brand-new collector object stored in memory.
        this.playerController = new PlayerController(this.player, 160, this.cursors, this.wasd);
        this.entityController = new EntityController(this.npc)

        this.zone = this.add.zone(this.player.x, this.player.y, 0, 0);
        this.physics.world.enable(this.zone);
        this.zone.body.setCircle(12.5, -12.5, -12.5);

    }

    update (time, delta)
    {
        this.zone.x = this.player.x;
        this.zone.y = this.player.y;

        this.playerController.update();
        this.entityController.update();
    }
}

//            console.dir(e); // This shows all properties (and methods) inside an object. Replace E with object.