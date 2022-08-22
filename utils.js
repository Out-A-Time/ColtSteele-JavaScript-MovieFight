//this clears timeoutId, and assign new one straight after with setTimeout
//waiting a 1 sec to fetch data when user taping inside search
//it is called "Debouncing an input"
const debounce = (callback, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
};
