var GameLayer = cc.LayerColor.extend({

  init: function() {
    //initailize frame
    this._super( new cc.Color( 127, 127, 127, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );
    this.addKeyboardHandlers();

    this.frontLayer = new FrontLayer();
    this.frontLayer.setPosition(250,300);
    this.addChild(this.frontLayer);
    this.addButton();
    this.playSound();
    this.scheduleUpdate();
    return true;

  },
  addButton: function(){
    this.startButton = new cc.MenuItemImage(
			res.Button_pressAny_bf_png,
			res.Button_pressAny_af_png,
			function(){
				this.unscheduleUpdate();
				cc.director.runScene( new cc.TransitionShrinkGrow.create(1,new MenuScene()));
			},this);
		this.startButton = new cc.Menu(this.startButton);
		this.startButton.setPosition(screenWidth/2,screenHeight-385);
		this.addChild(this.startButton);
  },
  playSound: function(){
    cc.audioEngine.playMusic(res.Sound_GTR);
  },
  //check event aftter key down
  onKeyDown: function( keyCode, event ) {
    this.unscheduleUpdate();
    cc.director.runScene( new cc.TransitionShrinkGrow.create(1,new MenuScene()));
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
