const container = document.querySelector('.container');
let lastCard = container.lastElementChild;

const getRandomColor = () => {
  const h = Math.floor(Math.random() * 255);

  return `hsl(${h}deg, 90%, 85%)`;
};

const populateCards = (num) => {
  for (let i = 0; i < num; i += 1) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    div.classList.add('card');
    div.style.backgroundColor = getRandomColor();
    p.textContent = 'Infinite scrolling card';

    div.appendChild(p);
    container.appendChild(div);
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      populateCards(5);
      observer.unobserve(lastCard);
      lastCard = document.querySelector('.container').lastElementChild;
      observer.observe(lastCard);
    }
  });
});
observer.observe(lastCard);