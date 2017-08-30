(function() {

  function galleryPrevSize() {
    let chalk = document.getElementsByClassName('chalk')[3];
    let prevs = document.getElementsByClassName('gallery-prev');
    let fullHeight = chalk.offsetHeight || chalk.clientHeight;
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

  initResponsive();
})();
