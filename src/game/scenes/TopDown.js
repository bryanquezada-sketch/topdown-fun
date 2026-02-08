export class TopDown extends Phaser.Scene
{
    constructor ()
    {
        super({ key: "TopDown" });
    }

    create ()
    {
        /*We are assigning the object of a sprite from the physics manager to 'player' 
        which is assigned to a class instance with the use of `this`. This is important so
        that it becomes accessible in other methods(like update()). Because we're using
        the physics manager this gives the the player a physics body which allows it to be
        affected by physics like velocity and such. The parameters set for the sprite are 
        x and y coordinate at 25 which define where the center of the sprite will be placed
        and the texture used is the preloaded 'hero' image from our preload scene. The 
        second line adjusts the size of the sprite down to 1/10th the original size as 1
        is default.*/
        this.player = this.physics.add.sprite(25, 25, 'hero');
        this.player.setScale(0.1);

        /*So this line of code is assigning a pre-built Phaser function to the object cursors 
        hat is assigned to the scene instance. The pre-built function createCursorKeys() 
        contains left, right, up, down, space and shift. This way we don't have to retype
        everything like we did for wasd down below.
        It's really just to help with readability, it's apparently standard for Phaser.*/
        this.cursors = this.input.keyboard.createCursorKeys();

        /*We're assigning keys to the object 'wasd'. This is so that we don't have to manage 
        4 separate variables and for readability. addKeys() triggers preventDefault(). 
        preventDefault is a method used to stop default browser key behaviors like scrolling.
        the keys are assigned the phasers input keyboard manager's keycodes for W, A, S and D.
        so they can now be used to reference later*/
        this.wasd = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

    }

    //Part of the Phaser Life Cycle, loops roughly 60 times/second
    update ()
    {
        /* We define player speed at 160(standard for Phaser probably because it feels just
        right). The reason for this is that it helps later on so we don't have to repeat
        ourselves twice when we set up the movement logic. I can also see it being useful
        if we ever want to have an instance where the player speed is changed like sprinting,
        jumping or moving through rough terrain. We set the player's velocity to 0 in the next
        line because we need a way to stop the player after the movement logic starts. The
        reason this works is because it's in the update() method and thus loops around as 
        one of the first things that gets checked for.*/
        const playerSpeed = 160;
        this.player.setVelocity(0);

        /* The movement logic! This is pretty straightforward, if the keys from the cursor or
        wasd objects(which we defined earlier) are being pressed down, it changes the player's
        (who we also defined earlier) velocity based on which key is being pressed by the 
        variable playerSpeed(set at 160), either adding or subtracting to it.*/
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.setVelocityY(-playerSpeed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.setVelocityY(+playerSpeed);
        };

        /*The reason you separate horizontal and veritcal movement is so that both could be
        true at the same time for diagonal movement. Up and down will never be true at the
        same time and neither will left and right. Else if is used to decide which button
        wins out if both are pressed at the same time without having a sort of flicker 
        effect for a single frame and helps with performance(even if both are negligible 
        in this instance, it's just cleaner)*/
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.setVelocityX(-playerSpeed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.setVelocityX (+playerSpeed);
        }

    }
}

//            console.dir(e); // This shows all properties (and methods) inside an object. Replace E with object.
