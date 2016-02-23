var Ship = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/ship.png' );
        this.direction = 1;
        this.direction = Ship.DIR.RIGHT;
    },
    
    update: function( dt ) {
	   var pos = this.getPosition();
       var screenHeight = 600;
       var screenWidth = 800;
       if(this.direction == Ship.DIR.UP){
           if ( pos.y < screenHeight ) {
                this.setPosition( new cc.Point( pos.x, pos.y + 5 ) );
           } else {
               this.setPosition( new cc.Point( pos.x, 0 ) );
           }
       }else if(this.direction == Ship.DIR.RIGHT){
           if ( pos.x < screenWidth ) {
                this.setPosition( new cc.Point( pos.x + 5, pos.y) );
           } else {
               this.setPosition( new cc.Point( 0, pos.y ) );
           }
       }else if(this.direction == Ship.DIR.LEFT){
           if ( pos.x > 0 ) {
                this.setPosition( new cc.Point( pos.x - 5, pos.y) );
           } else {
               this.setPosition( new cc.Point( screenWidth, pos.y ) );
           }
       }else {
           if ( pos.y > 0 ) {
                this.setPosition( new cc.Point( pos.x, pos.y -5  ) );
           } else {
               this.setPosition( new cc.Point( pos.x, screenHeight ) );
           }
       }
    },
    switchDirection: function(keyCode) {
        if ( keyCode == cc.KEY.up ) {
	    this.direction = Ship.DIR.UP;
	    this.setRotation( 0 );
        } else if ( keyCode == cc.KEY.right ) {
            this.direction = Ship.DIR.RIGHT;
            this.setRotation( 90 );
        }else if ( keyCode == cc.KEY.left ) {
            this.direction = Ship.DIR.LEFT;
            this.setRotation( 270 );
        }else{ 
            this.direction = Ship.DIR.DOWN;
            this.setRotation( 180 );
        }  
    }
    
});
Ship.DIR = {
    UP: 1,
    RIGHT: 2,
    LEFT: 3,
    DOWN: 4
    
};

