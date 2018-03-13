import './team_slider'

class Slider {
    constructor(cssSelector) {
        this.rootElement = document.querySelector(cssSelector);
        this.slides = Array.from(this.rootElement.querySelectorAll('.team__slider'));
        this.pager = Array.from(this.rootElement.querySelectorAll('.team__slider__pager__item'));
        this.slideIndex = 0;
        this.pagerIndex = 0;
        this.intervalIdSlides = 0;
        this.intervalIdPager = 0;

        this.init();
    }

    init() {
        this.autoShowSlides();
        this.autoShowPager();
        this.handleEvents();
    }

    handleEvents() {

        this.pager.forEach((item, i)=> {
            item.addEventListener('click', (e)=> {
                this.slideIndex = i;
                if(e.target) {
                    this.goToSlide(this.slideIndex);
                    if(!(e.target.classList.contains('active'))) {
                        this.pager.forEach((el)=> {
                            el.classList.remove('active')
                        });
                        e.target.classList.add('active');
                    }
                }
            })
        });

        this.rootElement.addEventListener('mouseenter', ()=> {
            clearInterval(this.intervalIdSlides);
        });

        this.rootElement.addEventListener('mouseleave', ()=> {
            this.autoShowSlides();
        });

        this.rootElement.addEventListener('mouseenter', ()=> {
            clearInterval(this.intervalIdPager);
        });

        this.rootElement.addEventListener('mouseleave', ()=> {
            this.autoShowPager();
        });
    }

    nextSlide() {
        this.goToSlide(this.slideIndex + 1)
    }

    nextPager() {
        this.goToPager(this.pagerIndex + 1)
    }

    goToSlide(n) {
        this.slides.forEach((el)=> el.classList.remove('active'));
        this.slideIndex = (n + this.slides.length)%this.slides.length;
        this.slides[this.slideIndex].classList.add('active');
    }

    goToPager(n) {
        this.pager.forEach((el) => el.classList.remove('active'));
        this.pagerIndex = (n + this.pager.length)%this.pager.length;
        this.pager[this.pagerIndex].classList.add('active');
    }

    autoShowSlides() {
        this.intervalIdSlides = setInterval(this.nextSlide.bind(this), 4000)
    }

    autoShowPager() {
        this.intervalIdPager = setInterval(this.nextPager.bind(this), 4000)
    }

}

export {Slider};