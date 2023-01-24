const cardContainer = document.getElementById('card-container');
const cardCountElem = document.getElementById('card-count');
const cardTotalElem = document.getElementById('card-total');
const loader = document.getElementById('loader');

const cardLimit = 99;
const cardIncrease = 9;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

cardTotalElem.innerHTML = cardLimit;

let throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const getRandomColor = () => {
  const h = Math.floor(Math.random() * 255);

  return `hsl(${h}deg, 90%, 85%)`;
};

const createCard = (index) => {
  const card = document.createElement('div');
  const cardText = document.createElement('p');
  card.className = 'card';
  card.style.backgroundColor = getRandomColor();
  cardText.textContent = index;

  card.appendChild(cardText);
  cardContainer.appendChild(card);
};

const addCards = (pageIndex) => {
  currentPage = pageIndex;

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange = currentPage === pageCount ? cardLimit : pageIndex * cardIncrease;

  cardCountElem.innerHTML = endRange;

  for (let i = startRange + 1; i <= endRange; i += 1) {
    createCard(i);
  }
};

const handleInfiniteScroll = () => {
  throttle(() => {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (endOfPage) {
      addCards(currentPage + 1);
    }

    if (currentPage === pageCount) {
      loader.remove();
      window.removeEventListener('scroll', handleInfiniteScroll);
    }
  }, (1000 / 60));
};

window.onload = () => {
  addCards(currentPage);
};

window.addEventListener('scroll', handleInfiniteScroll);