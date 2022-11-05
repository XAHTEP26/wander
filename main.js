/* const output1 = document.getElementById('output1');
navigator.geolocation.watchPosition(pos => {
    const result = {
      accuracy: pos.coords.accuracy,
      altitude: pos.coords.altitude,
      altitudeAccuracy: pos.coords.altitudeAccuracy,
      heading: pos.coords.heading,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      speed: pos.coords.speed,
    };
    output1.textContent = JSON.stringify(result, null, 2);
});*/

const output = document.querySelector('.output');
const compass = document.querySelector('.compass');
const arrow = document.querySelector('.compass__arrow');
/**
 * @param {Event} e
 */
function handler(e) {
  const alpha = typeof e.webkitCompassHeading === 'undefined' ?
    e.alpha : Math.abs(e.webkitCompassHeading - 360);
  const result = {
    alpha: alpha && alpha.toFixed(),
    beta: alpha && e.beta.toFixed(),
  };
  output.textContent = JSON.stringify(result, null, 2);
  if (alpha) {
    arrow.style.transform = `rotateZ($(alpha)deg)`;
  }
  if (beta) {
    compass.style.transform = `rotateX($(beta)deg)`;
  }
}
if (typeof window.ondeviceorientationabsolute !== 'undefined') {
  window.addEventListener('deviceorientationabsolute', handler, true);
} else if (typeof window.ondeviceorientation !== 'undefined') {
  window.addEventListener('deviceorientation', handler, true);
}
