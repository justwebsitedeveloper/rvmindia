let video = document.getElementById("bootcampVideo");
let videoPlay = document.getElementById("playVideo");

["", "webkit", "moz", "ms"].forEach((prefix) =>
  video.addEventListener(
    prefix + "fullscreenchange",
    function (event) {
      if (
        document.webkitFullscreenElement ||
        document.fullscreenElement ||
        document.mozFullscreenElement ||
        document.msFullscreenElement
      ) {
        // console.log('FullScreen Mode on enter');
      } else {
        // console.log('FullScreen Mode on exit');
        video.pause();
      }
    },
    false
  )
);

videoPlay.addEventListener(
  'click',
  function (event) {
    video.play();
    const rfs =
    video.webKitRequestFullscreen ||
      video.requestFullscreen ||
      video.mozFullscreen ||
      video.msRequestFullscreen;
    rfs.call(video);
  },
  false
);


// Instagram feed

// $(function () {
//   $("#developIg").instastory({
//     get: "@rvmatrix_global",
//     limit: 4,
//     template:
//       '<a href={{link}} target="_blank"><img class="img-fluid" height="320" width="320" src="{{image}}" alt="{{caption}}"></a>',
//     imageSize: 320,
//   });
// });


$(function () {
  $(".testimonials__carousel").owlCarousel({
    dots: false,
    autoWidth: true,
    loop: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    items: 1,
  });
});
