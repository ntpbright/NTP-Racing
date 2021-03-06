var Bg = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.BG);
        this.started = false;
        this.constantsVelocity = 0.1;
    },
    update: function( ) {
      if(this.started){
        this.pos = this.getPosition();
        this.slide();
      }
    },
    slide: function(){
        if(this.pos.y<= -1200){
            this.setPosition( new cc.Point( this.pos.x, this.pos.y+2400) );
        }else{
            this.setPosition( new cc.Point( this.pos.x, this.pos.y - 1 - this.constantsVelocity) );
        }
    },
    start: function() {
        this.started = true;
    },
    stop: function() {
	     this.started = false;
    }
});
