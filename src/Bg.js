var Bg = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bg.jpg' );
    },
    update: function( dt ) {
        this.pos = this.getPosition();
        this.slide();
    },
    slide: function(){
        if(this.pos.y== -1200){
            this.setPosition( new cc.Point( this.pos.x, this.pos.y+2400) );
        }else{
            this.setPosition( new cc.Point( this.pos.x, this.pos.y-1) );
        }
    }

});
