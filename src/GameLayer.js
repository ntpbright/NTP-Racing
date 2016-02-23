var GameLayer = cc.LayerColor.extend({
  
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();
        this.ship = new Ship();
	    this.ship.setPosition( new cc.Point( 200, 220 ) );
	    this.addChild( this.ship );
        this.ship.scheduleUpdate();
        this.gold = new Gold();
	    this.addChild( this.gold );
	    this.gold.randomPosition();
        this.scheduleUpdate();
        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( this.score + "", 'Arial', 40 );
	    this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
	    this.addChild( this.scoreLabel );
        return true;
    },
    onKeyDown: function( keyCode, event ) {
        if ( keyCode == cc.KEY.up ) {
            this.ship.switchDirection(cc.KEY.up);
        }else if ( keyCode == cc.KEY.right ) {
            this.ship.switchDirection(cc.KEY.right);
        }else if ( keyCode == cc.KEY.left ) {
            this.ship.switchDirection(cc.KEY.left);
        }else{
            this.ship.switchDirection(cc.KEY.down);
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
        if(this.gold.closeTo(this.ship)){
            this.gold.randomPosition();     
            this.score += 1;
            this.scoreLabel.setString( this.score + "");
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


