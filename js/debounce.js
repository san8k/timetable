const DEBOUNCE_INTERVAL = 200;

export default (fn) => {
    let lastTimeout = null;
    console.log(lastTimeout);
    return function(...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fn.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };

  };
