export default class InteractionController {
    constructor(scene, player, npcs) {
        this.scene = scene;
        this.player = player;
        this.npcs = npcs;

        this.interactionZone = scene.add.zone(0, 0, 32, 32);
        scene.physics.add.existing(this.interactionZone);
    }
    
    updateZone (facingX, facingY) {
        const offset = 30;

        this.interactionZone.x = this.player.x + (facingX * offset);
        this.interactionZone.y = this.player.y + (facingY * offset);
    }
}