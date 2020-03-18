let hasInitedLazyImageEvent = false;


function initLazyImageEvent() {
  if (hasInitedLazyImageEvent === true) {
    console.warn('initLazyImageEvent: has inited!');
    return;
  }
  window.addEventListener('scroll', lazyLoadImages);
  hasInitedLazyImageEvent = true;
}


function lazyLoadImages(event) {
  const $body = document.querySelector('body');
  const $lazyList = $body.querySelectorAll('[data-image-lazy-src][data-image-lazy-status="none"]');
  const windowHeight = window.outerHeight;
  for (let i = 0; i < $lazyList.length; i++) {
    const $lazy = $lazyList[i];
    const lazyOffsetTop = $lazy.offsetTop;
    const bodyScrollTop = $body.scrollTop;

    if (bodyScrollTop + windowHeight >= lazyOffsetTop) {
      const src = $lazy.getAttribute('data-image-lazy-src');
      const $image = document.createElement('img');
      $image.src = src;
      $lazy.after($image);
      $lazy.remove();
    }
  }
}

export {
  initLazyImageEvent,
}