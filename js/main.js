document.addEventListener("DOMContentLoaded", function () {
    function toggleContent(toggleButton, parentItemClass, toggleBlockElem) {
        let toggleContentParent = toggleButton.closest(parentItemClass),
            toggleContent = toggleContentParent.querySelector(toggleBlockElem)
        if (!toggleContent.classList.contains('show')) {
            toggleButton.classList.add('open');
            toggleContent.classList.add('show');
            toggleContent.style.height = 'auto';
            let height = toggleContent.clientHeight + 'px';
            toggleContent.style.height = '0px';
            setTimeout(function () {
                toggleContent.style.height = height;
            }, 100);
        } else {
            toggleContent.style.height = '0px';
            toggleContent.addEventListener('transitionend',
                function () {
                    toggleContent.classList.remove('show');
                    toggleButton.classList.remove('open');
                }, {
                once: true
            });
            toggleButton.classList.remove('open');
        }
    }
    let togglerBtns = document.querySelectorAll('.toggle-content__elem_title');
    if (togglerBtns) {
        for (let index = 0; index < togglerBtns.length; index++) {
            const toggleButton = togglerBtns[index];
            toggleButton.addEventListener('click',
                function (event) {
                    if (window.innerWidth <= 576 && !document.querySelector('#all-tours')) {
                        toggleContent(toggleButton, '.toggle-content__elem', '.toggle-content__elem_block')
                    }
                    if (window.innerWidth <= 768 && document.querySelector('#all-tours')) {
                        toggleContent(toggleButton, '.toggle-content__elem', '.toggle-content__elem_block')
                    }
                });
        }
    }

    const offerTitle = document.querySelector('.all-tour__offer .offer__title');
    if (offerTitle) {
        offerTitle.onclick = function () {
            if (window.innerWidth <= 576 && document.querySelector('#all-tours')) {
                toggleContent(offerTitle, ".all-tour__offer ", '.offer__list');
            }
        }
    }

    const mobileMenu = document.querySelector('.mobile_menu');
    const searcPanel = document.querySelector('.search__panel');
    //Открытие и закрытие меню поиска
    function searchOpen(e) {
        const openSearchBtn = event.target.closest('.header__search');
        const openSearchBtnMobile = event.target.closest('.mobile__search');

        const closeSearchBtn = event.target.closest('.search__close');
        const isHeaderBg = document.querySelector('.header__bg');
        const headerHeight = document.querySelector('#header').clientHeight;


        if (openSearchBtn || openSearchBtnMobile) {
            searcPanel.classList.add('show');
            if (isHeaderBg) {
                searcPanel.style.maxHeight = `${headerHeight}px`;
            }
        }
        if (closeSearchBtn && searcPanel.classList.contains('show')) {
            searcPanel.classList.remove('show');
        }

    }
    function searchClose(e) {
        if (mobileMenu.classList.contains('show') && e.key === "Escape") {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = "";
        }
        if (searcPanel.classList.contains('show') && e.key === "Escape") {
            searcPanel.classList.remove('show');
        }
    }
    function scrollToTop(e) {
        const btnToTop = e.target.closest('.to_top_btn');
        if (btnToTop) {
            document.body.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    function mobileMunuOpen(e) {
        const openMenuBtn = event.target.closest('.burger_menu');
        const closeSearchBtn = event.target.closest('.mobile__close');
        if (openMenuBtn) {
            mobileMenu.classList.add('show');
            document.body.style.overflow = "hidden";
        }
        if (closeSearchBtn && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = "";
        }
    }
    function galeryShowThumb(e) {
        const galetyThumb = e.target.closest('.galery__thumb');
        if (galetyThumb) {
            const thisGalery = galetyThumb.closest('.galery');
            const galetyThumbParent = galetyThumb.closest('.galery__thumbs');
            galetyThumbParent.querySelector('.galery__thumb.active').classList.remove('active');
            galetyThumb.classList.add('active');

            const thumbPicture = galetyThumb.querySelector('picture');
            const imageSrc = thumbPicture.querySelector("img").dataset.largesrc;
            const imageSourse = thumbPicture.querySelector("source").srcset;

            const largePicture = thisGalery.querySelector('.galery__large_image_wrapper picture');
            const galeryLargeImage = largePicture.querySelector("img");
            const galeryLargeSourse = largePicture.querySelector("source");

            galeryLargeImage.src = imageSrc;
            if (galeryLargeSourse && imageSourse) {
                galeryLargeSourse.srcset = imageSourse;
            }

        }
    }
    function mobileTouchEvent(e) {
        const touchEvent = e.target.closest('.filter__choice li');
        if (touchEvent) {
            touchEvent.classList.remove('hover');
        }
    }


    function addHoverClass(e) {
        const hoverElem = e.target.closest('.filter__choice li');
        if (hoverElem && !e.sourceCapabilities.firesTouchEvents) {
            hoverElem.classList.add('hover');
        }
    }
    function removeHoverClass(e) {
        const hoverElem = e.target.closest('.filter__choice li');
        if (hoverElem && hoverElem.classList.contains('hover')) {
            hoverElem.classList.remove('hover');
        }
    }

    document.addEventListener('click', scrollToTop);
    document.addEventListener('click', searchOpen);
    document.addEventListener('click', mobileMunuOpen);
    document.addEventListener('keydown', searchClose);
    document.addEventListener('click', galeryShowThumb);
    document.addEventListener('mouseover', addHoverClass, true);
    document.addEventListener('mouseout', removeHoverClass, true);
    document.addEventListener('touchstart', mobileTouchEvent);

    function formatState(state) {
        if (!state.id) { return state.text; }
        var $state = $(
            `<div class="option_variant">
                 <h5>${state.element.value}</h5>
                 <span>${state.element.dataset.amount}</span>
            </div>`
        );
        return $state;
    };
    function stateSelection(state) {
        if (!state.id) { return state.text; }
        var $state = state.element.value;
        return $state;
    }
    //Динамический адаптив
    const item = document.querySelector('.header.tour .header__content .header__desc');
    if (item) {
        const parent_original = document.querySelector('.header.tour .header__content');
        const parent = document.querySelector('.tour-program__absolute_block');
        //Функция
        function move() {
            const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (viewport_width <= 576) {
                if (!item.classList.contains('done')) {
                    parent.insertBefore(item, parent.children[0]);
                    item.classList.add('done');
                }
            } else {
                if (item.classList.contains('done')) {
                    parent_original.insertBefore(item, parent_original.children[1]);
                    item.classList.remove('done');
                }
            }
        }
        //Вызываем функцию
        move();
        //Слушаем изменение размера экрана
        window.addEventListener('resize', move);

    }
    //Динамический адаптив
    const item2 = document.querySelector('.dates.jumping');
    if (item2) {
        const parent_original2 = document.querySelector('.right-content-block .left-col');
        const parent2 = document.querySelector('.right-content-block .right-col');
        //Функция
        function move2() {
            const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (viewport_width <= 576) {
                if (!item2.classList.contains('done')) {
                    parent2.insertBefore(item2, parent2.children[3]);
                    item2.classList.add('done');
                }
            } else {
                if (item2.classList.contains('done')) {
                    parent_original2.insertBefore(item2, parent_original2.children[2]);
                    item2.classList.remove('done');
                }
            }
        }
        //Вызываем функцию
        move2();
        //Слушаем изменение размера экрана
        window.addEventListener('resize', move2);

    }
    // Проверка подключения jquery
    if (window.jQuery) {
        // Стилизация селекта
        $(document).ready(function () {
            $('#date-select').select2({
                templateResult: formatState,
                templateSelection: stateSelection,
                minimumResultsForSearch: Infinity
            });
            $('#amount-select').select2({
                minimumResultsForSearch: Infinity
            });
        });
        //Календарь
        $(function () {
            $.datepicker.regional['ru'] = {
                closeText: 'Закрыть',
                prevText: 'Предыдущий',
                nextText: 'Следующий',
                currentText: 'Сегодня',
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
                dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
                dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                weekHeader: 'Не',
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['ru']);

            $(".calendar__from").datepicker({
                showOn: "button",
                buttonImage: "./img/calendar-icon.png",
                buttonImageOnly: true,

            });
            $(".calendar__to").datepicker({
                showOn: "button",
                buttonImage: "./img/calendar-icon.png",
                buttonImageOnly: true,

            });
        });
    }

    const mapWrapper = document.querySelector('.roadmap__img');
    if (mapWrapper) {
        const imageInWrapper = mapWrapper.querySelector('img');
        imageInWrapper.addEventListener('load', () => {
            const scroolValue = mapWrapper.scrollWidth / 6;
            mapWrapper.scrollLeft += scroolValue;
        })
    }
});