$(function(){
	// Запускаем галерею
	$('.gallery .images a').touchTouch();

	// Скорость анимации, в мл сек
	var speed = 700;

	// Находим класс checked в фильтре. Скрываем изображения, не подходящие под этот фильтр
	$('.gallery .images a').not('.cat-' + $('.gallery .block-title-filters .filters button.checked').attr('class').split(' ')[0]).hide();
	// При клике на кнопку определенного фильтра ------------------------------------------
	$('.gallery .block-title-filters .filters button').on('click', function() {
		// Изменение класса кнопок фильтра при нажатии
		// Удаляем класс у предыдущего фильтра
		$('.gallery .block-title-filters .filters button.checked').removeClass('checked');
		// Добавляем класс выбранному фильтру
		$(this).addClass('checked');

		// Раскрываем отфильтрованные изображения (не более 20 шт.)
		// Если выбран фильтр All - раскрываем все изображения
		if($(this).attr('class').split(' ')[0] == 'all'){
			console.log('go');
			$('.gallery .images a').slice(0,20).fadeIn(speed);
		}else{
			// В противном случае - скрываем ненужные изображения, и раскрываем нужные
			$('.gallery .images a').not('.cat-' + $(this).attr('class').split(' ')[0]).fadeOut(speed);
			$('.gallery .images a.cat-' + $(this).attr('class').split(' ')[0]).slice(0,20).fadeIn(speed);
		}
	});
});