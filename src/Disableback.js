const sheBang = '!';
const hashSign = '#';

const addHashBangToUrl = () => {
  window.location.href += hashSign;
  // Timeout to let settle earlier addtion of location
  // Dual addition of hash as browser may ignore to put history for first hash addition
  window.setTimeout(function() {
    window.location.href += sheBang;
  }, 0);
};

// eslint-disable-next-line no-extend-native
Function.prototype.attachFunctionSeq = function(fn) {
  const self = this;
  return function() {
    self.apply(this, arguments);
    fn.apply(this, arguments);
  };
};

const overrideBrowserNavigaion = () => {
  if (typeof window === 'undefined') {
    throw new Error(
      'window is undefined. This code is supposed to be run within browser.'
    );
  }

  window.onhashchange = () => {
    if (window.location.hash !== sheBang) {
      window.location.hash = sheBang;
    }
  };

  if (document.readyState === 'complete') {
    addHashBangToUrl();
  } else {
    window.onload = (window.onload || (() => {})).attachFunctionSeq(addHashBangToUrl);
  }
};

export default overrideBrowserNavigaion;