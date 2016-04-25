var GameLayer = cc.LayerColor.extend({

    init: function() {
        //initailize frame
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();
        this.addMouseHandlers();
        //initailize BG
        this.bgArr = [];
        this.addBg();
        //initailize BG
        this.car = new Car();
        this.addChild(this.car);
        this.car.scheduleUpdate();
        //initailize obstacle
        this.obstacleArr = [];
        this.addObstacle();
        //initailize score
        this.scheduleUpdate();
        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( this.score + "", 'Arial', 40 );
	      this.scoreLabel.setPosition( new cc.Point(450,550 ) );
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
    //add obstacle to frame
    addObstacle: function(){
      for(i = 1  ; i <= 6 ; i++){
        this.obstacleArr[i] = new Obstacle(i)
        this.addChild(this.obstacleArr[i]);
        this.obstacleArr[i].scheduleUpdate();
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
        }else if ( this.state == GameLayer.STATES.DEAD) {
            if( keyCode == 32){
              this.restartGame();
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
    addMouseHandlers: function(){
      var self = this;
      cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
              onMouseMove: function(event){
                  var str = "MousePosition X: " + event.getLocationX() + "  Y:" + event.getLocationY();
                  console.log(str);
                  // do something...
              },
              onMouseUp: function(event){
                  var str = "Mouse Up detected, Key: " + event.getButton();
                  console.log(str);
                  // do something...
              },
              onMouseDown: function(event){
                  var str = "Mouse Down detected, Key: " + event.getButton();
                  console.log(str);
                  // do something...
              },
              onMouseScroll: function(event){
                  var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
                  console.log(str);
                  // do something...
              }
      },this);
    },
    startGame: function() {
        this.car.start();
        for(i = 1 ; i <= 6 ; i++){
              this.obstacleArr[i].start();
        }
        for(i = 0  ; i < 2 ; i++){
          this.bgArr[i].start();
        }
    },
    endGame: function(onLane) {
        this.state = GameLayer.STATES.DEAD;
        this.car.stop();
        this.obstacleArr[onLane].stop();
        for(i = 0  ; i < 2 ; i++){
          this.bgArr[i].stop();
        }
        this.gameOverLabel = cc.LabelTTF.create("Game Over", 'Arial', 50 );
	      this.gameOverLabel.setPosition( new cc.Point(250,300 ) );
	      this.addChild( this.gameOverLabel );
    },
    restartGame: function(){
      this.init();
      this.startGame();
    },
    update: function(){
      for(i = 0  ; i < 2 ; i++){
        this.bgArr[i].update();
      }
      for(i = 1 ; i <= 6 ; i++){
        if( this.state != GameLayer.STATES.DEAD){
          if(this.obstacleArr[i].closeTo(this.car)){
            this.endGame(i);
          }
          if(this.obstacleArr[i].pass(this.car)){
            if(this.obstacleArr[i].passCount == Obstacle.passCount.NOTYET){
              this.score += 100;
              this.scoreLabel.setString( this.score + "");
              this.obstacleArr[i].passCount == Obstacle.passCount.PASSED;
            }
          }
        }
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
