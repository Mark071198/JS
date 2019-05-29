/**
*Переменной Game присваивается значение функции в качестве параметров для которой передаются количество 
*пузырей (bubbles) и время подачи пузырей (duration)
*
*@bubbles - количество пузырей
*@bubblesArr - массив для генерации пузырей
*@score - счет
*@duration - длительность
**/
var Game = function(options) {
    this.bubbles = options.bubbles;
    this.bubblesArr = [];
    this.score = 0;
    this.duration = options.duration;
    /*Дейсвтия производимые в начале игры*/  
    this.start = function() {
    
        setTimeout(function() {
            this.finish();
        }, this.duration);
    
        for (i = 0; i < this.bubbles; i++) {
            /*Ожидает случайного количетсво времени между генерацией пузырей*/
            setTimeout(function() {
                var newBubble = new Bubble();
                newBubble.blow();
            }, Math.floor(Math.random() * this.duration - 800) + 0);
        };
        /*Выставляется обрытный отсет на 16 секунд*/ 
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

/* Старт игры и начало генерации пузырей*/
$('#create').click(function() {
    game.score=0;
    $('#score').html('Score : ' + game.score);
    game.start();
    $('#create').hide();
})

/**
*
*Функция Bubble создает пузыри, выставляет их размер и позицию
*
*@animete - метод анимации
*@blow - запускает поток пузырей, задает их размер и направление
*@pop - считает количество лопнутых пузырей
**/
function Bubble(left, top) {
  this.id = game.bubblesArr.length;

  //Animate this bubble
  this.animate = function() {
    $("#bubble-" + this.id).animate({
      top: -100,
    }, Math.floor(Math.random() * 2100) + 2000)
  }

  this.blow = function() {

    /*Добавляет пузыри на страницу*/
    $('#container').append('<div class="bubble" id="bubble-' + this.id + '"></div>');
    
    game.bubblesArr.push(this);

    $('#bubble-' + this.id).click(function() {
      var num = this.id.replace('bubble-', '');
      game.bubblesArr[num].pop();
    });

   /* Рандомизация размеров и позиции*/
    var pageWidth = $(document).width();
    $('#bubble-' + this.id).css("left", Math.floor(Math.random() * pageWidth / 100 * 35) + 20);
    var size = Math.floor(Math.random() * 60) + 50 + "px";
    $('#bubble-' + this.id).css("width", size);
    $('#bubble-' + this.id).css("height", size);

    this.animate();

  }

  this.pop = function() {
    $('#bubble-' + this.id).hide();
    game.score++;
    $('#score').html('Score : ' + game.score);
  }

}

/**
*
*Переменной game присваевается значение переменной-функции Game с параметрами 
*bubbles - количество пузырей 
*duration - продолжительность
*
**/
var game = new Game({
  bubbles: 20,
  duration: 16000
});

