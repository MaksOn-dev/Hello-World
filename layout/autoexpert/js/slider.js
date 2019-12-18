$(document).ready(function(){
	/* Задаем переменные с текущим слайдом и с количеством слайдов. Проверяем наличие 
	слайдов/элементов в слайдере. Если элементы есть - скрываем все слайды, отображаем текущий слайд. Если элементов 
	нет - записываем в консоль ошибку.*/
	
	// Номер начального слайда (отсчет начинается с нуля)
	let slide = 0,
	// Ссылка на все слайды
		slidesAll = $('.slider .slideswrapper .slide'),
	// Ссылка на текущий элемент слайдера
		slideCurrent = $(slidesAll)[slide],
	// Узнаем количество слайдов
		slidesLength = $('.slider .slideswrapper .slide').length - 1;

	// Таймер автоматического перелистывания слайдов
	let timer = {
		// Должен ли работать по-умолчанию или нет
		isOn: false,
		// Работает ли в данный момент
		isWork: false,
		// Пауза, в мс
		time: 5000};
	let timerId;

	// Проверяем, есть ли слайды в слайдере. Нет - возвращаем ошибку в консоль
	if(slidesLength < 0){
		return console.log('Ошибка - изображения в слайдере не найдены.');
	};

	//Событие при клике на точку
	$('.slider .slider-dots').on('click', '.dot:not(.active)', function() {
		// Задаем переменной slide значение индекса элемента, по которому произведен клик
		slide = $(this).index();
		//Отображаем нужный слайд
		showSlide(slide);
	});

	// Событие при клике на левую стрелку
	$('.slider .arrow-left').on('click', function() {
		// Записываем в переменндую предыдущий слайд
		prevSlide()

		//Отображаем нужный слайд
		showSlide(slide);
	});

	// Событие при клике на правую стрелку
	$('.slider .arrow-right').on('click', function() {
		// Записываем в переменндую следующий слайд
		nextSlide();

		//Отображаем нужный слайд
		showSlide(slide);
	});

	// Если таймер должен работать по-умолчанию - запускаем автоматическое перелистывание
	if(timer.isOn == true){
		// Таймер должен работать - запускаем его
		timerOn();

		// Таймер на паузу, если была нажата стрелка в слайдере
		$('.slider .arrow').on('click', timerOff);

		// Запускаем таймер если мышка вне слайдера
		$('.slider').on('mouseleave', timerOn);

		// Запускаем таймер если был скролл
		$(window).scroll(timerOn);
	}

	// Высота обертки слайда при отрисовке страницы и изменении размера окна
	onDraw(slideCurrent, resizeParentHeight);
	$(window).onresize = function(){
		resizeParentHeight(slideCurrent);
	};

	// Функция отображения слайда
	function showSlide(slide){
		let visible = $('.slider .slide:visible');
		// Скрываем отображаемый слайд
		$(visible).stop().fadeTo(150, 0, 'swing', function(){
			console.log('Hide ' + $(visible).attr('class'));
			$(visible).hide();

			// Делаем новый выбранный слайд видимым
			visible = $('.slider .slide').eq(slide);
			console.log('Show ' + $(visible).attr('class') + " with number " + slide);
			$(visible).show();
			$(visible).stop().fadeTo(150, 1);
		});

		// Изменяем высоту слайда
		resizeParentHeight(slideCurrent);
		

		//Убираем класс active точки, у которой он есть
		$('.slider .slider-dots .dot.active').removeClass('active');
		//добавляем класс active для точки, по которой произведен клик
		$('.slider .slider-dots .dot').eq(slide).addClass('active');
	};

	// Функция записи в переменндую предыдущего слайда
	function prevSlide(){
		// Проверяем, первый ли это слайд
		if(slide <= 0){
			// Слайд первый - задаем переменной slide значение индекса последнего элемента
			slide = $('.slider .slide:last').index();
		}else{
			// Слайд не первый - задаем переменной slide значение индекса предыдущего элемента
			slide -= 1;
		};
	}

	// Функция записи в переменндую следующего слайда
	function nextSlide(){
		// Проверяем, последний ли это слайд
		if(slide >= slidesLength){
			// Слайд последний - задаем переменной slide значение индекса первого элемента
			slide = $('.slider .slide:first').index();
		}else{
			// Слайд не последний - задаем переменной slide значение индекса следующего элемента
			slide += 1;
		};
	}

	// Функция автоматического перелистывания
	function sliderInterval(){
		// Записываем в переменндую следующий слайд
		nextSlide();

		// Отображаем нужный слайд
		showSlide(slide);
	}

	// Функция включения таймера
	function timerOn(){
		// Запускаем таймер если он выключен
		if(timer.isWork == false){
			// Таймер выключен - включаем
			timerId = setInterval(sliderInterval, timer.time);
			// Обновляем данные о работе таймера
			timer.isWork = true;
		}
	}

	// Функция выключения таймера
	function timerOff(){
		// Выключаем таймер если он включен
		if(timer.isWork == true){
			// Таймер включен - выключаем
			clearTimeout(timerId);
			// Обновляем данные о работе таймера
			timer.isWork = false;
		}
	}

	// Задает высоту родителя равной высоте потомка
	function resizeParentHeight(element){
		let elementHeight = $(element).innerHeight(),
			parentElement = $(element).parent();

		$(parentElement).innerHeight(elementHeight);
	};

	// Выполняет функцию при полной отрисовке элемента
	function onDraw(element, funcToExec = false){
		let elementSize = {};

		let interval = setInterval(function(){

			if($(element).innerWidth() === elementSize.width &&
				$(element).innerHeight() === elementSize.height){	

				clearInterval(interval);
				if(funcToExec){
					return funcToExec(element);
				}
				return ;

			}else{
				elementSize.width = $(element).innerWidth();
				elementSize.height = $(element).innerHeight();
			};

		}, 100)
	}

});
