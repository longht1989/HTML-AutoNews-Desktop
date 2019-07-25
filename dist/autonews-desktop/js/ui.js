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
    touchEnabled: false,
    // nextSelector: ".most-read-box .btn-next",
    // prevSelector: ".most-read-box .btn-prev",
    // auto : true,
    pause: 20000
});

$('.top-view .wrap').bxSlider({
    slideWidth: 400,
    minSlides: 1,
    maxSlides: 1,
    slideMargin: 20,
    controls: false,
    touchEnabled: false,
    // nextSelector: "#sidebar-video .btn-next",
    // prevSelector: "#sidebar-video .btn-prev",
    // auto : true,
    pause: 20000
});

$('.most-read-box .wrap').bxSlider({
    slideWidth: 250,
    minSlides: 3,
    maxSlides: 4,
    slideMargin: 0,
    touchEnabled: false,
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

if ($('.wrapper').hasClass('detail-page')) {
    mediumZoom('[data-zoomable]', {
        margin: 24,
        background: '#272727'
    });
    stickyads(".detail-extension .main-column", ".detail-extension .sidebar", "#zoneWrap", "#adsSticky", 80);
}

/*pin header */
window.onscroll = function() { windowScroll() };

function windowScroll() {
    var headerHeight = $(".site-header").height();
    if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
        $(".site-header").addClass('is-pinned');
        $("#btnGotop").fadeIn('slow');
    } else {
        $(".site-header").removeClass('is-pinned');
        $("#btnGotop").fadeOut('slow');
    }
}

// open expanded header menu
$("#button-expand").on('click', menuExpand);
$("#button-collapse").on('click', menuCollapse);

function menuExpand(e) {
    $('#wrap-menu').addClass('is-active');
    $("#button-expand").hide();
    $("#button-collapse").show();
}

function menuCollapse(e) {
    $('#wrap-menu').removeClass('is-active');
    $("#button-expand").show();
    $("#button-collapse").hide();
}

// search click
$('#button-search').on('click', searchClick);

function searchClick(e) {
    menuExpand();
    $('#searchInput').focus();
}

/*sticky ads*/
function stickyads(contentbox, sidebarbox, sidebartop, sticky, top) {
    $(window).scroll(function() {
        var contentHeight = $(contentbox).height();
        var sidebarWidth = $(sidebarbox).width();
        var sidebarHeight = $(sidebarbox).height();
        if (sidebarHeight <= contentHeight) {
            var curPos = $(window).scrollTop();
            var stickyTop = curPos - top;
            if ($(sidebartop).length > 0) {
                stickyTop = curPos - $(sidebartop).offset().top - $(sidebartop).height();
            }
            var stickyBottom = curPos - $(contentbox).offset().top - $(contentbox).height() + $(sticky).outerHeight() + top;
            if (stickyTop > 0) {
                $(sticky).css('position', "fixed");
                $(sticky).css("top", top + "px");
                $(sticky).css("margin", "0 0 0 10px");
                $(sticky).css("width", sidebarWidth + "px");
            } else {
                $(sticky).removeAttr("style");
                $(sticky).css("top", "0px");
            }
            if (stickyBottom > 0) $(sticky).css("top", -1 * stickyBottom);
        }
    });
}