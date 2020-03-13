


function initProxyLink() {
  const $body = document.querySelector('body');
  $body.addEventListener('click', (event) => {
    if (event.target.tagName.toLocaleLowerCase() === 'a') {
      event.preventDefault();
      event.stopPropagation();
      linkEvent(event.target);
    }
  })
}

function linkEvent(a) {
  const href = a.getAttribute('href');
  console.log('href = ', href);
}

function initRouter() {
  initProxyLink();
}


export {
  initRouter
}