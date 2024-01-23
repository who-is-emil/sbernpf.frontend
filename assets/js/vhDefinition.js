let windowWidth;
let windowHeight;
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  window.addEventListener('resize', () => {
    if (
      windowWidth === window.innerWidth &&
      windowHeight === window.innerHeight
    ) {
      return;
    };
    setVh();
  });
};

export { setVh };
