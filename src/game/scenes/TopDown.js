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
        /*First we define the player speed, in this case 160(A Phaser standard, and I can see why, it feels
        pretty good!), we create adjustable variables to start at 0 so when the update() method loops around the
        player actually stops if he's not pressing anything, effectively a reset for both X and Y velocity.*/
        const playerSpeed = 160;
        let playerVelocityX = 0;
        let playerVelocityY = 0;

        /**This is the movement logic. Each if statement checks to see if any of the directions are pressed down
         (isDown) on the cursors or wasd objects(which we defined earlier in create()). If  either the cursors or
         the wasd keys are pressed, it sets the corresponding velocity(- to go left/up and + to go right/down) to
         the player's speed as we defined earlier as well. The specific reason to have movement logic work this
         way instead of the traditional if/else statements is so that movement keys respond more realistically
         or rather in a way that makes more sense so that if two opposite directions are pressed the player stops
         instead of letting one direction win out. The way this works mathmatically is that if one key is held
         it either adds/subtracts to the velocity, and if the opposite key is held it would do cancel out by
         appropriately adding/subtracting it to 0! Math!
         */
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

        /*This line actually sets the player's velocity to the player object in the scene instance. The
        setVelocity() is a method that...sets the velocity based on what we passed through it, in this
        case the variables we established above after they get increased or decreased*/
        this.player.setVelocity(playerVelocityX, playerVelocityY);

        /*Okay so this one is a check to see if playerVelocity on either directions is NOT 0 first. This
        is so that the following line of code doesn't try to normalize movement without first checking to
        see if both velocities are actively changing. Through Phaser's grace this would work without the
        if statement, but it also prevents Phaser from just running the code constantly throughout the
        game which allows us to re-use it later if we ever use the same movement logic for enemies so
        that it doesn't slow down the game.
        Now what the statement inside the if statement is doing is first referencing the scene instance
        of player and referencing it's physics body and referencing the velocity vector inside the
        physics body and running a pre-made method called normalize() which contains the math to
        turn the vector into a length of 1 and returns the velocity directly to the next command which
        is scale() in this case. It takes the playerSpeed and the vector length which was adjusted
        earlier and multiplies by playerSpeed. The reason to do all of this is because without it,
        the player would move faster if they went diagonal because of Pythagoras*/
        if (playerVelocityX !== 0 && playerVelocityY !== 0) {
            this.player.body.velocity.normalize().scale(playerSpeed);
        }

    }
}

//            console.dir(e); // This shows all properties (and methods) inside an object. Replace E with object.
