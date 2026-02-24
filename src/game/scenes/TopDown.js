export class TopDown extends Phaser.Scene
{
    constructor ()
    {
        super({ key: "TopDown" });
    }

    create ()
    {
        this.player = this.physics.add.sprite(25, 25, 'hero');
        this.player.setBodySize(320, 400);
        this.player.setScale(0.1);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.wasd = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.boar = this.physics.add.sprite(150, 150, 'boar');
        this.boar.setScale(2);
        this.boar.setBodySize(20, 15);
        this.boar.setImmovable();
        this.physics.add.collider(this.player, this.boar);

        this.canInteract = false;

        this.zone = this.add.zone(this.player.x, this.player.y, 32, 32);
        this.physics.add.existing(this.zone, true);
        
        this.physics.add.overlap(this.zone, this.boar, () => {
            this.canInteract = true;
        }, null, this);

        this.facing = new Phaser.Math.Vector2(0, 1);

    }

    update ()
    {
        const playerSpeed = 160;
        const offset = 30;
        
        let playerVelocityX = 0;
        let playerVelocityY = 0;

        
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            playerVelocityX -= playerSpeed;
            
        }
        if (this.cursors.right.isDown || this.wasd.right.isDown) {
            playerVelocityX += playerSpeed;
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            playerVelocityY -= playerSpeed;
        }

        if (this.cursors.down.isDown || this.wasd.down.isDown) {
            playerVelocityY += playerSpeed;
        }

        this.player.setVelocity(playerVelocityX, playerVelocityY);

        if (playerVelocityX !== 0 || playerVelocityY !== 0) {
            this.player.body.velocity.normalize().scale(playerSpeed);
            this.facing.set(playerVelocityX, playerVelocityY).normalize();
        }

        this.zone.x = this.player.x + (this.facing.x * offset);
        this.zone.y = this.player.y + (this.facing.y * offset);   


        this.zone.body.updateFromGameObject();

        if (this.canInteract && Phaser.Input.Keyboard.JustDown(this.eKey)) {
            console.log('OINK OINK')
        }
        
        this.canInteract = false;

    }
}

//            console.dir(e); // This shows all properties (and methods) inside an object. Replace E with object.