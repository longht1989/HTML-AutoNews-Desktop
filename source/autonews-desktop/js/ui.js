/*
 * TABLE OF CONTENTS
 *
 * bx-slider
 * go top
 * photoswipe
 * toolsPage
 * channel-timeline
 *    -> toggle login-board
 *    -> toggle setting-board
 * report choose tag
 *    -> toggle context-menu channelpage
 */


// > bx-slider
$('.hero-zone .wrap').bxSlider({
    minSlides: 1,
    maxSlides: 1,
    slideMargin: 0,
    controls: false,
    // nextSelector: ".most-read-box .btn-next",
    // prevSelector: ".most-read-box .btn-prev",
    // auto : true,
    pause: 20000
});

$('.best-selling-car .wrap').bxSlider({
    slideWidth: 400,
    minSlides: 1,
    maxSlides: 1,
    slideMargin: 20,
    controls: false,
    // nextSelector: "#sidebar-video .btn-next",
    // prevSelector: "#sidebar-video .btn-prev",
    // auto : true,
    pause: 20000
});

$('.most-read-box .wrap').bxSlider({
    slideWidth: 230,
    minSlides: 3,
    maxSlides: 4,
    slideMargin: 0,
    // controls: false,
    nextSelector: ".most-read-box .btn-next",
    prevSelector: ".most-read-box .btn-prev",
    // auto : true,
    pause: 20000
});

// > tab
$(".f1-table .panel-title a").click(function(e) {
    e.preventDefault();
    $(this).addClass("is-active");
    $(this).siblings().removeClass("is-active");
    var t = $(this).attr("data-target");
    $(".panel-content .panel").not(t).css("display", "none");
    $("#" + t).show()
});


$(".f1-table .panel > button").click(function(e) {
    e.preventDefault();
    $(this).toggleClass("expand");
    $(this).siblings('.f1-table-detail').toggleClass("is-active");
});

mediumZoom('[data-zoomable]', {
    margin: 24,
    background: '#272727'
});