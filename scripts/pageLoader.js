import gsap from 'gsap';
const loaderElement = document.body.querySelector('.loader');
const counterElement = loaderElement.querySelector('.loader__count');

export const updateCounter = (progress) => {
  const percent = Math.floor(progress * 100) + '%';
  counterElement.innerHTML = percent;
};

export const removeLoader = () => {
  gsap.to(loaderElement, {
    duration: 0.8,
    clipPath: 'circle(0% at 50% 50%)',
    onComplete: () => loaderElement.remove(),
  });
  document.body.style.overflow = 'auto';
};

export const renderError = () => {
  counterElement.innerHTML = 'Something went wrong, try to reload the page.';
};
