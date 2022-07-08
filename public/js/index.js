const canvas = document.getElementById('canvas');
const playArea = document.querySelector('body > div');
const ctx = canvas.getContext('2d');
canvas.width = canvas.parentElement.offsetWidth;
canvas.height = window.innerHeight;

let bgPosX = 0;

const gravity = 1.5;
//Class constructor to set the positioning and speed of the char
class Char {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 144;
    this.height = 130;
  }
  //Draws char onto the canvas at the correct position
  draw() {
    const base_image = new Image();
    base_image.src = './assets/player.png';
    ctx.drawImage(
      base_image,
      this.position.x,
      this.position.y + 20,
      this.width,
      this.height
    );
  }
  // lookBack() {
  //     ctx.scale(1,1);
  // }
  // lookForward() {
  //     ctx.scale(-1,1);
  // }
  //Function to dynamically update the char position in relation to the canvas
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    // IF the position at the y axis + height + velocity at the y axis is less than or equal to height of the canvas, continue to drop at 1.5
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
      //Otherwise, the char has reached the bottom, so velocity should be zero
    } else {
      this.velocity.y = 0;
      // alert('GAME OVER')
    }
  }
}
//Following same method for creating the Char, only now to construct the background/platform
class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.width = 100;
    this.height = 25;
  }
  draw() {
    const base_image = new Image();
    base_image.src = './assets/platform.png';
    ctx.drawImage(
      base_image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const char = new Char();
const platforms = [
  new Platform({
    x: 50,
    y: 645,
  }),
  new Platform({
    x: 350,
    y: 590,
  }),
  new Platform({
    x: 850,
    y: 410,
  }),
  new Platform({
    x: 1200,
    y: 585,
  }),
  new Platform({
    x: 1500,
    y: 355,
  }),
  new Platform({
    x: 1990,
    y: 640,
  }),
  new Platform({
    x: 2225,
    y: 590,
  }),
  new Platform({
    x: 2540,
    y: 360,
  }),
  new Platform({
    x: 3150,
    y: 590,
  }),
  new Platform({
    x: 3400,
    y: 645,
  }),
];
//Junk powerups
class JunkFood {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.width = 35;
    this.height = 35;
  }
  draw() {
    const base_image = new Image();
    base_image.src = './assets/cake.png';
    ctx.drawImage(
      base_image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const junkFoods = [
  new JunkFood({
    x: 450,
    y: 565,
  }),
];
//Healthy powerups
class HealthFood {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.width = 35;
    this.height = 35;
  }
  draw() {
    const base_image = new Image();
    base_image.src = './assets/eggs.png';
    ctx.drawImage(
      base_image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const healthFoods = [
  new HealthFood({
    x: 1150,
    y: 800,
  }),
];
//Controls left and right keys--moves player when down, stops player when up

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
let scrollLimit = 0;
//Animates thhe char
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  char.update();
  platforms.forEach((platform) => {
    platform.draw();
  });
  junkFoods.forEach((junkFood) => {
    junkFood.draw();
  });
  healthFoods.forEach((healthFood) => {
    healthFood.draw();
  });
  //Moves platform in the opposite dir of the player to create side scroll
  //Moves and stops the player based on key events, AND will stop the player from moving outside of the page
  if (keys.right.pressed && char.position.x < 2000) {
    char.velocity.x = 5;
    bgPosX += -5;
    playArea.style.backgroundPosition = `${bgPosX}px`;
    scrollLimit += 5;
    platforms.forEach((platform) => {
      platform.position.x -= 5;
    });
    healthFoods.forEach((healthFood) => {
      healthFood.position.x -= 5;
    });
    junkFoods.forEach((junkFood) => {
      junkFood.position.x -= 5;
    });
  } else if (keys.left.pressed && char.position.x > 0) {
    char.velocity.x = -5;
    bgPosX += 5;
    playArea.style.backgroundPosition = `${bgPosX}px`;
    scrollLimit -= 5;
    platforms.forEach((platform) => {
      platform.position.x += 5;
    });
    healthFoods.forEach((healthFood) => {
      healthFood.position.x += 5;
    });
    junkFoods.forEach((junkFood) => {
      junkFood.position.x += 5;
    });
  } else {
    char.velocity.x = 0;
  }
  //Platform code -- if the player is on the platform, their height will become equal to the platforms position, then they will fall back down once of it
  platforms.forEach((platform) => {
    if (
      char.position.y + char.height <= platform.position.y &&
      char.position.y + char.height + char.velocity.y >= platform.position.y &&
      char.position.x + char.width >= platform.position.x &&
      char.position.x <= platform.position.x + platform.width
    ) {
      char.velocity.y = 0;
    }
  });
  if (scrollLimit > 2000) {
    console.log('Winner');
  }
}
healthFoods.forEach((healthFoods) => {
  if (
    char.position.y &&
    char.position.x === healthFoods.position.y &&
    healthFoods.position.x
  ) {
    alert('oh no');
  }
});
junkFoods.forEach((junkFood) => {
  if (
    char.position.y + char.height <= junkFood.position.y &&
    char.position.y + char.height + char.velocity.y >= junkFood.position.y &&
    char.position.x + char.width >= junkFood.position.x &&
    char.position.x <= junkFood.position.x + junkFood.width
  ) {
    char.velocity.y = -1000;
  }
});
animate();

//Event listeners--allows char movement based on key presses
window.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
  //Cases are keycodes
  case 65:
    console.log('left');
    keys.left.pressed = true;
    break;
  case 68:
    console.log('right');
    keys.right.pressed = true;
    break;

  case 87:
    console.log('up');
    char.velocity.y -= 20;
    break;
  }
});
//Stops the player movement when keys are no longer pressed
window.addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
  //Cases are keycodes
  case 65:
    console.log('left');
    keys.left.pressed = false;
    break;
  case 68:
    console.log('right');
    keys.right.pressed = false;
    break;

  case 87:
    console.log('up');
    char.velocity.y -= 20;
    break;
  }
});
