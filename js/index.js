var Game = function(options) {
  this.bubbles = options.bubbles;
  this.bubblesArr = [];
  this.score = 0;
  this.duration = options.duration;
  
  this.start = function() {
    
    setTimeout(function() {
      this.finish();
    }, this.duration);
    
    for (i = 0; i < this.bubbles; i++) {
      // Wait random amount of time between creating bubbles
      setTimeout(function() {
        var newBubble = new Bubble();
        newBubble.blow();
      }, Math.floor(Math.random() * this.duration - 800) + 0);
    };
  