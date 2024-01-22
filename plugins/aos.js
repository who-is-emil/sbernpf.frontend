import AOS from 'aos';
import 'aos/dist/aos.css';

export default ({ app }) => {
  // eslint-disable-next-line new-cap
  app.AOS = new AOS.init({
    disable: false,
    duration: 600,
    easing: 'ease-in-out-cubic',
    once: true
  });
};
