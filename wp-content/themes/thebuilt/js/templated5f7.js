(function($){
$(document).ready(function() {

	'use strict';
	/**
	*	Init
	*/

	// iOS button fixes
	var iOS = false,
        p = navigator.platform;

    if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
        iOS = true;
    }
	if (iOS) {
        $('input.button, input[type="text"],input[type="button"],input[type="password"],textarea, input.input-text').css('-webkit-appearance', 'none');
        $('input').css('border-radius', '0');
    }

    // Parallax object scrolling
	var TweenController = $.superscrollorama({
		triggerAtCenter: true,
		playoutAnimations: true
	});

	// Effect for menu button
	$(".mainmenu-belowheader .navbar .nav > li.mgt-animated > a").addClass('mgt-button hvr-bounce-to-right mgt-style-solid');

	// Top mobile menu
	var topmenuopened = 0;
	$( document ).on( "click", ".menu-top-menu-container-toggle", function(e) {
		if(topmenuopened == 0) {
			$(this).next().slideDown();
			topmenuopened = 1;
		} else {
			topmenuopened = 0;
			$(this).next().slideUp();
		}
	});

	// Top menu in header
	if($(".top-menu-position-header.header-menu-bg").length > 0) {
		// Check that menu in header and not mobile and not transparent
		$("header").addClass('top-menu-position-header');
		$("header .header-center").prepend($(".top-menu-position-header.header-menu-bg"));
		$("header .header-center").append($("header .header-right"));
	}

	// Remove clearfix from posts grid in blog
	$('.mgt-grid-posts .blog-post').removeClass('clearfix');

	// Mobile menu clicks
	$('.nav li > a, .header-menu li > a').on('click', function(e){

		if($(window).width() < 767) {

			if ( $(this).next(".sub-menu").length > 0 ) {
				var sm = $(this).next(".sub-menu");

				if(sm.data('open') !== 1)
				{
					e.preventDefault();
					e.stopPropagation();
					sm.slideDown();

					sm.data('open', 1);

					$(this).parent().addClass('mobile-submenu-opened');

				}

			}
		}
	});

	$('.parallax-it-row').each(function( index ) {

		TweenController.addTween(
		  $(this),
		  (new TimelineLite())
		    .append([
		      TweenMax.fromTo($(this).find('.parallax-it-slow'), 2,
		        {y: $(this).find('.parallax-it-slow').height()*0.5, immediateRender:true},
		        {y: -1*$(this).find('.parallax-it-slow').height()}),
		      TweenMax.fromTo($(this).find('.parallax-it-medium'), 2,
		        {y: $(this).find('.parallax-it-medium').height()*1, immediateRender:true},
		        {y: -1*$(this).find('.parallax-it-medium').height()*1}),
		      TweenMax.fromTo($(this).find('.parallax-it-fast'), 2,
		        {y: $(this).find('.parallax-it-fast').height()*1.5, immediateRender:true},
		        {y: -1*$(this).find('.parallax-it-fast').height()*1.5})
		    ]),
		  1000 // scroll duration of tween
		);
	});


    // Remove animations on touch devices
    function isTouchDevice(){
	    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
	}

	if(isTouchDevice()===true) {
	    $("#animations-css").remove();
	}

	$("select").select2({
		allowClear: true,
		minimumResultsForSearch: 10
	});

	// Mobile menu
	$('.nav > li > a').on('click', function(e){

		if($(window).width() < 767) {

			if ( $(this).next(".sub-menu").length > 0 ) {
				var sm = $(this).next(".sub-menu");

				if(sm.data('open') !== 1)
				{
					e.preventDefault();
					e.stopPropagation();
					sm.css('display', 'block');

					sm.prepend('<div class="mega-menu-close">×</div>');

					sm.data('open', 1);
					$(this).parent().addClass('mobile-submenu-opened');

				}

			}
		}
	});

	// Menu Widget
	$('.sidebar.main-sidebar .widget.widget_nav_menu a, .sidebar.offcanvas-sidebar .widget.widget_nav_menu a').on('click', function(e){

			if ( $(this).next(".sub-menu").length > 0 ) {
				var sm = $(this).next(".sub-menu");

				if(sm.data('open') !== 1)
				{
					e.preventDefault();
					e.stopPropagation();
					sm.slideDown();

					sm.data('open', 1);

					$(this).parent().addClass('mobile-submenu-opened');

				}

			}

	});

	$( document ).on( "click", ".nav .mega-menu-close", function(e) {
		$(this).parent().css('display', 'none');
		$(this).parent().data('open', 0);
		$(this).parent().parent().removeClass('mobile-submenu-opened');
		$(this).remove();
	});

	// Onepage scroll
	var header_original_height = $("header.sticky-header .col-md-12").height();
	var header_fixed_height = header_original_height - 20;

	var top_menu_height = 0;
	var header_height = 0;
	var header_add_top = 0;

	// Top menu enabled
	if ( $(".header-menu-bg").length > 0 ) {
		top_menu_height = $(".header-menu-bg").height();
	}

	$(".navbar li.onepage-link-inside a.onepage-link").on('click', function(e){
		if($($(this).attr("href")).offset()) {

			header_add_top = 0;

			// Header in top position
			if(header_fixed == 0) {

				// Transparent header
				if ( $("body.transparent-header").length > 0 ) {
					header_add_top = 12 + top_menu_height;
				} else {
					header_add_top = 12;
				}
			}

			// Header after scroll
			if(header_fixed == 1) {
				header_add_top = 12;
			}

			header_height = header_fixed_height;

			$("html, body").animate({scrollTop: $($(this).attr("href")).offset().top - header_height - $("#wpadminbar").height() + header_add_top}, 500);

			return false;
		}
	});

	// Add CSS styles to shortcodes
	$('.mgt-cta-block').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
	$('.portfolio-item-image').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
	$('.mgt-post-image').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
	$('.mgt-signup-block').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
	$('.vc_row').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
	$('.fullwidth-background').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
	$('.content-block').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
	$('.mgt-menu-bg-image').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
	$('.mgt-promo-block').each(function( index ) {
        $(this).attr('style', ($(this).attr('data-style')));
    });
    $('.content-block .container-bg').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});
    $('.mgt-pricing-table h4.mgt-pricing-table-header').each(function( index ) {
		$(this).attr('style', ($(this).attr('data-style')));
	});

	// Move WooCommerce sale badge
	$('.woocommerce.single .product > span.onsale').prependTo($('.woocommerce div.product div.images.woocommerce-product-gallery'));

	// Change single page cart button style
	$('.woocommerce .product .summary.entry-summary .cart .button.alt').removeClass('alt');

	/* Adjust megamenu */
	function thebuilt_megamenufitwidth() {
		if($(window).width() > 767) {
			$(".mgt-mega-menu .nav > li").mouseenter(function() {
				if ( $(this).children(".sub-menu").length > 0 ) {

					var sm = $(this).children(".sub-menu");

					sm.css("left", "0");
					sm.css("right", "auto");

					var window_width = parseInt($(window).innerWidth());
					var sm_width = parseInt(sm.width());
					var sm_offset_left = parseInt(sm.offset().left);
					var sm_adjust = window_width - sm_width - sm_offset_left;

					if (sm_adjust < 0) {
						sm.css("left", sm_adjust-30 + "px");

					}

				}
			});
		}
	}

	thebuilt_megamenufitwidth();

	// Comments form
	$('#blog_show_comment_form').on('click', function(e){
		$(this).fadeOut();
		$('#comments-form-wrapper').slideDown();
	});

	// Fullscreen search
	$('.search-toggle-btn').on('click', function(e){

		$(document).keyup(function(e){
		    if(e.keyCode === 27)
		        $('.search-fullscreen-wrapper').fadeOut();
		});

		$('.search-fullscreen-wrapper').fadeIn();
		$('.search-fullscreen-wrapper .search-fullscreen-form input[type="search"]').focus();
		$('.search-fullscreen-wrapper .search-fullscreen-form input[type="search"]').val('');
	});

	$('.search-close-btn').on('click', function(e){
		$('.search-fullscreen-wrapper').fadeOut();
	});


	// Offcanvas menu
	function thebuilt_offCanvasSidebarInit() {
		$( ".st-sidebar-menu" ).wrapInner('<div class="nano"></div>');
		$( ".st-sidebar-menu .nano" ).wrapInner('<div class="nano-content"></div>');

		$(".st-sidebar-menu .nano").nanoScroller();

		$("html").addClass('offcanvassidebar');

		var wp_adminbar_height = 0;

		if($("#wpadminbar").length > 0) {
			wp_adminbar_height = $("#wpadminbar").height();
		}

		$("html.offcanvassidebar .st-sidebar-content-inner").css("margin-top", wp_adminbar_height);

		var container = $('#st-container'), //-sidebar
		buttons = $("#st-sidebar-trigger-effects > a"),
		// event type (if mobile use touch events)
		eventtype = mobilecheck() ? 'touchstart' : 'click',
		resetMenu = function() {
			$(container).removeClass("st-sidebar-menu-open");
			$("html").removeClass('offcanvassidebar-open');
			$("body .st-sidebar-menu").css('z-index', 1);
		},
		bodyClickFn = function(evt) {

			if( !hasParentClass( evt.target, 'st-sidebar-menu' ) ) {
				resetMenu();
				$("html").unbind( eventtype, bodyClickFn );
			}
			if( hasParentClass( evt.target, 'st-sidebar-menu-close-btn' )) {
				resetMenu();
				$("html").unbind( eventtype, bodyClickFn );
			}
		};

		buttons.each( function( i ) {

			var el = $( this );

			var effect = el.attr( 'data-effect' );

			el.on( eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();
				container.attr('class', 'st-sidebar-container');// clear
				container.addClass(effect);
				$("html").addClass('offcanvassidebar-open');

				setTimeout( function() {
					container.addClass('st-sidebar-menu-open');
				}, 25 );
				setTimeout( function() {
					$("body .st-sidebar-menu").css('z-index', 100);
				}, 1500 );
				$("html").on( eventtype, bodyClickFn );
			});
		} );

	}

	if($("#st-sidebar-trigger-effects").length > 0) {


		$( "body" ).wrapInner('<div id="st-container" class="st-sidebar-container"></div>');
		$( ".st-sidebar-container" ).wrapInner('<div class="st-sidebar-pusher"></div>');
		$( ".st-sidebar-pusher" ).wrapInner("<div class='st-sidebar-content'></div>");
		$( ".st-sidebar-content" ).wrapInner("<div class='st-sidebar-content-inner'></div>");

		$( ".st-sidebar-menu" ).insertBefore($(".st-sidebar-pusher"));


		thebuilt_offCanvasSidebarInit();
	}

/**
*	Scroll functions
*/
$(window).scroll(function () {

		var scrollonscreen = $(window).scrollTop() + $(window).height();

		// Scroll to top function
		if(scrollonscreen > $(window).height() + 350){
			$('#top-link').css("bottom", "22px");
		}
		else {
			$('#top-link').css("bottom", "-60px");
		}

});

// Transparent header
var topmenu_height = 0;
if($('.header-menu-bg').length > 0) {
	topmenu_height = $('.header-menu-bg').height();
}

if($(window).width() > 1024) {
	if($('body.transparent-header').length > 0) {
		$('header').addClass('transparent-header');
		$('.header-menu-bg').addClass('transparent-header');

		if($("#wpadminbar").length > 0) {
			wp_adminbar_height = $("#wpadminbar").height();
		} else {
			wp_adminbar_height = 0;
		}

		$("header.transparent-header").css("top", wp_adminbar_height + topmenu_height);
	}
}
// Sticky header
function thebuilt_stickyHeaderWorker() {

	// Transparent Header
	if($('body.transparent-header').length > 0) {

		var transparentscrolloffset = 60; // when we will disable transparency

		if(isTouchDevice()==false) {

			var scrolltop = $(document).scrollTop();

			if(scrolltop > transparentscrolloffset) {


				if(header_fixed == 0) {

					header_fixed = 1;

					$("header.sticky-header").addClass('fixed');
					$('header').removeClass('transparent-header');
					$('.header-menu-bg').removeClass('transparent-header');

					$("header.sticky-header .col-md-12").css("height", 50);

					$("header.sticky-header").css("top", wp_adminbar_height);

				}

			} else {

				if(header_fixed == 1) {

						$("header.sticky-header").removeClass('fixed');
						$('header').addClass('transparent-header');
						$('.header-menu-bg').addClass('transparent-header');
						$("header.sticky-header .col-md-12").css("height", header_original_height);

						$("header.transparent-header").css("top", wp_adminbar_height + topmenu_height);

						header_fixed = 0;

				}

			}

		}
	} else {
		// Regular header
		if(isTouchDevice()==false) {

			var scrolltop = $(document).scrollTop();

			if((scrolltop > ($(window).height()/2))) {

				if((header_hided == 1) && (header_fixed = 1)) {
					header_fixed = 0;
				}

				if(header_fixed == 0) {

					header_fixed = 1;

					$("header.sticky-header").addClass('fixed');

					$("header.sticky-header .col-md-12").css("height", 50);

					$("header.sticky-header").css("top", -50 + wp_adminbar_height);

					$("header.sticky-header").css("top", wp_adminbar_height);

					if($("header.sticky-header .mainmenu-belowheader").length > 0) {

						$("body").css("padding-top", header_original_height+$("header.sticky-header .mainmenu-belowheader").height());
					} else {
						$("body").css("padding-top", header_original_height);
					}

				}

			} else {

				if(header_fixed == 1) {

					$("header.sticky-header").css("top", -90 - wp_adminbar_height);

					header_hided = 1;

					if((scrolltop < ($(window).height()/2) -100)) {

						$("header.sticky-header").removeClass('fixed');
						$("body").css("padding-top", 0);
						$("header.sticky-header .col-md-12").css("height", header_original_height);

						header_fixed = 0;
						header_hided = 0;

					}
				}

			}

		}
	}
}

if($("header.sticky-header").length > 0) {
	if($(window).width() > 1024) {

		// Transparent Header
		if($('body.transparent-header').length > 0) {
			var header_fixed = 0;
			var header_original_height = 100;
			$("header.sticky-header .col-md-12").height(100);

			var header_menu_bg_original_height= 0;

			var wp_adminbar_height = 0;
			var header_hided = 0;

			if($("#wpadminbar").length > 0) {
				wp_adminbar_height = $("#wpadminbar").height();
			}

			$("header.sticky-header").css("top", wp_adminbar_height + topmenu_height);

			// Run first time

			thebuilt_stickyHeaderWorker();

		} else {
		// Regular header
			var header_fixed = 0;
			var header_original_height = $("header.sticky-header .col-md-12").height();
			var header_menu_bg_original_height= 0;
			var header_mainmenu_belowheader_height = 0;
			var wp_adminbar_height = 0;
			var header_hided = 0;

			if($("header.sticky-header .mainmenu-belowheader").length > 0) {
				header_mainmenu_belowheader_height = $("header.sticky-header .mainmenu-belowheader").height();
			} else {
				header_mainmenu_belowheader_height = 0;
			}

			if($("#wpadminbar").length > 0) {
				wp_adminbar_height = $("#wpadminbar").height();
			}

			$("header.sticky-header").css("top", -90 - wp_adminbar_height);

			// Run first time

			thebuilt_stickyHeaderWorker();

		}

		// Run on scroll
		$(window).scroll(function () {

			thebuilt_stickyHeaderWorker();

		});

	}

}

// Scroll to top event
$('#top-link').on('click', function(e){
	$('body,html').stop().animate({
		scrollTop:0
	},800,'easeOutCubic')
	return false;
});


/**
*	Resize events
*/

	$(window).resize(function () {

	});

/**
*	Other scripts
*/


/**
* Social share for products
*/


function thebuilt_facebookShare(){
	window.open( 'https://www.facebook.com/sharer/sharer.php?u='+window.location, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" )
	return false;
}
function thebuilt_googlePlusShare(){
	window.open( 'https://plus.google.com/share?url='+window.location, "googleplusWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" )
	return false;
}
function thebuilt_twitterShare(){
	if($(".section-title h1").length > 0) {
		var $page_title = encodeURIComponent($(".portfolio-item-title h1").text());
	} else {
		var $page_title = encodeURIComponent($(document).find("title").text());
	}
	window.open( 'http://twitter.com/intent/tweet?text='+$page_title +' '+window.location, "twitterWindow", "height=370,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" )
	return false;
}
function thebuilt_pinterestShare(){
	var $sharingImg;

	if($('.attachment-shop_single').length > 0) {
		$sharingImg = $('.attachment-shop_single').first().attr('src');
	}

	if($('.porftolio-slider li img').length > 0) {
		$sharingImg = $('.porftolio-slider li img').first().attr('src');
	}

	if($(".section-title h1").length > 0) {
		var $page_title = encodeURIComponent($(".portfolio-item-title h1").text());
	} else {
		var $page_title = encodeURIComponent($(document).find("title").text());
	}

	window.open( 'http://pinterest.com/pin/create/button/?url='+window.location+'&media='+$sharingImg+'&description='+$page_title, "pinterestWindow", "height=620,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" )
	return false;
}
if( $('a.facebook-share').length > 0 || $('a.twitter-share').length > 0 || $('a.pinterest-share').length > 0 || $('a.googleplus-share').length > 0)  {

	$('.facebook-share').on('click', thebuilt_facebookShare);

	$('.twitter-share').on('click', thebuilt_twitterShare);

	$('.pinterest-share').on('click', thebuilt_pinterestShare);

	$('.googleplus-share').on('click', thebuilt_googlePlusShare);

}
// Common functions
function hasParentClass( e, classname ) {
	if(e === document) return false;

	if( $( e ).hasClass( classname ) ) {
		return true;
	}
	if( $( e ).parents().hasClass( classname ) ) {
		return true;
	}
}

function mobilecheck() {
	var check = false;
	(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

});
})(jQuery);
