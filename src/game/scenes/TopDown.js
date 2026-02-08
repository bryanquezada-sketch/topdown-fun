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

        /*
        So this line of code is assigning a pre-built Phaser function to the object cursors 
        hat is assigned to the scene instance. The pre-built function createCursorKeys() 
        contains left, right, up, down, space and shift. This way we don't have to retype
        everything like we did for wasd down below.
        It's really just to help with readability.
        */
        this.cursors = this.input.keyboard.createCursorKeys();

        //We're assigning keys to the object 'wasd'. This is so that we don't have to manage 4 separate variables and for readability.
        //addKeys() triggers preventDefault(). preventDefault is a method used to stop default browser key behaviors like scrolling.
        //the keys are assigned the phasers input keyboard manager's keycodes for W, A, S and D.
        this.wasd = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

    }

    update ()
    {


    }
}

//            console.dir(e); // This shows all properties (and methods) inside an object. Replace E with object.
