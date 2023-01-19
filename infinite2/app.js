const container = document.querySelector('.container');
let lastCard = container.lastElementChild;

const callback = (array) => {
  array.forEach((card) => {
    if (card.isIntersecting) {
      populateCards(5);
      observer.unobserve(lastCard);
      lastCard = document.querySelector('.container').lastElementChild;
      observer.observe(lastCard);
    }
  });
};
const getRandomColor = () => {
  const h = Math.floor(Math.random() * 255);

  return `hsl(${h}deg, 90%, 85%)`;
};

const populateCards = (num) => {
  for (let i = 0; i < num; i++) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    div.classList.add('card');
    div.style.backgroundColor = getRandomColor();
    p.textContent = 'Infinite scrolling card';

    div.appendChild(p);
    container.appendChild(div);
  }
};

const observer = new IntersectionObserver(callback);
observer.observe(lastCard);