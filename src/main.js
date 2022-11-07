import './css/index.scss';

const compass = document.querySelector('.compass');
const arrow = document.querySelector('.compass__arrow');

init();

async function init() {
  const isSupported = !!getEventName();
  alert([0, isSupported]);
  if (!isSupported) return;

  const needPermission = typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
  alert([1, needPermission]);
  if (!needPermission) {
    initListener();
    return;
  }

  const permission = await DeviceOrientationEvent.requestPermission();
  alert([2, permission]);
  if (permission === 'granted') {
    initListener();
    return;
  }

  document.body.addEventListener(
    'click',
    async () => {
      const permission = await DeviceOrientationEvent.requestPermission();
      alert([3, permission]);
      if (permission === 'granted') initListener();
    },
    {once: true}
  );
}

function initListener() {
  const event = getEventName();
  if (!event) return;
  window.addEventListener(event, handleOrientationChange, true);
}

function handleOrientationChange(e) {
  updateCompass(e.beta);
  updateArrow(typeof e.webkitCompassHeading === 'undefined' ? e.alpha : Math.abs(e.webkitCompassHeading - 360));
}

function updateCompass(beta) {
  const angle = beta ?? 0;
  compass.style.transform = `rotateX(${angle}deg)`;
}

function updateArrow(alpha) {
  const angle = alpha ? alpha - 45 : 0;
  arrow.style.transform = `rotateZ(${angle}deg)`;
}

function getEventName() {
  if (typeof window.ondeviceorientationabsolute !== 'undefined') {
    return 'deviceorientationabsolute';
  } else if (typeof window.ondeviceorientation !== 'undefined') {
    return 'deviceorientation';
  }
}
