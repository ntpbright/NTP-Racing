var SelectCar = cc.LayerColor.extend({

  init: function() {
    //initailize frame
    this._super( new cc.Color( 127, 127, 127, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );

    this.bgSelectCar = new BgSelectCar();
    this.bgSelectCar.setPosition(250,300);
    this.addChild(this.bgSelectCar);

    this.carArr = [];
    this.addCar();
    this.addButton();
    this.addKeyboardHandlers();
    this.scheduleUpdate();
    return true;
  },
  addButton: function(){
    this.selectButton = new cc.MenuItemImage(
			res.Button_select_png,
			res.Button_select_invert_png,
			function(){
				cc.director.runScene( cc.TransitionFade.create( 0.4 ,new SinglePlayerScene()));
			},this);
		this.selectButton = new cc.Menu(this.selectButton);
    this.selectButton.setPosition(250,80);
    this.addChild(this.selectButton);

    this.leftButton = new cc.MenuItemImage(
			res.Button_arrowLeft_bf_png,
			res.Button_arrowLeft_af_png,
			function(){
				this.moveLeft();
			},this);
		this.leftButton = new cc.Menu(this.leftButton);
    this.leftButton.setPosition(50,300);
    this.addChild(this.leftButton);

    this.rightButton = new cc.MenuItemImage(
      res.Button_arrowRight_bf_png,
      res.Button_arrowRight_af_png,
      function(){
        this.moveRight();
      },this);
    this.rightButton = new cc.Menu(this.rightButton);
    this.rightButton.setPosition(450,300);
		this.addChild(this.rightButton);
  },
  addCar: function(){
      for(i = 1 ; i <= 9 ; i++){
        carStyle = i;
        this.carArr[i] = new Car();
        this.carArr[i].setPosition( new cc.Point( posCarX, posCarY));
        this.addChild(this.carArr[i]);
        this.carArr[i].scheduleUpdate();
        posCarX += 400;
      }posCarX = 250;
      carStyle = 1;
    },
    moveRight: function(){
      if(this.carArr[9].getPositionX() != posCarX){
        for(i = 1 ; i <= 9 ; i++){
          this.carArr[i].setPosition( new cc.Point( this.carArr[i].getPositionX() - 400, this.carArr[i].getPositionY() ));
        }
      }
    },
    moveLeft: function(){
      if(this.carArr[1].getPositionX() != posCarX){
        for(i = 1 ; i <= 9 ; i++){
          this.carArr[i].setPosition( new cc.Point( this.carArr[i].getPositionX() + 400, this.carArr[i].getPositionY() ));
        }
      }
    },
    //check event aftter key down
    onKeyDown: function( keyCode, event ) {
        if ( keyCode == cc.KEY.right ) {
          this.moveRight();
        }else if ( keyCode == cc.KEY.left ) {
          this.moveLeft();
        }else if (keyCode == cc.KEY.enter){
          cc.director.runScene( cc.TransitionFade.create( 0.4 ,new SinglePlayerScene()));
        }
    },
    addKeyboardHandlers: function() {
      var self = this;
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed : function( keyCode, event ) {
          self.onKeyDown( keyCode, event );
        }
      }, this);
    },
    setCarStyle: function(){
      for(i = 1 ; i <= 9 ; i++){
        if(this.carArr[i].getPositionX() == posCarX){
          carStyle = i;
        }
      }
    },
    update: function(){
      this.setCarStyle();
    }
});

var posCarX = 250;
var posCarY = 300;

var SelectCarScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new SelectCar();
    layer.init();
    this.addChild( layer );
  }
});
