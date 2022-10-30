import { IMAGES_AMOUNT, IMAGES_PER_RAW, RAWS_AMOUNT } from './const';

const parentEl = document.body.querySelector('.grid');
const fragment = new DocumentFragment();

const makeRow = () => {
  const row = document.createElement('div');
  row.classList.add('row');
  return row;
};

let rowEl = makeRow();

export const renderImages = (loader) => {
  for (let i = 0; i < IMAGES_AMOUNT; i++) {
    // const image = loader.load(`https://picsum.photos/200/200`);
    const image = loader.load(`https://picsum.photos/200/200?random=${i}`);

    rowEl.appendChild(image);
    if ((i + 1) % IMAGES_PER_RAW === 0) {
      fragment.appendChild(rowEl);
      rowEl = makeRow();
    }
  }

  parentEl.appendChild(fragment);
};
