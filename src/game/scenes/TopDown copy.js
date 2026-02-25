export class TopDown extends Phaser.Scene
{
    constructor ()
    {
        super({ key: "TopDown" });
    }

    create ()
    {
        // #region EVERYTHING BUT DIALOGUE
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

        this.boar = this.physics.add.sprite(50, 50, 'boar');
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

        // #endregion
       
        // #region DIALOGUE

        this.conversation = 
        {
            npcText: `*Oink Oink*`,
            choices: 
            [   {
              text: `What is friend's name?`,
              nextNode: 
              {
                  npcText: `I'm Boar-d.`,
                  choices: [
                    {
                        text: `Okeh we fight now.`,
                        nextNode: 
                        {
                          npcText: ``,
                          choices: [
                              
                          ]
                        },
                        },
                  ]
              },
              },

              // ## MAIN BRANCH

              {
              text: `I want to eat you...`,
              nextNode: 
              {
                  npcText: `*Oink* I know little goblin but you cannot.`,
                  choices: [
                    {
                      text: `...but whys not?`,
                      nextNode: 
                      {
                          npcText: `Because I am larger, much larger. So you cannot. Understand?`,
                          choices: [
                              {
                                  text: `...but how will I's know if I's don't try?`,
                                  nextNode: 
                                  {
                                      npcText: `There are things in this world one just knows.`,
                                      choices: [
                                        {
                                            text: `Like hows all birds been swapped for metal flappers by the govern-inment?`,
                                            nextNode: 
                                            {
                                            npcText: `We're done here.`,
                                            choices: []
                                            },
                                          },
                                      ]
                                  },
                                  },
                            ]
                        },
                    },

                    // 
                    {
                        text: `You's right. Too much meat for just one mes! My teeths get tired 'fore I finish the feet!`,
                        nextNode: 
                        {
                        npcText: `Precisely. *OINK* Return with some friends and then we can discuss things.`,
                        choices: []
                        },
                      },
                  ]
              },
              }   
            ]
        }

        this.npcTextDisplay = this.add.text(this.scale.width / 50, this.scale.height / 1.5, "", {
            fontFamily: 'bitPotion',
            fontSize: '32px',
            color: '#ffffff',
            wordWrap: { width: 800 }
        }).setScrollFactor(0);

        this.currentButtons = [];

        // #endregion

    }

        // #region DIALOGUE LOGIC & VISUALS

    displayNode(node) {
        let textToShow = node.npcText;

        this.npcTextDisplay.setText(textToShow);

        this.createChoiceButtons(node.choices);
    }

    createChoiceButtons(choices) {
        for (let i = 0; i < this.currentButtons.length; i++) {
        this.currentButtons[i].destroy();
        }

        let yPosition = 75;

        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];

            const button = this.add.text(this.scale.width / 2, yPosition, choice.text, {
                fontFamily: 'bitPotion',
                fontSize: '32px',
                backgroundColor: '#333333',
                wordWrap: { width: 100 },
                padding: { x: 10, y: 5 },
                
            }).setScrollFactor(0).setOrigin(0.5);

            button.setInteractive();

            button.on('pointerdown', () => {

                this.displayNode(choice.nextNode);
                
            });

            this.currentButtons.push(button);

            yPosition += 40;

        }
        // #endregion
    }

    update ()
    {
        //#region MOVEMENT
        const playerSpeed = 160;
        
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

        //#endregion

        const offset = 30;

        this.zone.x = this.player.x + (this.facing.x * offset);
        this.zone.y = this.player.y + (this.facing.y * offset);
        this.zone.body.updateFromGameObject();

        if (this.canInteract && Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.displayNode(this.conversation);
        }
        
        this.canInteract = false;

    }
}

//            console.dir(e); // This shows all properties (and methods) inside an object. Replace E with object.