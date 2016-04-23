
var Obstacle = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/obstacle_01.png' );
        this.randomPosition();
        this.started = false;
        this.velocity = this.randomVelocity();
    },
    update: function( dt ) {
        // this.pos = this.getPosition();
        if(this.started){
          this.move();
        }
    },
    move: function(){
        this.setPosition(this.getPositionX(), this.getPositionY() - this.velocity);
        if(this.getPositionY() < -50){
          this.randomPosition();
          this.velocity = this.randomVelocity();
        }
    },
    randomVelocity: function(){
        return Math.floor(Math.random()*4+1);
    },
    randomPosition: function() {
        console.log("test");
        this.setPositionX(this.randomLane());
        this.setPositionY(650);
    },
    randomLane: function(){
        var lane = Math.floor(Math.random() * 6)+1;
        if(lane == 1 ){
           return 125;
        }else if(lane == 2 ){
           return 175;
        }else if(lane == 3 ){
           return 225;
        }else if(lane == 4 ){
           return 275;
        }else if(lane == 5 ){
           return 325;
        }else if(lane == 6 ){
           return 375;
        }
    },
    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ( ( Math.abs( myPos.x - oPos.x ) <= 40 ) &&
             ( Math.abs( myPos.y - oPos.y ) <= 22 ) );
    },
    // update: function() {
    //     if ( this.obstacle.closeTo( this.car ) ) {
    //       this.started = false;
    //     }
    // },
    start: function() {
        this.started = true;
    },
    stop: function() {
	     this.started = false;
    }
});
