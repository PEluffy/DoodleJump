document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let doodlerLeftSpace = 50;
  let startpoint = 150;
  let doodlerBottomSpace = startpoint;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let moveSpeed = 5;
  let upTimerId;
  let downTimerId;
  let isJumping = false;

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottomSpace + "px";
  }
  class platform {
    constructor(newPlatBottom) {
      this.bottom = newPlatBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement("div");
      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }
  function createPlatForms() {
    for (let i = 0; i < platformCount; i++) {
      let platGap = 600 / platformCount;
      let newPlatBottom = 100 + i * platGap;
      let newPlatForm = new platform(newPlatBottom);
      platforms.push(newPlatForm);
    }
    console.log(platforms);
  }
  function movePlatForms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        // platform.left -= 2;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";
        // visual.style.left = platform.left + "px";
      });
    }
  }
  function jump() {
    isJumping = true;
    clearInterval(downTimerId);
    upTimerId = setInterval(function () {
      doodlerBottomSpace += 20;
      doodler.style.bottom = doodlerBottomSpace + "px";
      if (doodlerBottomSpace > startpoint + 200) {
        fall();
      }
    }, 100);
  }
  function fall() {
    isJumping = false;
    clearInterval(upTimerId);
    downTimerId = setInterval(function () {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + "px";
      if (doodlerBottomSpace <= 0) {
        die();
      }
      platforms.forEach((platform) => {
        if (
          doodlerBottomSpace >= platform.bottom &&
          doodlerBottomSpace <= platform.bottom + 15 &&
          doodlerLeftSpace + 60 >= platform.left &&
          doodlerLeftSpace <= platform.left + 85 &&
          !isJumping
        ) {
          console.log("landed");
          startpoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 30);
  }
  function die() {
    clearInterval(downTimerId);
    clearInterval(upTimerId);
    console.log("game over");
    isGameOver = true;
  }
  function control(e) {
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      //move right
    } else if (e.key === "ArrowUp") {
      //move straight
    }
  }

  function start() {
    if (!isGameOver) {
      createPlatForms();
      createDoodler();

      setInterval(movePlatForms, 30);
      jump();
    }
  }
  start();
});
