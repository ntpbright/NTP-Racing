var GameOverLayer = cc.LayerColor.extend({

  init: function() {
    //initailize frame
    this._super( new cc.Color( 127, 127, 127, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );

    this.bgGameOver = new BgGameOver();
    this.bgGameOver.setPosition(250,300);

    this.addChild(this.bgGameOver);
    this.scheduleUpdate();

    this.addButton();
    this.addLabel();
    this.playSound();

    return true;
  },
  addButton: function(){
    this.homeButton = new cc.MenuItemImage(
			res.Button_arrowLeft_bf_png,
			res.Button_arrowLeft_af_png,
			function(){
				this.unscheduleUpdate();
				cc.director.runScene( cc.TransitionShrinkGrow.create( 0.4 ,new MenuScene()));
			},this);
		this.homeButton = new cc.Menu(this.homeButton);
    this.homeButton.setPosition(50,50);
    this.addChild(this.homeButton);

    this.restartButton = new cc.MenuItemImage(
      res.Button_restart_png,
      res.Button_restart_invert_png,
      function(){
        this.unscheduleUpdate();
        cc.director.runScene( cc.TransitionFade.create( 0.4 ,new SinglePlayerScene()));
      },this);
    this.restartButton = new cc.Menu(this.restartButton);
    this.restartButton.setPosition(450,50);
		this.addChild(this.restartButton);
  },
  addLabel: function(){
    this.scoreLabel = cc.LabelTTF.create( score+"" , 'Haettenschweiler', 65 );
    this.scoreLabel.setPosition( new cc.Point( 250, 180 ) );
    this.addChild( this.scoreLabel );

    this.highScoreLabel = cc.LabelTTF.create( highScore+"" , 'Haettenschweiler', 65 );
    this.highScoreLabel.setPosition( new cc.Point( 250, 335 ) );
    this.addChild( this.highScoreLabel );
  },
  playSound: function(){
    cc.audioEngine.playMusic("res/sound/GameOver.mp3");
  }
});

var GameOverScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameOverLayer();
    layer.init();
    this.addChild( layer );
  }
});
