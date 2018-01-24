$(window).scroll(function() {
// 80 = The point you would like to fade the nav in.
	if ($(window).scrollTop() > 80 ){
		$('.header').addClass('header_white');
	} else {
		$('.header').removeClass('header_white');
	};
});

$('.scroll').on('click', function(e){
	e.preventDefault()
	$('html, body').animate({
		scrollTop : $(this.hash).offset().top
	}, 1500);
});