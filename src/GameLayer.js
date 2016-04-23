var GameLayer = cc.LayerColor.extend({

    init: function() {
        //initailize frame
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();
        //initailize BG
        this.bgArr = [];
        this.addBg();
        //initailize BG
        this.car = new Car();
        this.addChild(this.car);
        this.car.scheduleUpdate();
        //initailize obstacle
        this.obstacle = new Obstacle();
        this.addChild(this.obstacle);
        this.obstacle.scheduleUpdate();
        //initailize score
        this.scheduleUpdate();
        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( this.score + "", 'Arial', 40 );
	      this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
	      this.addChild( this.scoreLabel );
        this.state = GameLayer.STATES.FRONT;
        return true;
    },
    //add background to frame
    addBg: function(){
        var posX = 250;
        var posY = 600;
        for(i = 0  ; i < 2 ; i++){
          this.bgArr.push(new Bg());
          this.bgArr[i].setPosition(new cc.Point( posX,posY ));
          this.addChild(this.bgArr[i]);
          this.bgArr[i].scheduleUpdate();
          posY += 1200;
        }
    },
    //check event aftter key down
    onKeyDown: function( keyCode, event ) {
        //when frist press
        if ( this.state == GameLayer.STATES.FRONT ) {
              this.startGame();
              this.state = GameLayer.STATES.STARTED;
              console.log("start");
        }else if ( this.state == GameLayer.STATES.STARTED ) {
              if ( keyCode == cc.KEY.right ) {
                  this.car.changePosition(cc.KEY.right);
              }else if ( keyCode == cc.KEY.left ) {
                  this.car.changePosition(cc.KEY.left);
              }
        }
    },
    onKeyUp: function( keyCode, event ) {
        console.log( 'Up: ' + keyCode.toString() );
    },
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },
    startGame: function() {
        this.car.start();
        this.obstacle.start();
        for(i = 0  ; i < 2 ; i++){
          this.bgArr[i].start();
        }
    },
    endGame: function() {
        this.state = GameLayer.STATES.DEAD;
        this.car.stop();
        this.obstacle.stop();
        for(i = 0  ; i < 2 ; i++){
          this.bgArr[i].stop();
        }
    },
    update: function(){
        for(i = 0  ; i < 2 ; i++){
          this.bgArr[i].update();
        }
        if(this.obstacle.closeTo(this.car)){
            this.endGame();
        }
    }

});
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});
GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD: 3
};
