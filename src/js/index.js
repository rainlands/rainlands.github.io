require('./rain')
require('./fog')

const getRandomInt = (min, max) =>
  Math.random() * (max - min) + min;

const container = document.querySelector('#root');

const makeLightning = () => {
  setTimeout(() => {
    container.style.transition = '0.1s';
    container.style.opacity = 0.9;
    container.style.filter = 'brightness(1.1) contrast(0.9) invert(0.1) blur(1px)';
    container.style.transform = `
      scale(1.02)
    `;
    setTimeout(() => {
      container.style.filter = 'none';
      container.style.opacity = 0.5;
      container.style.transition = '3s';

      setTimeout(() => {
        container.style.opacity = 1;
        container.style.transform = `
          scale(1)
        `;

        setTimeout(makeLightning, getRandomInt(10000, 30000));
      }, getRandomInt(50, 150));
    }, getRandomInt(250, 750));
  }, getRandomInt(500, 1500));
}


makeLightning();
// setTimeout(makeLightning, 100);
