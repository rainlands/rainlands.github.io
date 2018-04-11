const container = document.querySelector('#rain-root');

const getRandomInt = (min, max) =>
  Math.random() * (max - min) + min;

const createRainDrop = () => {
  const rainDrop = document.createElement('div');
  const { innerWidth } = window;

  rainDrop.className = 'rainDrop';
  rainDrop.style.left = getRandomInt(0 - innerWidth / 2, window.innerWidth + window.innerWidth / 2) + 'px';

  const size = getRandomInt(2, 5) + 'px';

  rainDrop.style.width = size;
  rainDrop.style.height = size;

  return rainDrop;
};

const animateRainDrops = (rainDrops, speed, angle) => {
  rainDrops.forEach((drop, index) => {
    const { translateX = 0, translateY = 0 } = drop.transform;

    drop.domElement.style.transform = `
      translateX(${translateX}px)
      translateY(${translateY}px)
    `;

    drop.transform.translateY += drop.speed * speed;
    drop.transform.translateX += angle * drop.speed * speed;

    if (translateY > window.innerHeight || translateX > window.innerWidth + window.innerWidth / 2) {
      drop.domElement.remove();
      rainDrops.splice(index, 1);
    }
  });
}

let rainDrops = [];
let rainDropSpeed = 15;
let rainAngle = 0.5;

const addNewDropsRecursively = () => {
  const rainDrop = createRainDrop();

  container.appendChild(rainDrop);

  rainDrops.push({
    transform: {
      translateX: 0,
      translateY: 0,
    },
    speed: getRandomInt(1, 2),
    domElement: rainDrop
  });

  setTimeout(addNewDropsRecursively, getRandomInt(0, 20));
}

addNewDropsRecursively();

setInterval(() => {
  animateRainDrops(rainDrops, rainDropSpeed, rainAngle);
}, 1000 / 30);
