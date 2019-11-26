$(function(){
// ------------------------------------------------------------------------------------------------------------------------
	// Функция отображения/скрытия мобильного меню
	function mobileMenuActions(){
		// Добавляем/убираем класс для изменения цвета top menu
		$('.top-menu').toggleClass('mobile');
		// Убираем/добавляем класс меню для пк
		$('.navbar').toggleClass('navbar-pc');
		// Добавляем/убираем класс меню для мобильных
		$('.navbar').toggleClass('navbar-mobile');
		// Добавляем/убираем класс active кнопке отображения мобильного меню
		$('.top-menu button.mobile-menu').toggleClass('active');
		
	}

	// При нажатии на кнопку отображения мобильного меню
	$('.top-menu button.mobile-menu').on('click', mobileMenuActions);
	// При нажатии на ссылку в меню
	$('.top-menu .navbar > a').on('click', function(){
		// Праверяем, нажата ли ссылка мобильного меню
		if($(this).parent().hasClass('navbar-mobile')){
			// Если нажата - выполняем функцию
			return mobileMenuActions();
		}
	});




// ------------------------------------------------------------------------------------------------------------------------
	// Плавный скролл при нажатии на ссылку-якорь
	$('.navbar a[href^="#"]').on('click', function(event) {
		event.preventDefault();
		
		var $anchor = $(this).attr('href'),
			anchorPos = $($anchor).offset().top;

		$('html, body').animate({scrollTop: anchorPos-20}, 500);
	});



// ------------------------------------------------------------------------------------------------------------------------
	// Отображение всплывающей формы при нажатии на кнопки
	$('button.leave-request, button.order, body > .tint').on('click', function() {
		// Отображаем / скрываем форму
		$('#f_leave-request_pop-up').fadeToggle();
		// Отображаем / скрываем затемнение
		$('body > .tint').fadeToggle();
	});
	// Закрытие формы при нажати Esc
	$(document).keydown(function(eventObject){
        if (eventObject.which == 27)
            // Cкрываем видимую форму
			$('#f_leave-request_pop-up:visible').fadeOut();
			// Cкрываем видимое затемнение
			$('body > .tint:visible').fadeOut();
    });
});