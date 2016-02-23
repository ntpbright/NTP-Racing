var Gold = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/gold.png' );
    },
 
    randomPosition: function() {
        this.setPosition( new cc.Point( Math.floor(Math.random() * 750)+50, Math.floor(Math.random() * 550)+50));
    },
    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ( ( Math.abs( myPos.x - oPos.x ) <= 40 ) &&
             ( Math.abs( myPos.y - oPos.y ) <= 40 ) );
    },
    update: function() {
        if ( this.gold.closeTo( this.ship ) ) {
            this.gold.randomPosition();
        }
    }
});