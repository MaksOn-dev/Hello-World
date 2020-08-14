jQuery(document).ready(function($) {
	/*--------------------------------------------------------------------------------------------------------------------------
	Скрытие "placeholder" для инпута если поле содержит значение
	--------------------------------------------------------------------------------------------------------------------------*/
	// Если поле не пустое - скрываем "placeholder"
	$('input[type=text], input[type=email], input[type=tel], input[type=password]').each(function(el) {
		if($(this).val() != ""){
			$(this).parent().find("._input-placeholder").css('display', 'none');
		}
	});

	// Скрываем placeholder если поле в фокусе
	$("input[type=text], input[type=email], input[type=tel], input[type=password]").on('focus', function() {
		$(this).parent().find("._input-placeholder").css('display', 'none');
	});

	// Если поле потеряло фокус
	$("input[type=text], input[type=email], input[type=tel], input[type=password]").on('focusout', function() {
		// Если поле не пустое - скрываем "placeholder"
		if($(this).val() != ""){
			$(this).parent().find("._input-placeholder").css('display', 'none');
		// Если пустое - отображаем placeholder
		}else{
			$(this).parent().find("._input-placeholder").css('display', 'block');
		}
	});


	/*--------------------------------------------------------------------------------------------------------------------------
	Фон навбара при позиции экрана больше нуля и скрытие/раскрытие набара при скролле вниз/вверх
	--------------------------------------------------------------------------------------------------------------------------*/
	// При событии скролл
	var posLast = $(window).scrollTop();
	$(window).on('scroll', function() {

		// Скрытие/раскрытие набара при скролле вниз/вверх
		// Если страница скроллится вниз
		if((posLast) < $(this).scrollTop() && posLast > 150){
			// Убираем меню вверх
			$(".res-boot ._container-navbar").addClass('out');;
        // Если страница скроллится вверх
		}else if((posLast) > $(this).scrollTop()){
			// Выдвигаем меню сверху
			$(".res-boot ._container-navbar").removeClass('out');
		}
		posLast = $(window).scrollTop();
	});


	/*--------------------------------------------------------------------------------------------------------------------------
	Плавный скролл при нажатии на ссылку-якорь
	--------------------------------------------------------------------------------------------------------------------------*/
	$(".navbar a[href^='#']").on('click', function(event) {
		event.preventDefault();
		
		var $anchor = $(this).attr("href"),
			$anchorPos = $($anchor).offset().top;

		$("html").animate({scrollTop: $anchorPos-20}, 500);
	});

});
