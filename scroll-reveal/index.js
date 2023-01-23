const revealElements = document.querySelectorAll('[data-reveal]');

const scrollReveal = () => {
  for (let i = 0; i < revealElements.length; i += 1) {
    const isElementsOnScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight;

    if (isElementsOnScreen) {
      revealElements[i].classList.add('revealed');
    } else {
      revealElements[i].classList.remove('revealed');
    }
  }
};

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);