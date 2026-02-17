export default class EntityController {
    constructor(entity, speed = 160) {
        this.entity = entity;
        this.speed  = speed;
        this.directionX = 0;
        this.directionY = 0;
    }

    update(){
        if (this.directionX !== 0 || this.directionY !== 0) {
            const vec = new Phaser.Math.Vector2(this.directionX, this.directionY)
                .normalize()
                .scale(this.speed);
            this.entity.setVelocity(vec.x, vec.y);
        } else {
            this.entity.setVelocity(0, 0);
        }
    }

    setDirection(x, y) {
        this.directionX = x;
        this.directionY = y;
    }

    stop(){
        this.directionX = 0;
        this.directionY = 0;
    }
}
