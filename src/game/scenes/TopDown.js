export class TopDown extends Phaser.Scene
{
    constructor ()
    {
        super({ key: "TopDown" });
    }

    create ()
    {
        const player = this.physics.add.sprite(25, 25, 'hero');
        player.setScale(0.1);

        this.input.keyboard.on('keydown', (e) => {
            console.log(`${e.key} was pressed!`)
            if (e.code === 'KeyW' || e.code === 'ArrowUp') {
                player.y -= 5;
            }
            if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
                player.x -= 5;
            }
            if (e.code === 'KeyS' || e.code === 'ArrowDown') {
                player.y += 5;
            }
            if (e.code === 'KeyD' || e.code === 'ArrowRight') {
                player.x += 5;
            }
        });
    }
}

//            console.dir(e); // This shows all properties (and methods) inside an object. Replace E with object.

/*
create() {
    // This creates an object with keys mapped to specific codes
    this.keys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });
}*/