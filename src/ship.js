var Ship = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/ship.png' );
    },
    
    update: function(dt){
        var pos = this.getPosition();
        pos.y += 1;
        this.setPosition(new cc.Point(pos.x , pos.y));
        
        this.angle += 1;
        
    }
});

var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        var ship = new Ship();
        ship.setPosition( new cc.Point( 200, 220 ) );
        this.addChild( ship );
        ship.scheduleUpdate();

        return true;
    }
});