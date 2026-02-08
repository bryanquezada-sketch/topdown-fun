import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background').setAlpha(0.5);

        const player = this.add.sprite(25, 25, 'hero');




        this.input.once('pointerdown', () => {

        });
    }
}
