export default class EntityController {
    constructor(entity, speed = 160) {
        this.entity = entity;
        this.speed  = speed
        this.directionX = 0;
        this.directionY = 0;
    }

    update(){
        let vx = this.directionX;
        let vy = this.directionY;
        
        if (vx !== 0 || vy !== 0) {
            const vec = new Phaser.Math.Vector2(vx, vy).normalize().scale(this.speed);
            
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