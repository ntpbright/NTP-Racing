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
        this.frontLabel = cc.LabelTTF.create("         NTP Racing \n\n\n Press any button to start" , 'Agency FB',30);
        this.frontLabel.setPosition(new cc.Point(250,300));
        this.addChild(this.frontLabel);
        this.state = GameLayer.STATES.FRONT;
        return true;
    },
    initForStart: function(){
        this.removeChild(this.frontLabel);
        //initailize Car
        this.car = new Car();
        this.addChild(this.car);
        this.car.scheduleUpdate();
        //initailize obstacle
        this.obstacleArr = [];
        this.addObstacle();
        //initailize score
        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( this.score + "", 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point(450,550 ) );
        this.addChild( this.scoreLabel );
        this.scheduleUpdate();
        return true;
    },
    increaseVelociyty: function () {
      for( i = 1 ; i <= 6 ; i++){
          this.obstacleArr[i].constantsVelocity += GameLayer.MAGICNUMBER.SPEED;
      }
      console.log(this.obstacleArr[1].constantsVelocity);
      for( i = 0 ; i < 3 ; i++){
          this.bgArr[i].constantsVelocity += GameLayer.MAGICNUMBER.SPEED;
      }
      console.log(this.bgArr[1].constantsVelocity);
    },
    decreaseVelociyty: function () {
      for( i = 1 ; i <= 6 ; i++){
          this.obstacleArr[i].constantsVelocity -= GameLayer.MAGICNUMBER.SPEED;
      }
      console.log(this.obstacleArr[1].constantsVelocity);
      for( i = 0 ; i < 3 ; i++){
          if(this.bgArr[i].constantsVelocity >= 0.01){
              this.bgArr[i].constantsVelocity -= GameLayer.MAGICNUMBER.SPEED;
          }
      }
      console.log(this.bgArr[1].constantsVelocity);
    },
    //add background to frame
    addBg: function(){
        var posX = 250;
        var posY = 600;
        for(i = 0  ; i < 3 ; i++){
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
              this.initForStart();
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
    onKeyReleased: function( keyCode , event){
      if ( this.state == GameLayer.STATES.STARTED ) {
            if ( keyCode == cc.KEY.up ) {
                this.increaseVelociyty();
            }else if ( keyCode == cc.KEY.down ) {
                this.decreaseVelociyty();
            }
      }
    },
    onKeyUp: function( keyCode, event ) {
        // console.log( 'Up: ' + keyCode.toString() );
    },
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyReleased( keyCode, event );
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
        for(i = 0  ; i < 3 ; i++){
          this.bgArr[i].start();
        }
    },
    endGame: function(onLane) {
        this.state = GameLayer.STATES.DEAD;
        this.car.stop();
        this.obstacleArr[onLane].stop();
        for(i = 0  ; i < 3 ; i++){
          this.bgArr[i].stop();
        }
        this.gameOverLabel = cc.LabelTTF.create("            Game Over \n\n\n\n\n Press space bar to restart", 'Arial', 40 );
	      this.gameOverLabel.setPosition( new cc.Point(250,300 ) );
	      this.addChild( this.gameOverLabel );
    },
    restartGame: function(){
      this.removeObjInGame();
      this.init();
      this.removeChild(this.frontLabel);
      this.startGame();
      for( i = 1 ; i <= 6 ; i++){
          this.obstacleArr[i].constantsVelocity = 0;
      }
      for( i = 0 ; i < 3 ; i++){
          this.bgArr[i].constantsVelocity = 0;
      }
    },
    removeObjInGame: function(){
      for( i = 1 ; i <= 6 ; i++){
          this.removeChild(this.obstacleArr[i]);
      }
      for( i = 0 ; i < 3 ; i++){
          this.removeChild(this.bgArr[i]);
      }
      this.removeChild(this.car);
      this.removeChild(this.scoreLabel);
      this.removeChild(this.gameOverLabel);
    },
    update: function(){
      for( i = 1 ; i <= 6 ; i++){
        if( this.state != GameLayer.STATES.DEAD){
          if(this.obstacleArr[i].pass(this.car) && this.obstacleArr[i].passCount == Obstacle.passCount.NOTYET){
              this.score += 100;
              this.scoreLabel.setString( this.score + "");
              // this.obstacleArr[i].passCount == Obstacle.passCount.PASSED;
              this.obstacleArr[i].passing();
          }
          if(this.obstacleArr[i].closeTo(this.car)){
            this.endGame(i);
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
GameLayer.MAGICNUMBER = {
    SPEED: 0.5
};
