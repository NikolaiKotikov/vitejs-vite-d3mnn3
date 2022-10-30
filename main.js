import './style.scss';
import { animate } from './scripts/animate';
import { ImagesLoader } from './scripts/ImagesLoader';
import { renderImages } from './scripts/renderImages';
import { updateCounter, removeLoader, renderError } from './scripts/pageLoader';
import { IMAGES_AMOUNT } from './scripts/const';

const imagesLoader = new ImagesLoader(IMAGES_AMOUNT, 0, 60000);

imagesLoader.onComplete(() => {
  removeLoader();
  animate();
});

imagesLoader.onProgress(({ progress }) => {
  updateCounter(progress);
});
imagesLoader.onAbort(() => {
  renderError();
});

renderImages(imagesLoader);
