"use strict"
// Slider

new Swiper('.testimonials__swiper', {
    navigation: {
        nextEl: '.testimonials__slider-next',
        prevEl: '.testimonials__slider-prev',
    },
    loop: true,
    autoHeight: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        992: {
            slidesPerView: 2,
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        if(error === 0) {
            form.reset();
        } else {
            console.log("not");
        }

    }

    function formValidate(e) {
        let error = 0;

        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError (input);

            if(input.classList.contains('_email')) {
                if(!emailTest(input)) {
                    formAddError (input);
                    error++;
                }
            } else if (input.classList.contains('_name')) {
                if(!nameTest(input)) {
                    formAddError (input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error;
    }

    function formAddError (input) {
        input.classList.add('_error')
    }

    function formRemoveError (input) {
        input.classList.remove('_error')
    }

    function emailTest(input) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function nameTest(input) {
        return /^(?![\d+_@.-]+$)[a-zA-Z0-9+_@.-]*$/.test(input.value);
    }
})

// Мобильное меню бургер
function burgerMenu() {
    const burger = document.querySelector('.icon-menu')
    const menu = document.querySelector('.menu')
    const body = document.querySelector('body')
    burger.addEventListener('click', () => {
      if (!menu.classList.contains('active')) {
        menu.classList.add('active')
        burger.classList.add('active-burger')
        body.classList.add('locked')
      } else {
        menu.classList.remove('active')
        burger.classList.remove('active-burger')
        body.classList.remove('locked')
      }
    })
}
burgerMenu()

//Tabs========================================================================================================================================================


function tabs(headerSelector, tabSelector, contentSelector, activeClass, display='flex', justifyContent='space-between') {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector)
    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none'
        });
        tab.forEach(item => {
            item.classList.remove(activeClass)
        });
    }
    function showTabContent(i = 0) {
       content[i].style.display = display
       content[i].style = `justify-content = ${justifyContent}`
       tab[i].classList.add(activeClass)
    }
    hideTabContent()
    showTabContent()
    header.addEventListener('click', e => {
        const target = e.target
        if (target.classList.contains(tabSelector.replace(/\./, '')) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
            tab.forEach((item, i) => {
                if ( target == item || target.parentNode == item ) {
                    hideTabContent()
                    showTabContent(i)
                }
            });
        }
    })
}

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
tabs( '.services__tabs' ,'.services__tabs-item', '.services__tabs-block', '.active-tab')

//Preloader========================================================================================================================================================

let mask = document.querySelector('.mask');

setTimeout(() => {
    mask.remove();
}, 2000)

//ProgresBar========================================================================================================================================================

const progress = document.querySelector('.progress');

const progressBar = () => {
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100;

    progress.style.width = per + '%';
    
}

window.addEventListener('scroll', progressBar);

//Scrole Animation========================================================================================================================================================

const scrollNews = document.querySelectorAll('._anim-items');

if(scrollNews) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll(params) {
        for (let index = 0; index < scrollNews.length; index++) {
            const animItem = scrollNews[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if(animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active-news');
            } else {
                animItem.classList.remove('_active-news');
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX || document.documentElement.scrollLeft,
        scrollTop = window.scrollY || document.documentElement.scrollTop;

        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
}

//Weather widget========================================================================================================================================================

const widget = document.querySelector('.weather__widget');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ccab8781dcmsh6cb65233915cb85p1fff9ajsn6cf6d5ed1738',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Kiev', options)
	.then(response => response.json())
	.then(response => {
        widget.innerHTML = `
        <div class="weather__inner">
            <div class="weather__widget-city">
                ${response.location.name}
            </div>
            <div class="weather__widget-c">
                ${response.current.feelslike_c}C
            </div>
            <div class="weather__widget-f">
            ${response.current.feelslike_f}F
            </div>
        </div>
        `;
    })
	.catch(err => console.error(err));