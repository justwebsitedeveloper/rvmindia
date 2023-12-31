// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight() + 300; 

// On scroll it will trigger has scrolled
$(window).on("scroll",hasScrolled)

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if ((st > lastScrollTop && st > navbarHeight) || window.pageYOffset < navbarHeight){   
        // Scroll Down
        $('.nav-sticky').removeClass('sticky');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.nav-sticky').addClass('sticky');
        }
    }
    
    lastScrollTop = st;
}

