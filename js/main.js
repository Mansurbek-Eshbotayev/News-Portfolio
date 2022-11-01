let elList = document.querySelector(".news__list");
let elNavList = document.querySelector(".nav__list");
let elForm = document.querySelector(".form__search");
let elSelectLink = document.querySelector(".select__link");
let elSearchInput = document.querySelector(".form__input");
const MY_KEY = "13b4ea40e25a455abf0aebe5f987f6e5";
const URL_NEWS = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${MY_KEY}`;

// fetch create
function fetchElement(item) {
  fetch(item)
    .then((req) => req.json())
    .then((data) => {
      if (data.status == "ok") {
        let listFragment = new DocumentFragment();
        data.articles.forEach((item) => {
          let newItem = document.createElement("li");
          newItem.setAttribute("class", "ews__item mb-5");
          let info = `
      <div class="card">
      <img class="card__img img-fluid" src="${item.urlToImage}" class="card-img-top" alt="news">
      <div class="card-body">
      <a class="text-decoration-none" href="${item.url}" target="blank">
      <h5 class="card-title text-dark fw-bold mb-4">${item.title}</h5>
      <p class="card-text text-dark mb-3">${item.description}</p>
      </a>
      <div class="d-flex justify-content-between align-items-center">
      <a href="${item.url}" class="card__link" target="blank">${item.source.name}</a>
      <span class="time">${item.publishedAt}</span>
      </div>
      </div>
      </div>
      `;
          newItem.innerHTML = info;
          listFragment.appendChild(newItem);
        });
        elList.appendChild(listFragment);
      }
    });
}
fetchElement(URL_NEWS);

// debounse
function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// language
elSelectLink.addEventListener("change", function () {
  let lang = elSelectLink.value.trim();
  fetchElement(
    `https://newsapi.org/v2/top-headlines?country=${lang}&apiKey=${MY_KEY}`
  );
  elList.innerHTML = "";
});

// form submit
elForm.addEventListener(
  "keyup",
  debounce(function (evt) {
    evt.preventDefault();
    let newFind = elSearchInput.value.trim();
    if (newFind.value == "") {
      // newFind.value == "global"
      fetchElement(URL_NEWS);
    }
    fetchElement(
      `https://newsapi.org/v2/everything?q=${newFind}&apiKey=${MY_KEY}`
    );
    elList.innerHTML = "";
  }, 2000)
);

// Navbar search
elNavList.addEventListener("click", function (evt) {
  evt.preventDefault();
  elList.innerHTML = "";
  // console.log(tuch);
  let tuch = evt.target.textContent.toLowerCase();
  if (evt.target.textContent.trim() == "Home") {
    fetchElement(URL_NEWS);
  } else {
    fetchElement(
      `https://newsapi.org/v2/everything?q=${tuch}&apiKey=${MY_KEY}`
    );
  }
});
