const container = document.querySelector('#rain-root');

const getRandomInt = (min, max) =>
  Math.random() * (max - min) + min;

const createCloud = () => {
  const cloud = document.createElement('div');
  const { innerWidth } = window;

  cloud.className = 'cloud';
  const size = [
    getRandomInt(800, 1500),
    getRandomInt(700, 1000),
  ];
  cloud.style.top = getRandomInt(0 - size[1], window.innerHeight - 100) + 'px';
  cloud.style.left = -size[0] + 'px';

  cloud.style.width = size[0] + 'px';
  cloud.style.height = size[1] + 'px';

  return cloud;
};

const animateClouds = (clouds, speed) => {
  clouds.forEach((drop, index) => {
    const { translateX = 0, translateY = 0 } = drop.transform;

    drop.domElement.style.transform = `
      translateX(${translateX}px)
      translateY(${translateY}px)
    `;

    drop.transform.translateX += drop.speed * speed;
    drop.transform.translateY += speed / 5;

    if (translateX > window.innerWidth + drop.width) {
      drop.domElement.remove();
      clouds.splice(index, 1);
    }
  });
}

let clouds = [];
let cloudSpeed = 1;

const addNewDropsRecursively = () => {
  const cloud = createCloud();

  container.appendChild(cloud);

  clouds.push({
    width: parseInt(cloud.style.width, 10),
    transform: {
      translateX: 0,
      translateY: 0,
    },
    speed: getRandomInt(1, 2),
    domElement: cloud
  });

  setTimeout(addNewDropsRecursively, getRandomInt(8000, 15000));
}

addNewDropsRecursively();

setInterval(() => {
  animateClouds(clouds, cloudSpeed);
}, 1000 / 30);
