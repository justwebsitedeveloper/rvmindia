// Home Banner animation

let bannerImages = Array.from(
  document.querySelectorAll(".home-banner__illustration")
);
gsap.set(".home-banner__illustration", {
  y: "-50%",
  x: "0%",
  opacity: 0,
});

let bannerContents = Array.from(
  document.querySelectorAll(".home-banner__content-text")
);
gsap.set(".home-banner__content-text", {
  // y: "-50%",
  // x: "-50%",
  display: "none",
});

bannerTextAnimation = gsap
  .timeline()
  .from(".home-banner__cover", 0.5, { y: "-50%", opacity: "0" }, "+=0")
  .fromTo(
    bannerImages[0],
    0.5,
    { y: "-10%", opacity: 0 },
    { y: "0%", opacity: 1 },
    "-=.5"
  )
  .fromTo(
    bannerContents[0],
    0.5,
    { y: "-10%", display: "none" },
    { y: "0%", display: "block" },
    "-=.5"
  )
  // .from(".home-banner h3", 0.5, { y: "50px", opacity: 0 }, "+=0")
  .to("#banner-arrow", 0.5, { attr: { "stroke-dashoffset": 0 } }, "-=0.5");

bannerAnimation = gsap
  .timeline({ repeat: -1, repeatDelay: 0 })
  .to(
    ".home-banner__cover",
    0.5,
    { backgroundImage: "linear-gradient(to bottom, #0ae4ce 0%,#00c8b4 100%)" },
    "+=3"
  )

// An 1
  .to(bannerImages[0], 0.5, { y: "-30%", opacity: 0 }, "-=.5")
  .fromTo(
    bannerImages[1],
    0.5,
    { y: "-10%", opacity: 0 },
    { y: "0%", opacity: 1 },
    "-=.5"
  )
  .to(bannerContents[0], 0, { y: "0%", display: "none" }, "-=.5")
  .fromTo(
    bannerContents[1],
    0.5,
    { y: "-20%", display: "none" },
    { y: "0%", display: "block" },
    "-=.5"
  )

  .to(
    ".home-banner__cover",
    0.5,
    { backgroundImage: "linear-gradient(to bottom, #fa7ca2 0%,#e47395 100%)" },
    "+=3"
  )

// An 2
  .to(bannerImages[1], 0.5, { y: "-30%", opacity: 0 }, "-=.5")
  .fromTo(
    bannerImages[2],
    0.5,
    { y: "-10%", opacity: 0 },
    { y: "0%", opacity: 1 },
    "-=.5"
  )
  .to(bannerContents[1], 0, { y: "0%", display: "none" }, "-=.5")
  .fromTo(
    bannerContents[2],
    0.5,
    { y: "-20%", display: "none" },
    { y: "0%", display: "block" },
    "-=.5"
  )
  .to(
    ".home-banner__cover",
    0.5,
    { backgroundImage: "linear-gradient(to bottom, #fcd25a 0%,#f9c530 100%)" },
    "+=3"
  )

  // An3
  .to(bannerImages[2], 0.5, { y: "-30%", opacity: 0 }, "-=.5")
  .fromTo(
    bannerImages[0],
    0.5,
    { y: "-10%", opacity: 0 },
    { y: "0%", opacity: 1 },
    "-=.5"
  )
  .to(bannerContents[2], 0, { y: "0%", display: "none" }, "-=.5")
  .fromTo(
    bannerContents[0],
    0.5,
    { y: "-20%", display: "none" },
    { y: "0%", display: "block" },
    "-=.5"
  );

// Content
// Blog slider

let moveSlideTL = gsap.timeline();
let images = document.querySelectorAll(".home-blog__img");

const dots = document.querySelectorAll(".home-blog__nav li");
gsap.set(".home-blog__img:not(.active)", {
  top: "-105%",
});
gsap.set(".home-blog__content-indi:not(.active)", {
  autoAlpha: 0,
  top: "-105%",
});

function setActiveSlide(toImage) {
  const toSlideIndex = Array.from(toImage.parentNode.children).indexOf(toImage);
  const dotTo =
    document.querySelector(".home-blog__nav").children[toSlideIndex];

  // Animating the dots
  gsap.to(".home-blog__nav li.active", { backgroundColor: "#fff" });
  Array.from(dots).forEach(function (dot) {
    dot.classList.remove("active");
  });
  dotTo.classList.add("active");
  gsap.to(dotTo, { backgroundColor: "#2548db" });
}

function moveToSlide(slideFromIndex, slideToIndex) {
  slideFromImg = document.querySelector(".home-blog__img-cover").children[
    slideFromIndex
  ];
  slideToImg = document.querySelector(".home-blog__img-cover").children[
    slideToIndex
  ];
  slideFromContent = document.querySelector(".home-blog__content").children[
    slideFromIndex
  ];
  slideToContent = document.querySelector(".home-blog__content").children[
    slideToIndex
  ];
  // console.log(slideFromImg);

  moveSlideTL = gsap
    .timeline({
      onStart: setActiveSlide,
      onStartParams: [slideToImg, slideFromImg],
    })
    .to(slideFromImg, 1, {
      top: "-105%",
      ease: "power4.inOut",
      className: "home-blog__img",
    })
    .to(
      slideFromContent,
      1,
      {
        autoAlpha: 0,
        top: "-105%",
        ease: "power4.inOut",
        className: "home-blog__content-indi",
      },
      0
    )
    .set(slideToImg, { top: "100%" }, 0)
    .set(slideToContent, { autoAlpha: 0, top: "105%" }, 0)
    .to(
      slideToImg,
      1,
      { top: 0, ease: "power4.inOut", className: "home-blog__img active" },
      0
    )
    .to(
      slideToContent,
      1,
      {
        autoAlpha: 1,
        top: "50%",
        ease: "power4.inOut",
        className: "home-blog__content-indi active",
      },
      0
    );
}

const dotClick = function (e) {
  clearInterval(looper);
  if (!moveSlideTL.isActive()) {
    const slideFrom = document.querySelector(".home-blog__nav li.active");
    const slideFromIndex = Array.from(slideFrom.parentNode.children).indexOf(
      slideFrom
    );
    const slideTo = e.target;
    const slideToIndex = Array.from(slideTo.parentNode.children).indexOf(
      slideTo
    );
    if (slideFromIndex !== slideToIndex) {
      moveToSlide(slideFromIndex, slideToIndex);
    }
  }
};

Array.from(dots).forEach(function (dot) {
  dot.addEventListener("click", dotClick);
});

dotsArray = Array.from(dots);
currentSlide = 0;
nextSlide = 1;

var looper = setInterval(function () {
  if (currentSlide >= dotsArray.length) {
    currentSlide = 0;
  }
  if (nextSlide >= dotsArray.length) {
    nextSlide = 0;
  }
  moveToSlide(currentSlide, nextSlide);
  currentSlide++;
  nextSlide++;
}, 4000);

// Our Service

const servicesList = document.querySelectorAll(".home-services__list-item");
const serviceImages = document.querySelectorAll(".home-services__images img");

gsap.set(".home-services__images img", {
  autoAlpha: 0,
});

servicesAnimationArray = [];

servicesAnimationArray[0] = gsap
  .timeline({ paused: true })
  .to(".home-services__images img", { autoAlpha: 0 })
  .to('.home-services__images img[data-service="default"]', { autoAlpha: 1 });
servicesAnimationArray[1] = gsap
  .timeline({ paused: true })
  .to(".home-services__images img", { autoAlpha: 0 })
  .to('.home-services__images img[data-service="1"]', { autoAlpha: 1 });
servicesAnimationArray[2] = gsap
  .timeline({ paused: true })
  .to(".home-services__images img", { autoAlpha: 0 })
  .to('.home-services__images img[data-service="2"]', { autoAlpha: 1 });
servicesAnimationArray[3] = gsap
  .timeline({ paused: true })
  .to(".home-services__images img", { autoAlpha: 0 })
  .to('.home-services__images img[data-service="3"]', { autoAlpha: 1 });
servicesAnimationArray[4] = gsap
  .timeline({ paused: true })
  .to(".home-services__images img", { autoAlpha: 0 })
  .to('.home-services__images img[data-service="4"]', { autoAlpha: 1 });
  servicesAnimationArray[5] = gsap
  .timeline({ paused: true })
  .to(".home-services__images img", { autoAlpha: 0 })
  .to('.home-services__images img[data-service="5"]', { autoAlpha: 1 });

playerServiceAnimation = function (index) {
  servicesAnimationArray.map(function (animation, idx) {
    if (idx === index) {
      animation.play();
    } else {
      animation.seek(0).pause();
    }
  });
};

Array.from(servicesList).forEach(function (serviceItem) {
  // MouseEnter
  serviceItem.addEventListener("mouseenter", function (e) {
    const service = +e.target.dataset.service;
    playerServiceAnimation(service);
  });

  // MouseLeave
  serviceItem.addEventListener("mouseleave", function (e) {
    // const service = +e.target.dataset.service;
    playerServiceAnimation(0);
  });
});

playerServiceAnimation(0);

// confeti

// let confeti = (function () {
//   // ammount to add on each button press
//   const confettiCount = 20;
//   const sequinCount = 10;

//   // "physics" variables
//   const gravityConfetti = 0.3;
//   const gravitySequins = 0.55;
//   const dragConfetti = 0.075;
//   const dragSequins = 0.02;
//   const terminalVelocity = 3;

//   // init other global elements
//   const button = document.querySelector(".home-banner__illustration-cover");
//   var disabled = false;
//   const canvas = document.getElementById("css-canvas");
//   const ctx = canvas.getContext("2d");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   let cx = ctx.canvas.width / 2;
//   let cy = ctx.canvas.height / 2;

//   // add Confetto/Sequin objects to arrays to draw them
//   let confetti = [];
//   let sequins = [];

//   // colors, back side is darker for confetti flipping
//   const colors = [
//     { front: "#7b5cff", back: "#6245e0" }, // Purple
//     { front: "#b3c7ff", back: "#8fa5e5" }, // Light Blue
//     { front: "#5c86ff", back: "#345dd1" }, // Darker Blue
//   ];

//   // helper function to pick a random number within a range
//   randomRange = (min, max) => Math.random() * (max - min) + min;

//   // helper function to get initial velocities for confetti
//   // this weighted spread helps the confetti look more realistic
//   initConfettoVelocity = (xRange, yRange) => {
//     const x = randomRange(xRange[0], xRange[1]);
//     const range = yRange[1] - yRange[0] + 1;
//     let y =
//       yRange[1] -
//       Math.abs(randomRange(0, range) + randomRange(0, range) - range);
//     if (y >= yRange[1] - 1) {
//       // Occasional confetto goes higher than the max
//       y += Math.random() < 0.25 ? randomRange(1, 3) : 0;
//     }
//     return { x: x, y: -y };
//   };

//   // Confetto Class
//   function Confetto(posX, posY) {
//     this.randomModifier = randomRange(0, 99);
//     this.color = colors[Math.floor(randomRange(0, colors.length))];
//     this.dimensions = {
//       x: randomRange(5, 9),
//       y: randomRange(8, 15),
//     };
//     this.position = {
//       x: randomRange(posX - 10, posX +10),
//       y: randomRange(posY + 10, posY - 10),
//     };
//     this.rotation = randomRange(0, 2 * Math.PI);
//     this.scale = {
//       x: 1,
//       y: 1,
//     };
//     this.velocity = initConfettoVelocity([-9, 9], [6, 11]);
//   }
//   Confetto.prototype.update = function () {
//     // apply forces to velocity
//     this.velocity.x -= this.velocity.x * dragConfetti;
//     this.velocity.y = Math.min(
//       this.velocity.y + gravityConfetti,
//       terminalVelocity
//     );
//     this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

//     // set position
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     // spin confetto by scaling y and set the color, .09 just slows cosine frequency
//     this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
//   };

//   // Sequin Class
//   function Sequin(posX, posY) {
//     (this.color = colors[Math.floor(randomRange(0, colors.length))].back),
//       (this.radius = randomRange(1, 2)),
//       (this.position = {
//         x: randomRange(posX - 10, posX + 10),
//         y: randomRange(posY + 10, posY - 10),
//       }),
//       (this.velocity = {
//         x: randomRange(-6, 6),
//         y: randomRange(-8, -12),
//       });
//   }
//   Sequin.prototype.update = function () {
//     // apply forces to velocity
//     this.velocity.x -= this.velocity.x * dragSequins;
//     this.velocity.y = this.velocity.y + gravitySequins;

//     // set position
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;
//   };

//   return {
//     // draws the elements on the canvas
//     render: function () {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       confetti.forEach((confetto, index) => {
//         let width = confetto.dimensions.x * confetto.scale.x;
//         let height = confetto.dimensions.y * confetto.scale.y;

//         // move canvas to position and rotate
//         ctx.translate(confetto.position.x, confetto.position.y);
//         ctx.rotate(confetto.rotation);

//         // update confetto "physics" values
//         confetto.update();

//         // get front or back fill color
//         ctx.fillStyle =
//           confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

//         // draw confetto
//         ctx.fillRect(-width / 2, -height / 2, width, height);

//         // reset transform matrix
//         ctx.setTransform(1, 0, 0, 1, 0, 0);

//         // clear rectangle where button cuts off
//         if (confetto.velocity.y < 0) {
//           ctx.clearRect(
//             canvas.width / 2 - button.offsetWidth / 2,
//             canvas.height / 2 + button.offsetHeight / 2,
//             button.offsetWidth,
//             button.offsetHeight
//           );
//         }
//       });

//       sequins.forEach((sequin, index) => {
//         // move canvas to position
//         ctx.translate(sequin.position.x, sequin.position.y);

//         // update sequin "physics" values
//         sequin.update();

//         // set the color
//         ctx.fillStyle = sequin.color;

//         // draw sequin
//         ctx.beginPath();
//         ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
//         ctx.fill();

//         // reset transform matrix
//         ctx.setTransform(1, 0, 0, 1, 0, 0);

//         // clear rectangle where button cuts off
//         if (sequin.velocity.y < 0) {
//           ctx.clearRect(
//             canvas.width / 2 - button.offsetWidth / 2,
//             canvas.height / 2 + button.offsetHeight / 2,
//             button.offsetWidth,
//             button.offsetHeight
//           );
//         }
//       });

//       // remove confetti and sequins that fall off the screen
//       // must be done in seperate loops to avoid noticeable flickering
//       confetti.forEach((confetto, index) => {
//         if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
//       });
//       sequins.forEach((sequin, index) => {
//         if (sequin.position.y >= canvas.height) sequins.splice(index, 1);
//       });

//       window.requestAnimationFrame(confeti.render);
//     },

//     initBurst: function () {
//       let x = Math.floor(Math.random() * window.innerWidth);
//       let y = Math.floor(Math.random() * window.innerHeight);

//       for (let i = 0; i < confettiCount; i++) {
//         confetti.push(new Confetto(x, y));
//       }
//       for (let i = 0; i < sequinCount; i++) {
//         sequins.push(new Sequin(x, y));
//       }
//     },
//   };
// })();

// confeti.render();

// const burst = setInterval(function(){
//   confeti.initBurst();
// }, 1000)

// Awards modal

$(".css-awards__modal").modal("show");
$(".css-awards__modal").on("shown.bs.modal", function (e) {
  // change backdrop color
  $(".modal-backdrop").css("background-color", "#000");
});
$(".css-awards__modal").on("hidden.bs.modal", function (e) {
  // change backdrop color
  $(".modal-backdrop").css("background-color", "transparent");
  clearInterval(burst);
});

