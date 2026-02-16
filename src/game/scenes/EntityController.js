export default class EntityController {
    constructor(entity, speed = 160) {
        this.entity = entity;
        this.speed  = speed
        this.directionX = 0;
        this.directionY = 0;
    }

    update(){
        this.entity.setVelocity(
            this.directionX * this.speed, 
            this.directionY * this.speed
        );

        if (this.directionX !== 0 && this.directionY !== 0) {
            this.entity.body.velocity.normalize().scale(this.speed);
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