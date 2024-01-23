const setUTM = () => {
  const utm = window.location.search;
  const links = document.querySelectorAll('a');
  const substr = '?utm';

  if (links.length && utm.length) {
    links.forEach((link) => {
      const href = link.href.toLowerCase(); // ссылка

      if (href.includes(substr)) {
        const baseLink = href.split('?', 1)[0]; // обрезается до ?utm
        link.href = baseLink + utm; // добавляется новая utm
      }
    });
  }
};

export { setUTM };
