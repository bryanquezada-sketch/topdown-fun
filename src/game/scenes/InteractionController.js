export default class InterctionController {
    constructor(scene, player, npcs) {
        this.scene = scene;
        this.player = player;
        this.npcs = npcs;

        this.interactionZone = scene.add.zone(0, 0, 32, 32);
        scene.physics.add.existing(this.zone);
    }
    
    updateZone (facingX, facingY) {
        const offset = 30;

        this.interactionZone.x = this.player.x + (this.facingX * offset);
        this.interactionZone.x = this.player.y + (this.facing.y * offset);
    }
}