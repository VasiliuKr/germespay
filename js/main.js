
/********************* Fixed header (start) *********************/
$(window).scroll(function() {
// 80 = The point you would like to fade the nav in.
	if ($(window).scrollTop() > 80 ){
		$('.header').addClass('header_white');
	} else {
		$('.header').removeClass('header_white');
	};
});

// $('.scroll').on('click', function(e){
// 	e.preventDefault()
// 	$('html, body').animate({
// 		scrollTop : $(this.hash).offset().top
// 	}, 1500);
// });

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
$(document).ready(function() {
	$('#f_adrs_city').select2({
		placeholder: 'Город',
		language: {
			'noResults': function(){
				return 'Нет совпадений';
			}
		}
	});
	$('#f_adrs_street').select2({
		placeholder: 'Улица'
	});
	$('#f_adrs_house').select2({
		placeholder: 'Номер дома'
	});
	$('#f_adrs_type').select2({
		placeholder: 'Вид платежа'
	});
	$('#f_acnt_type').select2({
		placeholder: 'Вид платежа'
	});
	$('#f_acnt_object').select2({
		placeholder: 'Адрес объекта',
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

$(document).on('click', '.header__link', function(event) {
	// event.preventDefault();
	/* Act on the event */
	var $this = $(this),
		header = $this.closest('.header'),
		navMenu = header.find('.header__nav'),
		menuButton = header.find('.menu-link'),
		target = $this.attr('href');
	if (navMenu.hasClass('mobile')) {
		if (target == '#sect-2') {
			target = '.features__item.section-title';
			$('html, body').animate({scrollTop: $(target).offset().top - 100 }, 800);
		} else {
			$('html, body').animate({scrollTop: $(target).offset().top - 50 }, 800);
		}
		$('body').toggleClass('stop-scroll');
		navMenu.toggleClass('mobile');
		menuButton.toggleClass('active');
	} else {
		if (target == '#sect-2') {
			target = '.features__item.section-title';
			$('html, body').animate({scrollTop: $(target).offset().top - 100 }, 500);
		} else {
			$('html, body').animate({scrollTop: $(target).offset().top - 50 }, 500);
		}
	}
	
});

/***************** Menu mobile (end) ******************/

/************* Modals (start) ***************/
var scrollBarWidth = window.innerWidth - $('body').width();
function openModal() {
	$('html').css('margin-right', scrollBarWidth);
	$('.header__phone').css('margin-right', '8px');
	$('body').addClass('showing-modal');
};
function closeModal() {
	$('html').css('margin-right', '0');
	$('.header__phone').css('margin-right', '0');
	$('body').removeClass('showing-modal');
};
$(document).on('click', '.modal__close', function(event) {
	event.preventDefault();
	closeModal();
	$(this).closest('.modal-overlay').hide();

});

$(document).on('click', '#how-to-pay', function(event) {
	event.preventDefault();
	openModal();
	$('.modal-overlay_howtopay').show();
});

$(document).on('click', '#privacy-agreement', function(event) {
	event.preventDefault();
	openModal();
	$('.modal-overlay_privacy-policy').show();
	
});

// закрытие модалки по внешней области
// touchstart добавлен для корректной работы на iOS
$(document).on('mouseup touchstart', function (e) {
	var container = $(".modal-overlay");
	if (container.has(e.target).length === 0){
		container.hide();
		closeModal();
	}
});
/*************** Modals (end) *****************/

/**************** Validation (start)*******************/
var formAdrs = $('#paymentByAddress');
var formButtonAdrs = formAdrs.find(".btn_submit");
var formValidAdrs = false,
	emailValidAdrs = false,
	cityValidAdrs = false,
	streetValidAdrs = false,
	houseValidAdrs = false,
	flatValidAdrs = false,
	typeValidAdrs = false,
	amountValidAdrs = false;

function validateAdddressPayForm(id, val, fieldWrap) {
	
	switch(id) {
		case 'f_adrs_email':
			var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
			if(val != '' && val.match(rv_email)) {
				fieldWrap.removeClass('error');
				emailValidAdrs = true;
			} else {
				fieldWrap.addClass('error');
				emailValidAdrs = false;
			}
		break;

		case 'f_adrs_city': 
			if(val != '') {
				fieldWrap.removeClass('error');
				cityValidAdrs = true;
			}
			$('#f_adrs_street').prop('disabled', !cityValidAdrs);
		break;

		case 'f_adrs_street': 
			if(val != '') {
				fieldWrap.removeClass('error');
				streetValidAdrs = true;
			}
			$('#f_adrs_house').prop('disabled', !streetValidAdrs);
		break;

		case 'f_adrs_house': 
			if(val != '') {
				fieldWrap.removeClass('error');
				houseValidAdrs = true;
			}
		break;
		
		case 'f_adrs_flat':
			if(val != '') {
				fieldWrap.removeClass('error');
				flatValidAdrs = true;
			} else {
				fieldWrap.addClass('error');
				flatValidAdrs = false;
			}
		break;

		case 'f_adrs_type': 
			if(val != '') {
				fieldWrap.removeClass('error');
				typeValidAdrs = true;
			}
		break;

		case 'f_adrs_amount':
			var formSelectsAdrs = $('#f_adrs_city, #f_adrs_street, #f_adrs_house, #f_adrs_type');
				formSelectsAdrs.each(function(index, el) {
					if($(this).val().length == false) {
						$(this).parents('.payment-form__field-group').addClass('error');
					}
				});
			var rv_amount = /^[.,0-9]+$/;
			if(val != '' && val.match(rv_amount)) {
				fieldWrap.removeClass('error');
				amountValidAdrs = true;
			} else {
				fieldWrap.addClass('error');
				amountValidAdrs = false;
			}
			
		break;
	}
	if(emailValidAdrs && cityValidAdrs && streetValidAdrs && houseValidAdrs && flatValidAdrs && typeValidAdrs && amountValidAdrs) {
		formValidAdrs = true;
	} else {
		formValidAdrs = false;
	}
	formButtonAdrs.prop('disabled', !formValidAdrs);
}

$('input#f_adrs_email, input#f_adrs_amount, input#f_adrs_flat, select#f_adrs_city, select#f_adrs_street, select#f_adrs_house, select#f_adrs_type').unbind().change(function() {
	var id = $(this).attr('id');
	var val = $(this).val();
	var fieldWrap = $(this).parents('.payment-form__field-group');
	validateAdddressPayForm(id, val, fieldWrap);
});

$('#f_adrs_amount').keyup(function() {
	var id = $(this).attr('id');
	var val = $(this).val();
	var fieldWrap = $(this).parents('.payment-form__field-group');
	validateAdddressPayForm(id, val, fieldWrap);
});



var formAcnt = $('#paymentByAccount');
var formButtonAcnt = formAcnt.find(".btn_submit");
var formValidAcnt = false,
	emailValidAcnt = false,
	accountValidAcnt = false,
	typeValidAcnt = false,
	objectValidAcnt = false,
	amountValidAcnt = false;

function validateAccountPayForm(id, val, fieldWrap) {
	switch(id) {
		case 'f_acnt_email':
			var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
			if(val != '' && val.match(rv_email)) {
				fieldWrap.removeClass('error');
				emailValidAcnt = true;
			} else {
				fieldWrap.addClass('error');
				emailValidAcnt = false;
			}
		break;

		case 'f_acnt_account_num': 
			var rv_account = /^\d+$/;
			if(val != '' && val.match(rv_account)) {
				fieldWrap.removeClass('error');
				accountValidAcnt = true;
			} else {
				fieldWrap.addClass('error');
				accountValidAcnt = false;
			}
			$('#f_acnt_object').prop('disabled', !accountValidAcnt);
		break;

		case 'f_acnt_type': 
			if(val != '') {
				fieldWrap.removeClass('error');
				typeValidAcnt = true;
			}
		break;

		case 'f_acnt_object': 
			if(val != '') {
				fieldWrap.removeClass('error');
				objectValidAcnt = true;
			}
		break;

		case 'f_acnt_amount':
			var formSelectsAcnt = $('#f_acnt_object, #f_acnt_type');
				formSelectsAcnt.each(function(index, el) {
					if($(this).val().length == false) {
						$(this).parents('.payment-form__field-group').addClass('error');
					}
				});
			var rv_amount = /^[.,0-9]+$/;
			if(val != '' && val.match(rv_amount)) {
				fieldWrap.removeClass('error');
				amountValidAcnt = true;
			} else {
				fieldWrap.addClass('error');
				amountValidAcnt = false;
			}
		break;
	}
	if(emailValidAcnt && accountValidAcnt && typeValidAcnt && objectValidAcnt && amountValidAcnt) {
		formValidAcnt = true;
	} else {
		formValidAcnt = false;
	}
	formButtonAcnt.prop('disabled', !formValidAcnt);
}

$('input#f_acnt_email, input#f_acnt_account_num, input#f_acnt_amount, select#f_acnt_type, select#f_acnt_object').unbind().change(function() {
	var id = $(this).attr('id');
	var val = $(this).val();
	var fieldWrap = $(this).parents('.payment-form__field-group');
	validateAccountPayForm(id, val, fieldWrap);	
});

$('#f_acnt_amount').keyup(function() {
	var id = $(this).attr('id');
	var val = $(this).val();
	var fieldWrap = $(this).parents('.payment-form__field-group');
	validateAccountPayForm(id, val, fieldWrap);
});



$('#f_acnt_amount, #f_adrs_amount').on('keydown', function(e){
	if(e.key.length == 1 && e.key.match(/[^0-9'".,]/)){
		return false;
	};
});
$('#f_acnt_account_num').on('keydown', function(e){
	if(e.key.length == 1 && e.key.match(/[^0-9'"]/)){
		return false;
	};
});
/*************** Validation (end)********************/

