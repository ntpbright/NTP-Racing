var HowTo = cc.LayerColor.extend({

  init: function() {
    //initailize frame
    this._super( new cc.Color( 127, 127, 127, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );

    this.bgHowTo = new BgHowTo();
    this.bgHowTo.setPosition(250,300);

    this.addChild(this.bgHowTo);
    this.scheduleUpdate();
    this.addButton();
    return true;
  },
  addButton: function(){
    this.homeButton = new cc.MenuItemImage(
			res.Button_arrowLeft_bf_png,
			res.Button_arrowLeft_af_png,
			function(){
				this.unscheduleUpdate();
				cc.director.runScene(new MenuScene());
			},this);
		this.homeButton = new cc.Menu(this.homeButton);
    this.homeButton.setPosition(50,50);
    this.addChild(this.homeButton);
  }
});

var HowToPlayScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new HowTo();
    layer.init();
    this.addChild( layer );
  }
});
