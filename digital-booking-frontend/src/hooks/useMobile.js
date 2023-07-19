/* eslint-disable no-unused-vars */
const navigator = window.navigator.userAgent;

const matchDevices = [
  /mobile/i,
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
];

const useDevice = () => {
  // TODO: code to detect anothert devices
};

const useMobile = () => {
  let isMobile = false;
  if (navigator.toLowerCase().match(/mobile/)) {
    isMobile = true;
  }
  return isMobile;
};

export { useMobile, useDevice };
