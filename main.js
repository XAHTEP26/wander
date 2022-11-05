/*
navigator.geolocation.watchPosition(pos => console.log({
    accuracy: pos.coords.accuracy,
    altitude: pos.coords.altitude,
    altitudeAccuracy: pos.coords.altitudeAccuracy,
    heading: pos.coords.heading,
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
    speed: pos.coords.speed,
}));
*/

const compass = document.querySelector('.compass');
const arrow = document.querySelector('.compass__arrow');

/**
 * @param {Event} e
 */
function handler(e) {
  const alpha = typeof e.webkitCompassHeading === 'undefined' ?
    e.alpha : Math.abs(e.webkitCompassHeading - 360);
  if (alpha) {
    arrow.style.transform = `rotateZ(${alpha}deg)`;
  }
  if (e.beta) {
    compass.style.transform = `rotateX(${e.beta}deg)`;
  }
}

if (
  typeof(DeviceMotionEvent) !== 'undefined' &&
  typeof(DeviceMotionEvent.requestPermission) === 'function'
) {
  DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response == 'granted') {
          if (typeof window.ondeviceorientationabsolute !== 'undefined') {
            window.addEventListener('deviceorientationabsolute', handler, true);
          } else if (typeof window.ondeviceorientation !== 'undefined') {
            window.addEventListener('deviceorientation', handler, true);
          }
        }
      })
      .catch(console.error);
} else {
  console.log('Doesn\'t supported.');
}
