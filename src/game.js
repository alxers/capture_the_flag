function Game(n) {

    this.n = n;

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.startX = 20;
    this.startY = 20;
    this.width = 75;
    this.height = 75;

    this.player = {
        x: 0,
        y: 0,
        direction: 'left'
    }
    
   

    this.drawPlayer = function() {
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, 15, 0, 2*Math.PI);
        this.ctx.stroke();
    }

    this.drawSquares = function() {
        this.ctx.beginPath();
        this.canvas.width = this.width * this.n + this.startX * 2;
        this.canvas.height = this.height + this.startY * 2;

        for (var i = 0; i < this.n; i++) {
            this.ctx.rect(this.startX + i * this.width, this.startY, this.width, this.height);    
        }
        this.ctx.stroke();
    }

    this.drawFlag = function() {
        var base_image = new Image();
        base_image.src = 'src/images/flag.png';
        var game = this;
        base_image.onload = function() {
            game.ctx.drawImage(base_image, game.startX + 2, game.startY + 2, game.width - 5, game.height - 5);
        }
    }

    this.throwDice = function() {
        var min = 1;
        var max = 6;
        var num = Math.floor(Math.random() * (max - min + 1)) + min
        document.getElementById('diceNum').innerText = num;
        return num;
    }

    this.movePlayer = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var num = this.throwDice();

        this.drawSquares();
        this.drawFlag();

        if (this.player.direction == 'left') {
            this.player.x = this.player.x - num * this.width;

            if (this.player.x < this.startX) {
                alert('dead');
            } else if (this.player.x > this.startX && this.player.x < this.startX + this.width) {
                this.player.direction = 'right';
                this.drawPlayer();
            } else {
                this.drawPlayer();
            }
        } else if (this.player.direction == 'right') {
            this.player.x = this.player.x + num * this.width;

            if (this.player.x > this.startX + this.width * this.n) {
                alert('dead');
            } else if (this.player.x < this.startX + this.width * this.n && this.player.x > this.startX + this.width * (this.n - 1)) {
                this.drawPlayer();
                alert('win');
            } else {
               this.drawPlayer(); 
            }
        }
    }

        this.startGame = function() {
            var btn = document.getElementById('dice');
            this.player.x = this.startX + this.n * this.width - 15;
            this.player.y = (this.height + this.startY) / 2;
            this.drawSquares();
            this.drawFlag();
            this.drawPlayer();
            self = this;
            btn.addEventListener('click', this.movePlayer.bind(this));
        }

        this.endGame = function(status) {
            alert(status);
        }
  
}

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function start() {
   var a =new Game(8);
   a.startGame();
}

ready(start);
