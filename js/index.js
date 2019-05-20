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
    //Set countdown timer from 16 seconds 
    var seconds_left = this.duration / 1000;
    var interval = setInterval(function() {
      $('#timer_div').html(--seconds_left);

      if (seconds_left <= 0) {
        $('#timer_div').html("Time is over"); 
        $('#create').html("Play again?");
        $('#create').show();
         clearInterval(interval);
      }
    }, 1000);
  };

  };

//click to start the game and create new bubbles
$('#create').click(function() {
  game.score=0;
   $('#score').html('Score : ' + game.score);
  game.start();
  $('#create').hide();
})

// Defines what a bubble is
function Bubble(left, top) {
  this.id = game.bubblesArr.length;

  //Animate this bubble
  this.animate = function() {
    $("#bubble-" + this.id).animate({
      top: -100,
    }, Math.floor(Math.random() * 2100) + 2000)
  }