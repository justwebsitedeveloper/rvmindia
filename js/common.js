const navImages = document.querySelectorAll(".nav-content__img");
const navContent = document.querySelectorAll(".nav-content__text h4");
const hamNavigation = document.getElementById("sideNavigation");
const serviceNavButton = document.getElementById("ham-nav-service");
const mainNavItems = document.querySelectorAll(".nav-main__item a");

// Timelines

const tlHome = gsap
  .timeline({ paused: true })
  .to(".nav-content", { backgroundColor: "#02c9b5" })
  .to('.nav-content__img[data-page="home"]', { autoAlpha: 1 })
  // .to('.nav-content__text [data-page="home"]', { autoAlpha: 1 });

const tlService = gsap
  .timeline({ paused: true })
  .to(".nav-content", { backgroundColor: "#2548db" })
  .to(".nav-content__service", { autoAlpha: 1 })
  .fromTo(
    ".nav-content__service-tile",
    { autoAlpha: 0, y: 50 },
    { autoAlpha: 1, y: 0, stagger: 0.1 },
    "-=.5"    
  );

const tlWorks = gsap
  .timeline({ paused: true })
  .to(".nav-content", { backgroundColor: "#ffc42c" })
  .to('.nav-content__img[data-page="works"]', { autoAlpha: 1 })
  // .to('.nav-content__text [data-page="works"]', { autoAlpha: 1 });

const tlIndustries = gsap
  .timeline({ paused: true })
  .to(".nav-content", { backgroundColor: "#ffc82c" });
// .to('.nav-content__img[data-page="industries"]', { autoAlpha: 1 })
// .to('.nav-content__text [data-page="industries"]', { autoAlpha: 1 });

const tlAbout = gsap
  .timeline({ paused: true })
  .to(".nav-content", { backgroundColor: "#e8809f" })
  .to('.nav-content__img[data-page="about"]', { autoAlpha: 1 })
  // .to('.nav-content__text [data-page="about"]', { autoAlpha: 1 });

const navToggle = gsap
  .timeline({ paused: true })
  .to(hamNavigation, { autoAlpha: 1 })
  .fromTo(
    ".nav-links",
    { autoAlpha: 0, left: "100%" },
    { left: 0, autoAlpha: 1, duration: 0.5 },
    "-=.9"
  )
  .fromTo(
    ".nav-content",
    { autoAlpha: 0, left: "100%" },
    { autoAlpha: 1, left: 0, duration: 0.5 },
    "-=.5"
  );

// Navigation array
const navArray = [tlHome, tlService, tlWorks, tlIndustries, tlAbout];
let currentPageindex;
let serviceClicked = false;

playAnimation = function (index) {
  navArray.map(function (animation, idx) {
    if (idx === index) {
      animation.play();
    } else {
      animation.seek(0).pause();
    }
  });
};

// SetScene
document.addEventListener("DOMContentLoaded", function () {
  if (hamNavigation.dataset.page == "services") {
    hamNavigation.querySelector(".nav-content").classList.add("services");
    playAnimation(1);
    currentPageindex = 1;
  } else if (hamNavigation.dataset.page == "home") {
    hamNavigation.querySelector(".nav-content").classList.remove("services");
    playAnimation(0);
    currentPageindex = 0;
  } else if (hamNavigation.dataset.page == "works") {
    hamNavigation.querySelector(".nav-content").classList.remove("services");
    playAnimation(2);
    currentPageindex = 2;
  } else if (hamNavigation.dataset.page == "industries") {
    hamNavigation.querySelector(".nav-content").classList.remove("services");
    playAnimation(3);
    currentPageindex = 1;
  } else if (hamNavigation.dataset.page == "about") {
    hamNavigation.querySelector(".nav-content").classList.remove("services");
    playAnimation(4);
    currentPageindex = 4;
  }

  gsap.set(".nav-content__img, .nav-content__text h4, .nav-content__service", {
    autoAlpha: 0,
  });
});

// Event listeners
serviceNavButton.addEventListener("click", function (e) {
  hamNavigation.querySelector(".nav-content").classList.add("services");
  playAnimation(1);
  serviceClicked = true;
  document.getElementById("subnavService").classList.toggle("active");
});

document.querySelectorAll(".nav__hamburger").forEach((elem) =>
  elem.addEventListener("click", function () {
    navToggle.play();
    if (currentPageindex === 1) {
      hamNavigation.querySelector(".nav-content").classList.add("services");
    } else {
      hamNavigation.querySelector(".nav-content").classList.remove("services");
    }
    playAnimation(currentPageindex);
  })
);

document.querySelector(".close-ham").addEventListener("click", function () {
  navToggle.reverse();
});

$(".subnav-service a, .nav-content__service-tile a").on("click", function () {
  navToggle.reverse();
});

hamNavigation.addEventListener("click", function (e) {
  if (e.target == hamNavigation.querySelector(".navigate__container")) {
    navToggle.reverse();
  }
});

Array.from(mainNavItems).forEach(function (mainNavItem) {
  mainNavItem.addEventListener("mouseenter", function (e) {
    const index = parseInt(e.target.dataset.page);
    if (index === 1) {
      hamNavigation.querySelector(".nav-content").classList.add("services");
    } else {
      hamNavigation.querySelector(".nav-content").classList.remove("services");
    }
    playAnimation(index);
  });
});

// Array.from(mainNavItems).forEach(function (mainNavItem) {
//     mainNavItem.addEventListener('mouseleave', function (e) {
//         const index = parseInt(e.target.dataset.page);
//         if (index === 1 && serviceClicked) {
//             return 0;
//         }
//         if (currentPageindex === 1) {
//             hamNavigation.querySelector('.nav-content').classList.add('services');
//         }
//         playAnimation(currentPageindex);
//     });
// });

// Contact form
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

setInputFilter(document.getElementById("phone"), function (value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

// Sticky Navbar

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("header").outerHeight() + 300;

// On scroll it will trigger has scrolled
$(window).on("scroll", hasScrolled);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (
    (st > lastScrollTop && st > navbarHeight) ||
    window.pageYOffset < navbarHeight
  ) {
    // Scroll Down
    $(".nav-sticky").removeClass("sticky");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $(".nav-sticky").addClass("sticky");
    }
  }

  lastScrollTop = st;
}

// Validation for contact form

$(".contact-form__form").validate({
  rules: {
    name: {
      required: true,
      minlength: 3,
    },
    phone: {
      required: true,
      number: true,
      minlength: 10,
      maxlength: 10,
    },
    message: {
      maxlength: 450,
    },
  },
  messages: {
    phone: {
      required: "phone number is required",
      number: "input should be a number",
      minlength: "At least 10 digits required!",
      maxlength: "Please enter only 10 digits!",
    },
  },
  submitHandler: function (form) {
    // Prevent double submission
    if (!this.beenSubmitted) {
      this.beenSubmitted = true;
      form.submit();
    }
  },
});

// Scroll mouse animation

$(window).scroll(function (e) {
  if ($(this).scrollTop() < 50) {
      $(".scroll-indication").addClass('active')
    } else {
      $(".scroll-indication").removeClass('active');
  }
});
// Fade animation

AOS.init({
  once: false,
});

