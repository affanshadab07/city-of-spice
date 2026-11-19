(() => {
  const slides = [
    ["Samosa", "samosa.jpg"],
    ["Tandoori Chicken", "tandoori-chicken.jpg"],
    ["Masala Dosa", "dosa.jpg"],
    ["Malai Kofta", "malai-kofta.jpg"],
    ["Lamb Biryani", "lamb-biryani.jpg"],
    ["Chicken Noodles", "chicken-noodles.jpg"],
    ["Bullet Naan", "bullet-naan.jpg"],
    ["Ras Malai", "ras-malai.jpg"],
  ];
  const photo = document.getElementById('featuredPhoto');
  const name = document.getElementById('featuredName');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;

  function show(offset) {
    index = (index + offset + slides.length) % slides.length;
    const [dish, image] = slides[index];
    photo.src = 'images/' + image;
    photo.alt = dish;
    name.textContent = dish;
  }

  function setPlaying(playing) {
    clearInterval(timer);
    timer = playing ? setInterval(() => show(1), 5500) : undefined;
  }

  reducedMotion.addEventListener('change', event => {
    setPlaying(!event.matches);
  });
  setPlaying(!reducedMotion.matches);
})();
