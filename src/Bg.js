var Bg = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bg.jpg' );
        this.started = false;
    },
    update: function( dt ) {
      if(this.started){
        this.pos = this.getPosition();
        this.slide();
      }
    },
    slide: function(){
        if(this.pos.y== -1200){
            this.setPosition( new cc.Point( this.pos.x, this.pos.y+2400) );
        }else{
            this.setPosition( new cc.Point( this.pos.x, this.pos.y-1) );
        }
    },
    start: function() {
        this.started = true;
    },
    stop: function() {
	     this.started = false;
    }
});
