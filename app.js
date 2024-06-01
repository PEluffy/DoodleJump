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
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottomSpace + "px";
  }
  class Platform {
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
      let newPlatForm = new Platform(newPlatBottom);
      platforms.push(newPlatForm);
    }
    console.log(platforms);
  }
  function movePlatForms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";

        if (platform.bottom < 10) {
          let firstplatform = platforms[0].visual;
          firstplatform.classList.remove("platform");
          platforms.shift();
          console.log(platforms);
          let newPlatform = new Platform(600);
          platforms.push(newPlatform);
        }
      });
    }
  }
  function jump() {
    isJumping = true;
    clearInterval(downTimerId);
    upTimerId = setInterval(function () {
      doodlerBottomSpace += 20;
      doodler.style.bottom = doodlerBottomSpace + "px";
      if (doodlerBottomSpace > startpoint + 150) {
        fall();
      }
      if (doodlerBottomSpace >= 515) {
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
    isGameOver = true;
    clearInterval(downTimerId);
    clearInterval(upTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    console.log("game over");
  }
  function control(e) {
    if (!isGameOver) {
      if (e.key === "ArrowLeft") {
        if (!isGoingLeft) {
          moveLeft();
          console.log("left button clicked");
        }
      } else if (e.key === "ArrowRight") {
        if (!isGoingRight) {
          moveRight();
          console.log("right button clicked");
        }
      } else if (e.key === "ArrowUp") {
        moveStraight();
      }
    }
  }
  function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
  }
  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;

    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else {
        moveRight();
      }
    }, 30);
  }
  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else {
        moveLeft();
      }
    }, 30);
  }

  function start() {
    if (!isGameOver) {
      createPlatForms();
      createDoodler();
      setInterval(movePlatForms, 30);
      document.addEventListener("keyup", control);
      jump();
    }
  }
  start();
});
