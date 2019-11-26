$(function(){
	/* ===================================================================================================================
	Изменение цвета навигационной панели
	==================================================================================================================== */
	
	// Функция работы цвета панели header
	function setHeaderColor(){
		// Записываем в переменную текущую позицию окна + 50 (чтобы изменение происходило немного раньше)
		var windowPos = $(window).scrollTop() + 69;
		// Если экран находится в самом начале страницы
		if(windowPos < 70){
			// удаляем все классы из header и оставляем только стандартный
			 $header.attr('class', 'header');

		// Если экран в районе первого блока - перезаписываем классы header на классы стилей для первого блока
		}else if(windowPos < $('#block-services').offset().top) {
	        $header.attr('class', 'header home');
	        // Изменяем заголовок страницы
			$(document).prop('title', 'Home');
			// Изменяем активную вкладку
			$('#block-home .header .navbar li > a.active').removeClass('active');
			$('#block-home .header .navbar li > a').eq(0).addClass('active');

	    // Если экран в районе второго блока - перезаписываем классы header на классы стилей для второго блока
		}else if($('#block-services').offset().top < windowPos && windowPos < $('#block-about').offset().top) {
	        $header.attr('class', 'header services');
	        // Изменяем заголовок страницы
			$(document).prop('title', 'Services');
			// Изменяем активную вкладку
			$('#block-home .header .navbar li > a.active').removeClass('active');
			$('#block-home .header .navbar li > a').eq(1).addClass('active');
	        
	    // Если экран в районе третьего блока - перезаписываем классы header на классы стилей для третьего блока
		}else if($('#block-about').offset().top < windowPos && windowPos < $('#block-work').offset().top) {
	        $header.attr('class', 'header about');
	        // Изменяем заголовок страницы
			 $(document).prop('title', 'About');
			 // Изменяем активную вкладку
			$('#block-home .header .navbar li > a.active').removeClass('active');
			$('#block-home .header .navbar li > a').eq(2).addClass('active');
	        
	    // Если экран в районе четвертого блока - перезаписываем классы header на классы стилей для четвертого блока
		}else if($('#block-work').offset().top < windowPos && windowPos < $('#block-contacts').offset().top) {
	        $header.attr('class', 'header work');
	        // Изменяем заголовок страницы
			 $(document).prop('title', 'Work');
			 // Изменяем активную вкладку
			$('#block-home .header .navbar li > a.active').removeClass('active');
			$('#block-home .header .navbar li > a').eq(3).addClass('active');
	        
	    // Если экран в районе пятого блока - перезаписываем классы header на классы стилей для пятого блока
		}else if($('#block-contacts').offset().top < windowPos) {
	        $header.attr('class', 'header contacts'); 
	        // Изменяем заголовок страницы
			 $(document).prop('title', 'Contacts'); 
			 // Изменяем активную вкладку
			$('#block-home .header .navbar li > a.active').removeClass('active');
			$('#block-home .header .navbar li > a').eq(4).addClass('active');  
	    };
	}

	// Записываем в переменную элемент header
	var $header = $('#block-home .header');

	// Меняем цвет при обновлении страницы
	setHeaderColor();

	// Меняем цвет при скролле
	$(window).on("scroll", function() {
		setHeaderColor();
	});



	/* ===================================================================================================================
	Плавный скроллинг при переходе на якорь
	==================================================================================================================== */

	// Событие при клике на ссылку-якорь
	$('a[href^="#"]').on('click', function(event) {
	    // отменяем стандартное действие
	    event.preventDefault();
	    
	    // заносим информацию о том, к какому блоку надо перейти
	    var $anchor = $(this).attr("href"),
	    // определяем положение блока на странице
	        anchorPos = $($anchor).offset().top;
	    
	    // Анимация перехода
	    $('html, body').animate({scrollTop: anchorPos}, 500);
  	});



  	/* ===================================================================================================================
	Автоматический верхний отступ блока слайдера на высоту хедера при ширине устройства менее 750px
	==================================================================================================================== */
  	if($(window).width() <= 750){
  		$('.slider').css('margin-top', $('.header').height());
  	}



	/* ===================================================================================================================
	Отображение мобильного меню при нажатии на кнопку
	==================================================================================================================== */
	$('.mobile-menu-btn').on('click', function() {
		$('.navbar').slideToggle(400);

		// Добавляем класс для изменения цвета фона navbar при открытии мобильного меню
		 $('.header').toggleClass('opacity-7');

		 // Добавляем класс для изменения цвета кнопки при открытии мобильного меню
		 $(this).toggleClass('active');
	});

});