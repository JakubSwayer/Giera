var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = (window.innerHeight - 10);

addEventListener("resize", function() {
  canvas.height = window.innerWidth;
  canvas.height = window.innerHeight;
});

var c = canvas.getContext('2d');

//
// var base_image = new Image();
// base_image.src = 'Slajdy/S0.png';
//
// function make_base()
// {
//     c.drawImage(base_image, 50, 50);
//   }
// }





//  TWORZENIE UŻYTKOWNIKÓW
c.fillStyle = 'red';
var list = [];

var punkty_1 = 0;
var punkty_2 = 0;

var player_height = 120;
var v = 6;
var radius = 30;


function Block(x, y) {
  this.x = x;
  this.y = y;

  this.update = function() {
    c.fillRect(this.x, this.y, 20, player_height);
    if (key_w && key_o) {
      list[0].y -= v;
      list[1].y -= v;
    } else if (key_w && key_l) {
      list[0].y -= v;
      list[1].y += v;
    } else if (key_s && key_o) {
      list[0].y += v;
      list[1].y -= v;
    } else if (key_s && key_l) {
      list[0].y += v;
      list[1].y += v;
    } else if (key_w) {
      list[0].y -= v;
    } else if (key_s) {
      list[0].y += v;
    } else if (key_o) {
      list[1].y -= v;
    } else if (key_l) {
      list[1].y += v;
    }
  }
}

list.push(new Block(100, (innerHeight / 2 - player_height/2)));
list.push(new Block((innerWidth - 100), (innerHeight / 2 - player_height/2)));

let pilka = {
  x: (innerWidth / 2),
  y: (innerHeight / 2),
  dx: 5,
  dy: 0,

  draw: function() {
    c.beginPath();
    c.arc(this.x, this.y, radius, 0, 2 * Math.PI);
    c.fillStyle = 'red';
    c.fill();
  },
  update: function() {

    if (this.x < 130 && this.x > 125 && this.y < (list[0].y + player_height + radius) && this.y > list[0].y - radius) {
      this.dx = -this.dx;
      this.dy = (Math.random() - 0.5) * 8;
      var audio = new Audio('dzwieki/pong.wav');
      audio.play();
    }
    if (this.x > innerWidth - 130 && this.x < innerWidth - 125 && this.y < (list[1].y + player_height + radius) && this.y > list[1].y - radius) {
      this.dx = -this.dx;
      this.dy = (Math.random() - 0.5) * 8;
      var audio = new Audio('dzwieki/pong.wav');
      audio.play();

    }
    if (this.y - 30 <= 0 || this.y + 30 >= innerHeight) {
      this.dy = -this.dy;
      var audio = new Audio('dzwieki/pong.wav');
      audio.play();
    }




    if (this.x <= 0) {
      punkty_1++;
      this.x = (innerWidth / 2);
      this.y = (innerHeight / 2);
      this.dx = 5;
      this.dy = 0;
      console.log(punkty_1);
    } else if (this.x >= innerWidth) {
      punkty_2++;
      this.x = (innerWidth / 2);
      this.y = (innerHeight / 2);
      this.dx = 5;
      this.dy = 0;
            console.log(punkty_2);
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}


var key_w = false;
var key_s = false;
var key_o = false;
var key_l = false;

window.onkeydown = function(event) {
  switch (event.key) {
    case "w":
      if (list[0].y > 5) {
        key_w = true;
      } else {
        key_w = false;
      }
      break;
    case "s":
      if (list[0].y < (innerHeight - player_height - 5)) {
        key_s = true;
      } else {
        key_s = false;
      }
      break;
    case "o":
      if (list[1].y > 5) {
        key_o = true;
      } else {
        key_o = false;
      }
      break;
    case "l":
      if (list[1].y < (innerHeight - player_height - 5)) {
        key_l = true;
      } else {
        key_l = false;
      }
      break;
  }
};
window.onkeyup = function(event) {
  switch (event.key) {
    case "w":
      key_w = false;
      break;
    case "s":
      key_s = false;
      break;
    case "o":
      key_o = false;
      break;
    case "l":
      key_l = false;
      break;
  }
};



function draw_outcome(){
  c.font = "30px Arial";
  c.strokeText(punkty_1, innerWidth/2 - 80, 50);
  c.strokeText(punkty_2, innerWidth/2 + 20, 50);
}



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < 2; i++) {
    list[i].update();
  }
    pilka.update();
  pilka.update();
  draw_outcome();
}
// make_base();
animate();

//
// window.addEventListener('keydown', function(event){
//   console.log(event)
// });
//
//
//
//
// window.onkeydown = function(event){
// console.log(event);
// };
