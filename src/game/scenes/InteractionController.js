export default class InteractionController {
    constructor(scene, playerController, targetGroup, offset = 32){
        this.scene = scene;
        this.playerController = playerController;
        this.player = playerController.player;
        this.offset = offset;

        this.zone = scene.add.zone(this.player.x, this.player.y, 32, 32);
        scene.physics.add.existing(this.zone);

        this.zone.body.setAllowGravity(false);
        this.zone.body.setImmovable(true);

        scene.physics.add.overlap(
            this.zone,
            targetGroup,
            this.handleOverlap,
            null,
            this
        );

    }

    update() {
        const facing = this.playerController.facing;

        this.zone.setPosition(
            this.player.x + facing.x * this.offset,
            this.player.y + facing.y * this.offset
        )
    }

    handleOverlap(zone, target) {
        console.log("Interacting with: ", target.texture.key);
    }
    
}