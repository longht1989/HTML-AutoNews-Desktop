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
if ($(".hero-zone .wrap").length > 0) {
    // do something here
    var heroSlider = $('.hero-zone .wrap').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        slideMargin: 0,
        controls: false,
        auto: true,
        pause: 6000,
        touchEnabled: false,
        onSliderLoad: function() {
            var sectionHeight = $('.hero-zone').outerHeight();
            $('.hero-zone .item').outerHeight(sectionHeight);
            $('.hero-zone .bx-viewport').outerHeight(sectionHeight);
        }
    });

    function heroSliderInit() {
        heroSlider.reloadSlider();
    }

    heroSliderInit();

    $(window).resize(function() {
        heroSlider.stopAuto(true);
        heroSliderInit();
    });
}

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

// mediumZoom in detail
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
    $('body').css({ 'overflow': 'hidden' });
}

function menuCollapse(e) {
    $('#wrap-menu').removeClass('is-active');
    $("#button-expand").show();
    $("#button-collapse").hide();
    $('body').removeAttr('style');
}

// search click
$('#button-search').on('click', searchClick);

function searchClick(e) {
    menuExpand();
    $('#searchInput').focus();
}

$('#searchInput').focus(function() {
    console.log('search on focus');
    $('.search-suggestion').show();
});

$('#searchInput').focusout(function() {
    console.log('search out focus');
    setTimeout(function() { $('.search-suggestion').hide(); }, 300);
});
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

// swap tab function
$('.tab-nav a').on('click', navtabClick);

function navtabClick(e) {
    e.preventDefault();
    e.stopPropagation();
    tab = $(this).attr('data-target');
    swapTab(tab);
}

function swapTab(tab) {
    $("a[data-target=" + tab + "]").closest(".tab-nav").find('a').removeClass('active');
    $("a[data-target=" + tab + "]").addClass('active');
    $('#' + tab).siblings(".tab-pane").removeClass('active');
    $('#' + tab).addClass('active');
}

// Remove story thumb's background when site is loaded.
$(window).on("load", function() {
    console.log('-windos has been loaded-');
    $('.story__thumb').addClass('is-loaded');
});

// click to toggle user dropdown
$('#button-user').on('click', userClick);

function userClick(e) {
    e.preventDefault();
    e.stopPropagation();
    t = $(this).data('target');
    expandDropdown(t);
}

function expandDropdown(targetDropdown) {
    $('#' + targetDropdown).addClass('is-active');
    if ($('#' + t).hasClass('is-active')) {
        $(document).mouseup(function(e) {
            var container = $("#" + t);

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass('is-active');
            }
        });
    }
}

// toggle edit in user settings
if ($('.wrapper').hasClass('user-page')) {
    $('.button-edit').on('click', function() {
        $(this).hide();
        $(this).parents('.form-group').find('.button-submit').show();
        $(this).parents('.form-wrap').find('.form-group').addClass('is-active');
        $(this).parents('.form-wrap').find('.form-control').removeAttr('disabled');
    })
    $('.button-cancel').on('click', function() {
        console.log('cancel')
        $(this).parents('.form-group').find('.button-submit').hide();
        $(this).parents('.form-wrap').find('.form-group').removeClass('is-active');
        $(this).parents('.form-wrap').find('.form-control').attr('disabled', 'disabled');
        $(this).parents('.form-group').find('.button-edit').show();
    })
}

// light gallery
if ($(".lightgallery").length > 0) {
    $(".lightgallery").lightGallery();
}