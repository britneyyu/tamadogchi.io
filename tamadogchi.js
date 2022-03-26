 
 var hunger = 25; // 5
 var fun = 25; // 2
 var tired = 25; // 10

 var barkSound;
 var playSound;
 var sleepSound;
 var eatSound;
 var i = 0;

 var gameover = false;

 function sound (src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
 }

 function win(){
    const titleHeader = document.getElementById("title");
    titleHeader.textContent = "You win :)";

    const image = document.getElementById("shiba");
    image.src = "happydog.jpg";
}

function onEat() {
    hunger += 5;
    const scoreHeader = document.getElementById("eatText");
    scoreHeader.textContent = "Hunger: " + hunger;

    eatSound = new sound("drink.mp3");
    eatSound.play();
}

function onSleep() {
    tired += 10;
    const scoreHeader = document.getElementById("sleepText");
    scoreHeader.textContent = "Awakeness: " + tired;

    sleepSound = new sound("sleep.mp3");
    sleepSound.play();
}

function onPlay() {
    fun += 2;
    const scoreHeader = document.getElementById("playText");
    scoreHeader.textContent = "Happy: " + fun;

    playSound = new sound("play.mp3");
    playSound.play();
}

function clickDog() {
    barkSound = new sound("bark.mp3");
    barkSound.play();
}

function gameOver() {
    const titleHeader = document.getElementById("title");
    titleHeader.textContent = "You lose ;(";

    const image = document.getElementById("shiba");
    image.src = "sad_doggo.jpg";

    gameover = true;
}

function progressBar(){
    if (i == 0) {
        i = 1;
        var bar = document.getElementById("dogstatbar");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
            i = 0;
          } else {
            width++;
            bar.style.width = width + "%";
            bar.innerHTML = width + "%";
          }
        }
      }
}

function main () {
    setTimeout(function onTick() {
        var eatButton = document.getElementById("eatButton");
        var sleepButton = document.getElementById("sleepButton");
        var playButton = document.getElementById("playButton");

        hunger--;
        fun--;
        tired--;
        
        const hungerHeader = document.getElementById("eatText");
        hungerHeader.textContent = "Hunger: " + hunger;

        const playHeader = document.getElementById("playText");
        playHeader.textContent = "Happy: " + fun;

        const sleepHeader = document.getElementById("sleepText");
        sleepHeader.textContent = "Awakeness: " + tired;

        if (hunger == 0 || fun == 0 || tired == 0) {
            gameOver();
        }
        if(hunger >= 100 && tired >= 100 && fun >= 100){
            win();
        }

        eatButton.onclick = function() {
            onEat();
        }

        sleepButton.onclick = function() {
            onSleep();
        }

        playButton.onclick = function() {
            onPlay();
        }

        if (!gameover) {
            main();
        }
    }, 1000);
}