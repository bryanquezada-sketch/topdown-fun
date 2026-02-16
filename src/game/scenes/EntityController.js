export default class EntityController {
    constructor(entity, speed = 160) {
        this.entity = entity;
        this.speed  = speed
        this.velocityX = 0;
        this.velocityY = 0;
    }

    update(){
        this.applyVelocity();
    }

    setDirection(x, y) {
        this.velocityX = x * this.speed;
        this.velocityY = y * this.speed;
    }

    stop(){
        this.velocityX = 0;
        this.velocityY = 0;
    }

    applyVelocity () {
        this.entity.setVelocity(this.velocityX, this.velocityY);

        if (this.velocityX !== 0 && this.velocityY !== 0) {
            this.entity.body.velocity.normalize().scale(this.speed);
        }
    }


}