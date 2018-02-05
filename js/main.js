
/********************* Fixed header (start) *********************/
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
/********************* Fixed header (end) *********************/


/*********************** Form inputs (start) **********************/
$(document).on('focus', '.payment-form__input', function() {
	if( $(this).val() === "" ){
		$(this).parent().find('label').addClass('active');
	}
});
$(document).on('blur', '.payment-form__input', function() {
	if( $(this).val() === "" ){
		$(this).parent().find('label').removeClass('active');
	}
});
/*********************** Form inputs (end) **********************/


/*********************** Styled select (start) **********************/
$('select').each(function(){
	var $this = $(this), numberOfOptions = $(this).children('option').length;

	$this.addClass('select-hidden'); 
	$this.wrap('<div class="select"></div>');
	$this.after('<div class="select-styled"></div>');

	var $styledSelect = $this.next('div.select-styled');
	$styledSelect.text($this.children('option').eq(0).text());

	var $list = $('<ul />', {
		'class': 'select-options'
	}).insertAfter($styledSelect);

	for (var i = 0; i < numberOfOptions; i++) {
		$('<li />', {
			text: $this.children('option').eq(i).text(),
			rel: $this.children('option').eq(i).val()
		}).appendTo($list);
	}

	var $listItems = $list.children('li');

	$styledSelect.click(function(e) {
		e.stopPropagation();
		$('div.select-styled.active').not(this).each(function(){
			$(this).removeClass('active').next('ul.select-options').hide();
		});
		$(this).toggleClass('active').next('ul.select-options').toggle();
	});

	$listItems.click(function(e) {
		e.stopPropagation();
		$styledSelect.text($(this).text()).removeClass('active');
		$styledSelect.text($(this).text()).addClass('selected');
		$this.val($(this).attr('rel'));
		$list.hide();
		// console.log($this.val());
	});

	$(document).click(function() {
		$styledSelect.removeClass('active');
		$list.hide();
	});

});
/*********************** Styled select (end) **********************/

/***************** Changing form content (start) ******************/
$(document).on('change', '.payment-modal__radio', function(event) {
	// event.preventDefault();
	var addressForm = $('#paymentByAddress'),
		accountForm = $('#paymentByAccount'),
		$this = $(this),
		fieldset = $this.closest('.payment-modal__fieldset-wrap'),
		labelOuter = fieldset.find('.payment-modal__label_outer');
	addressForm.toggle();
	accountForm.toggle();
	labelOuter.toggleClass('inactive');	
});
/***************** Changing form content (end) ******************/

/***************** Menu mobile (start) ******************/
$(document).on('click', '.menu-link', function(event) {
	event.preventDefault();
	/* Act on the event */
	var $this = $(this),
		header = $this.closest('.header'),
		navMenu = header.find('.header__nav'),
		phone = header.find('.header__phone span').text();
	if (!$('.header__nav').find('.header__phone').length) {
		navMenu.append('<div class="header__phone">'+phone+'</div>');
	}
	
	$('body').toggleClass('stop-scroll');
	navMenu.toggleClass('mobile');
	$this.toggleClass('active');
});
/***************** Menu mobile (end) ******************/

/************* Modals (start) ***************/
$(document).on('click', '.modal__close', function(event) {
	event.preventDefault();
	$(this).closest('.modal-overlay').hide();
});

$(document).on('click', '#how-to-pay', function(event) {
	event.preventDefault();
	$('.modal-overlay_howtopay').show();
});

$(document).on('click', '#privacy-agreement', function(event) {
	event.preventDefault();
	$('.modal-overlay_privacy-policy').show();
});
/*************** Modals (end) *****************/