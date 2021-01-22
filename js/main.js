$(document).ready(function() {
	
	$('body').on('click', function(e) {
		if( !e.target.matches('.js-search-btn') ) {
			$('.js-main-search').addClass('close');
		}
	})

	$('.js-tab-toggler').on('click', function(e) {
		e.preventDefault();

		const target = $(this).data('target');

		$(this)
			.addClass('active')
			.siblings()
			.removeClass('active');

		$(`.${target}`)
			.addClass('active')
			.siblings()
			.removeClass('active');
	})
	
	$('.js-show-more-review').on('click', function(e) {
		e.preventDefault();

		if($(this).hasClass('show')) {
			$('.js-review').slideDown();
			$(this).removeClass('show');
		} else {
			const items = $('.js-review');

			for (let i = 0; i < items.length; i++) {
				const element = $(items[i]);
				if(i === 0 || i === 1) {
					continue;
				} else {
					element.slideUp();
				}
			}
			
			$(this).addClass('show');
		}
	});

	$('.js-mobile-tab-collapse').on('click', function(e) {
		e.preventDefault();
		
		const target = $(this).data('collapse');
		console.log(target);
		$(target)
			.slideToggle()
			.toggleClass('collapsed')
	});

	$('.js-show-subitems').on('click', function(e) {
		e.preventDefault();

		const elParent = $(this).parent();
		const target = $(this).data('subitems-target');

		elParent
			.addClass('active-subitems')
			.siblings()
			.removeClass('active-subitems');

		$(`.${target}`)
			.addClass('active-subitems')
			.siblings()
			.removeClass('active-subitems');

		$('.js-second-column').toggleClass('show');
	});

	$('.js-back-btn').on('click', function() {
		$('.js-second-column').toggleClass('show');
	});

	$('.js-search-btn').on('click', function() {
		$('.js-main-search').removeClass('close');
		$('.js-main-search').addClass('open');
	})

	$('.js-menu-btn').on('click', function() {
		$(this).toggleClass('active');
		$('.js-mobile-catalog-menu').toggleClass('active');

		$('body').toggleClass('overflow-hidden');
	});
	

	if($(window).width() <= 767) {
		$('.js-show-menu').on('click', function() {
			$(this).next().slideToggle();
		});
	}

	$('.js-nav-select').on('change', function(e) {
		window.location.href = $(this).val();
	})

	const elTodayProduct = $('.product-of-the-day-wrapper');

	if (elTodayProduct.length) {
		const data = elTodayProduct.data();
		setCountDownTimer(data.month, data.year, data.day);
	}


	try {
		$(".js-thin-slider").owlCarousel({
			items: 1,
			nav: true,
			dots: false,
			autoplayHoverPause: true,
			navText: ["", ""],
			animateIn: "zoomIn",
			animateOut: "zoomOut",
			autoplay: true,
			autoplayTimeout: 3000,
			margin: 0,
			lazyLoad: true
		});
	
		$('.js-zoom-img').ezPlus({
			zoomType: 'lens',
			lensShape: 'round',
			borderSize: 1,
			imageCrossfade: true,
			containLensZoom: true,
			scrollZoom: true
		});
	
	
		const owl = $('.js-product-slider').owlCarousel({
			nav: false,
			lazyLoad: true,
			items: 1,
			dotsContainer: '.js-thumb-slider',
		});
	
		
	
		$('.js-thumb-slider').on('click', 'li', function(e) {
			owl.trigger('to.owl.carousel', [$(this).index(), 300]);
			const index = $(this).index();
	
			const elsZoomBox = $('.zoomContainer');
	
			$(elsZoomBox).hide();
			$(elsZoomBox[index]).show();
		});
	
		setTimeout(() => {
			$('.js-thumb-slider li').first().trigger('click');
		}, 1000);
	
		setCountDownTimer('Aug', '16', '2020');
	
	
		$('.js-owl-carousel').owlCarousel({
			nav: false,
			lazyLoad: true,
			navText: ["", ""],
			responsive: {
				1200: {
						items: 4
				},
				768: {
						items: 2
				},
				350: {
						items: 1
				}
			}	
		})
	
	} catch (error) {
		console.log(error);
	}

	

});


function setCountDownTimer(month, day, year, hour, minute, second) {
	hour = typeof hour == 'undefined' ? 23 : hour;
	minute = typeof minute == 'undefined' ? 59 : minute;
	second = typeof second == 'undefined' ? 59 : second;

	var countDownDate = new Date(`${month} ${day}, ${year} ${hour}:${minute}:${second}`).getTime();


// Update the count down every 1 second
	var x = setInterval(function() {

		var now = new Date().getTime();

		// Find the distance between now and the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in the element with id="demo"
		// console.log(days + "d " + hours + "h "
		// + minutes + "m " + seconds + "s ");

		$('.js-counter').find('span.hours').text(hours)
		$('.js-counter').find('span.minutes').text(minutes)
		$('.js-counter').find('span.seconds').text(seconds)

		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
				$('.js-counter').find('span.hours').text(0)
				$('.js-counter').find('span.minutes').text(0)
				$('.js-counter').find('span.seconds').text(0)
		}
	}, 1000);
}

$('.product-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
		0:{
			items:1
		},
		479:{
            items:2
		},
        767:{
            items:3
		},
		961:{
			items:4
		}
    }
})