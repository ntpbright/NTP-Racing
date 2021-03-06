var Car = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.checkCarStyle();
        // this.randomPosition();
        this.started = false;
    },
    update: function( dt ) {
      if( this.started){
        this.pos = this.getPosition();
        this.changePosition();
      }
    },
    randomPosition: function() {
        this.setPosition( new cc.Point( this.randomLane(), 75));
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
    checkCarStyle: function(){
      if(carStyle == 1){
          this.initWithFile( res.Sprite_Car_01 );
      }else if(carStyle == 2){
          this.initWithFile( res.Sprite_Car_02 );
      }else if(carStyle == 3){
          this.initWithFile( res.Sprite_Car_03 );
      }else if(carStyle == 4){
          this.initWithFile( res.Sprite_Car_04 );
      }else if(carStyle == 5){
          this.initWithFile( res.Sprite_Car_05 );
      }else if(carStyle == 6){
          this.initWithFile( res.Sprite_Car_06 );
      }else if(carStyle == 7){
          this.initWithFile( res.Sprite_Car_07 );
      }else if(carStyle == 8){
          this.initWithFile( res.Sprite_Car_08 );
      }else if(carStyle == 9){
          this.initWithFile( res.Sprite_Car_09 );
      }
    },
    changePosition: function(keyCode){
        if( keyCode == cc.KEY.right){
          if(this.canTurnRight()){
            this.moveRight();
          }
        }else if( keyCode == cc.KEY.left){
          if(this.canTurnLeft()){
            this.moveLeft();
          }
        }
    },
    canTurnRight: function(direction){
        if(this.getPositionX()+50 >= 400){
            return false;
        }return true;
    },
    canTurnLeft: function(direction){
        if(this.getPositionX()-50 <= 100){
            return false;
        }return true;
    },
    moveRight: function(){
        this.setPosition( new cc.Point( this.pos.x + 50, this.pos.y) );
    },
    moveLeft: function(){
        this.setPosition( new cc.Point( this.pos.x - 50, this.pos.y) );
    },
    start: function() {
        this.started = true;
    },
    stop: function() {
	     this.started = false;
    }
});
Car.LANE = {
    1: 125,
    2: 175,
    3: 225,
    4: 275,
    5: 325,
    6: 375,
};
Car.direction={
   right: 1,
   left: 2
}
