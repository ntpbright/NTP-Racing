var Menu = cc.LayerColor.extend({

  init: function() {
    //initailize frame
    this._super( new cc.Color( 127, 127, 127, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );

    this.bgMenu = new BgMenu();
    this.bgMenu.setPosition(250,300);
    this.scheduleUpdate();
    this.addChild(this.bgMenu);

    this.startButton = new cc.MenuItemImage(
			res.Button_start_png,
			res.Button_start_invert_png,
			function(){
				this.unscheduleUpdate();
				cc.director.runScene(new SinglePlayerScene());
			},this);
		this.startButton = new cc.Menu(this.startButton);
    this.startButton.setPosition(250,380);
    this.addChild(this.startButton);

    this.selectCarButton = new cc.MenuItemImage(
      res.Button_selectCar_png,
      res.Button_selectCar_invert_png,
      function(){
        this.unscheduleUpdate();
        cc.director.runScene(new SelectCarScene());
      },this);
    this.selectCarButton = new cc.Menu(this.selectCarButton);
    this.selectCarButton.setPosition(250,230);
		this.addChild(this.selectCarButton);

    this.howToButton = new cc.MenuItemImage(
      res.Button_howToPlay_png,
      res.Button_howToPlay_invert_png,
      function(){
        this.unscheduleUpdate();
        cc.director.runScene(new HowToPlayScene());
      },this);
    this.howToButton = new cc.Menu(this.howToButton);
    this.howToButton.setPosition(250,80);
		this.addChild(this.howToButton);

    return true;
  }
});

var MenuScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new Menu();
    layer.init();
    this.addChild( layer );
  }
});
