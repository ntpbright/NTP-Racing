var GameLayer = cc.LayerColor.extend({

  init: function() {
    //initailize frame
    this._super( new cc.Color( 127, 127, 127, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );
    this.addKeyboardHandlers();

    this.frontLayer = new FrontLayer();
    this.frontLayer.setPosition(250,300);
    this.addChild(this.frontLayer);
    this.scheduleUpdate();
    this.startButton = new cc.MenuItemImage(
			res.Button_pressAny_bf_png,
			res.Button_pressAny_af_png,
			function(){
				this.unscheduleUpdate();
				cc.director.runScene(new StartScene());
			},this);
		this.startButton = new cc.Menu(this.startButton);
		this.startButton.setPosition(screenWidth/2,screenHeight-385);
		this.addChild(this.startButton);
    cc.audioEngine.playMusic('res/sound/r35.mp3');
    return true;
  },
  //check event aftter key down
  onKeyDown: function( keyCode, event ) {
    this.unscheduleUpdate();
    cc.director.runScene(new StartScene());
  },
  addKeyboardHandlers: function() {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed : function( keyCode, event ) {
        self.onKeyDown( keyCode, event );
      }
    }, this);
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
