import './css/index.scss';

const compass = document.querySelector('.compass');
const arrow = document.querySelector('.compass__arrow');

init();

async function init() {
  const isSupported = !!getEventName();
  if (!isSupported) return;

  const needPermission = typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
  if (!needPermission) {
    initListener();
    return;
  }

  const permission = await DeviceOrientationEvent.requestPermission();
  if (permission === 'granted') {
    initListener();
  }
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
