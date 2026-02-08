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

        
    }

    update ()
    {
        this.input.keyboard.on('keydown', (e) => {
            console.log(`${e.key} was pressed!`)
            if (e.code === 'KeyW' || e.code === 'ArrowUp') {
                this.player.setVelocityY(-20);
            }
            if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
                this.player.setVelocityX(-20);
            }
            if (e.code === 'KeyS' || e.code === 'ArrowDown') {
                this.player.setVelocityY(+20);
            }
            if (e.code === 'KeyD' || e.code === 'ArrowRight') {
                this.player.setVelocityX(+20);
            }
        });
    }
}

//            console.dir(e); // This shows all properties (and methods) inside an object. Replace E with object.