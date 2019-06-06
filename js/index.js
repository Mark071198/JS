/**
*Переменной Game присваивается значение функции в качестве параметров для которой передаются количество 
*пузырей (bubbles) и время подачи пузырей (duration)
*
*@param {integer} bubbles - количество пузырей
*@param {integer} bubblesArr - массив для генерации пузырей
*@param {integer} score - счет
*@param {integer} duration - длительность
*/
    var Game = function(options) {
        this.bubbles = options.bubbles;
        this.bubblesArr = [];
        this.score = 0;
        this.duration = options.duration;

        /**
        *Дейсвтия производимые в начале игры
        *
        *@method start 
        *@param {object} newBubble - объявления класса Bubble
        *@param {integer} second_left - длительность
        *@param {object} interval - интервал между генерацией пузырьков
        */  
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
            /*Выставляется обрытный отсчет на 16 секунд*/ 
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
*/
    function Bubble(left, top) {
      this.id = game.bubblesArr.length;

      /**
      *Анимация
      *
      *@method animate
      */
      this.animate = function() {
        $("#bubble-" + this.id).animate({
          top: -100,
        }, Math.floor(Math.random() * 2100) + 2000)
      }
      /**
      *Дейсвтивя с пузырями
      *
      *@method blow
      *@param {integer} num - количество лопнутых пузырьков
      *@param {integer} pageWidth - ширина 
      *@param {integer} size - размер
      */
      this.blow = function() {

        /*Добавляет пузыри на страницу*/
        $('#container').append('<div class="bubble" id="bubble-' + this.id + '"></div>');
    
        game.bubblesArr.push(this);
        /*Считает лопнутые пузыри*/  
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
    /**
    *
    *Ведет счет лопнутых пузырей
    *
    *@method pop
    */  
    this.pop = function() {
        $('#bubble-' + this.id).hide();
        game.score++;
        $('#score').html('Score : ' + game.score);
    }

  }

/**
*
*Переменной game присваевается значение переменной-функции Game с параметрами 
*
*/
    var game = new Game({
      bubbles: 20,
      duration: 16000
    });

