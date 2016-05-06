
// var passCount = Obstacle.passCount.NOTYET;
var Obstacle = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/obstacle_01.png' );
        this.randomPosition();
        this.started = false;
        this.velocity = this.randomVelocity();
        this.constantsVelocity = 0.1;
    },
    ctor: function(lane) {
        this._super();
        this.initWithFile( 'res/images/obstacle_01.png' );
        this.started = false;
        this.setPositionX(this.selectLane(lane));
        this.setPositionY(650);
        this.velocity = this.randomVelocity();
        this.passCount = Obstacle.passCount.NOTYET;
        this.constantsVelocity = 0.1;
    },
    update: function() {
        // this.pos = this.getPosition();
        if(this.started){
          this.move();
        }
    },
    move: function(){
      this.setPosition(this.getPositionX(), (this.getPositionY() - this.velocity ) - this.constantsVelocity);
      console.log(this.passCount);
      if(this.passCount == Obstacle.passCount.PASSED){
        this.setPositionY(650);
        this.velocity = this.randomVelocity();
        this.passCount = Obstacle.passCount.NOTYET;
      }
    },
    randomVelocity: function(){
        return Math.floor(Math.random()*4+3);
    },
    randomPosition: function() {
        this.setPositionX(this.randomLane());
        this.setPositionY(650);
    },
    selectLane: function(lane){
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
        return ( ( Math.abs( myPos.x - oPos.x ) <= 22 ) &&
             ( Math.abs( myPos.y - oPos.y ) <= 90 ) );
    },
    pass: function(obj){
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return myPos.y  < oPos.y-100;
    },
    start: function() {
        this.started = true;
    },
    stop: function() {
	     this.started = false;
    },
    passing: function() {
      this.passCount = Obstacle.passCount.PASSED;
    }
});
Obstacle.passCount = {
    NOTYET: 1,
    PASSED: 2
};
