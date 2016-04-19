var GameLayer = cc.LayerColor.extend({

    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();

        this.bgArr = [];
        this.addBg();

        this.car = new Car();
        this.addChild(this.car);
        this.car.scheduleUpdate();

        this.obstacle = new Obstacle();
        this.addChild(this.obstacle);
        this.obstacle.scheduleUpdate();

        this.scheduleUpdate();
        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( this.score + "", 'Arial', 40 );
	      this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
	      this.addChild( this.scoreLabel );
        return true;
    },
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
    onKeyDown: function( keyCode, event ) {
        if ( keyCode == cc.KEY.right ) {
            this.car.changePosition(cc.KEY.right);
        }else if ( keyCode == cc.KEY.left ) {
            this.car.changePosition(cc.KEY.left);
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
    update: function(){
        for(i = 0  ; i < 2 ; i++){
          this.bgArr[i].update();
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
