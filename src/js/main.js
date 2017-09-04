(function() {

  let scroll = new SmoothScroll('a[href*="#"]');

  function galleryPrevSize() {
    let chalk1 = document.getElementsByClassName('chalk')[3];
    let chalk2 = document.getElementsByClassName('chalk')[4];
    let prevs  = document.getElementsByClassName('gallery-prev');
    let fullHeight = chalk1.offsetHeight || chalk1.clientHeight ||
                      chalk2.offsetHeight || chalk2.clientHeight;
    for(let key in prevs) {
      if(prevs.hasOwnProperty(key)) {
        let p = prevs[key];

        p.style.height = `${fullHeight / 2}px`;
      }
    }
  }

  function initResponsive() {
    galleryPrevSize();

    window.addEventListener('resize', galleryPrevSize, true);
  }

  function initScrollAnimations() {
    animate(document.getElementById('info-box'), 'fadeInUp');
    animate(document.getElementById('logo'), 'fadeIn');
    animate(document.getElementById('header-buttons'), 'fadeIn');
    iterateObject(document.getElementsByClassName('outer-button'), addFadeInAnimation);
  }

  function addFadeInAnimation(el) {
    animate(el, 'fadeInUp')
  }

  function animate(el, animation) {

    el.scrollEvent = function() {
      if(isScrolledIntoView(el)){
        let currentClass = el.getAttribute('class');
        let newClass     = `${currentClass} animated ${animation}`;
        el.setAttribute('class', newClass);
        window.removeEventListener('scroll', el.scrollEvent);
      }
    }

    window.addEventListener('scroll', el.scrollEvent);
    el.scrollEvent();
  }

  function iterateObject(obj, func) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        func(obj[key]);
      }
    }
  }

  function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom - window.innerHeight * .2;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
  }


  function BackgroundLoader(url, seconds, success) {
    let image = new Image();

    image.onload = function () {
      let div    = document.getElementById('home');
      let loader = document.getElementById('loader');
      div.style.backgroundImage = "url('" + url + "')";
      loader.setAttribute('class', 'loading loaded');
      setTimeout(() => loader.remove(), 250);

      initScrollAnimations();
    }
    image.src = url;
  }

  function parallax(id, offset) {
  	let $slider = document.getElementById(id);
    let $sliderOffset = $slider.offsetTop;

  	let yPos = window.pageYOffset / 5.5;
  	yPos = -yPos / 2 + offset;

    if(yPos > 0) yPos = 0;

  	let coords = '0% '+ yPos + 'px';
  	$slider.style.backgroundPosition = coords;
  }

  if(window.innerWidth > 992) {
    window.addEventListener('scroll', () => {
      parallax('reservations', 0);
      parallax('careers', 180);
    });
  } else if(window.innerWidth <= 992){
    window.addEventListener('scroll', () => {
      parallax('reservations', 0);
      parallax('careers', 280);
    });
  }

  BackgroundLoader('/public/assets/header.png', 1)
  initResponsive();

  let gallery = {
    'kitchen': {

    }
  }
})();
