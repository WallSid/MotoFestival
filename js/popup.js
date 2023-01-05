"use strict";

const openPopupBtns = document.querySelectorAll("[data-popup]");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeOut = 800;

if (openPopupBtns.length > 0) {
  console.log(openPopupBtns.length);
  for (let index = 0; index < openPopupBtns.length; index++) {
    const openPopupBtn = openPopupBtns[index];
    openPopupBtn.addEventListener("click", function (e) {
      const popupName = openPopupBtn
        .getAttribute("data-popup")
        .replace("#", "");
      console.log(popupName);
      const currentPopup = document.getElementById(popupName);
      console.log(currentPopup);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const closePopupIcon = document.querySelectorAll(".popup__close");
console.log(closePopupIcon.length);
if (closePopupIcon.length > 0) {
  for (let index = 0; index < closePopupIcon.length; index++) {
    const el = closePopupIcon[index];
    console.log(el);
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      console.log(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(currentPopup) {
  console.log(currentPopup);
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add("open");
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    console.log(popupActive);
    console.log(unlock);
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }

  document.querySelector(".main__page").style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeOut);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }

    document.querySelector(".main__page").style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeOut);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeOut);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

// popup counter logic

// const btnMinus = document.querySelector('[data-action="minus"]');
// const btnPlus = document.querySelector('[data-action="plus"]');

// const counter = document.querySelector('[data-counter]');

// btnMinus.addEventListener("click", function() {
// 	console.log('minus click');
// 	if (parseInt(counter.innerText) > 1) {
// 		counter.innerText = --counter.innerText;
// 	}

// });
// btnPlus.addEventListener("click", function() {
// 	console.log('plus click');
// 	counter.innerText = ++counter.innerText;
// });

let sumAmount = document.querySelector("[data-amount]");

window.addEventListener("click", function (event) {
  let counter;
  let ticketPrice;

  if (
    event.target.dataset.action === "plus" ||
    event.target.dataset.action === "minus"
  ) {
    const cardWrapper = event.target.closest(".cards-popup__item");
    const counterWrapper = event.target.closest("._amountWrapper");
    // знаходимо лічильник
    counter = counterWrapper.querySelector("[data-counter]");
    // console.log(counter);
    // console.log(counter.innerText);
    // ticketPrice = cardWrapper.querySelector("[data-price]");
  }

  // преревіряємо чи являється елемент кнопкою мінус
  if (event.target.dataset.action === "minus" && counter.innerText > 0) {

    counter.innerText = --counter.innerText;
    // sumAmount.innerText =
    //   parseInt(ticketPrice.innerText) * parseInt(counter.innerText) + " грн";
	  calcPrice()
  }
  // else if (parseInt(sumAmount.innerText) >= parseInt(ticketPrice.innerText)) {

  // };

  // преревіряємо чи являється елемент кнопкою плюс
  if (event.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
    calcPrice()
    // sumAmount.innerText =
    //   parseInt(ticketPrice.innerText) * parseInt(counter.innerText) + " грн";
  }
});

// calc sum logic

function calcPrice() {
  const cardsItems = document.querySelectorAll('.cards-popup__item');
	const cardsWrapper = document.querySelector('.popup__text');
  const totalPriceEl = document.querySelector('[data-amount]');
  const totalPriceElFinish = document.querySelector('.submitBlock-popup__summaryAmount_value');

  let totalPrice = cardsWrapper.querySelector('[data-amount]').innerText = 0;
  let currentPrice;

  // колекція типу NodeList має метод forEach
  cardsItems.forEach(function (item) {
    const priceEl = item.querySelector('[data-price]');
    const amountEl = item.querySelector('[data-counter]');
    console.log(amountEl.innerText);

    currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
    console.log(currentPrice);
    totalPrice = parseInt(totalPrice) + parseInt(currentPrice);
    console.log(totalPrice);
  });

  totalPriceEl.innerText = totalPriceElFinish.innerText = totalPrice;
  totalPriceElFinish.innerText = totalPrice + ' грн';
}



// adding tickets to the cart 
const cartWrapper = document.querySelector('.submitBlock-popup__ticketsInner');
// const cart = document.querySelector('._cartWrapper');
// console.log(cart);
window.addEventListener("click", function(event) {

  if (event.target.hasAttribute('data-cart')) {
    // finding card with ticket in which clicked
    const card = event.target.closest('.card');
    console.log(card);
    //getting data from card and writting them in object productInfo
    const productInfo = {
      id: card.dataset.id,
      price: card.querySelector('.cards-popup__price').innerText,
      currentPrice: parseInt(card.querySelector('.cards-popup__price').innerText) * parseInt(card.querySelector('.cards-popup__value').innerText),
      date: card.querySelector('.cards-popup__title').innerText,
      day: card.querySelector('.cards-popup__subtitle').innerText,
      counter: card.querySelector('.cards-popup__value').innerText,
    };

    
    
    // check if cart has the same ticket
    const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
    console.log(itemInCart);

    if (itemInCart) {

      const counterEl = itemInCart.querySelector('.quantity-tickets__value');
      const priceEl = itemInCart.querySelector('.ticket__price');
      if (event.target.hasAttribute('data-cart') && event.target.dataset.action === "plus") {
        console.log('treba minyaty!!!');

        counterEl.innerText = parseInt(++counterEl.textContent);
        console.log(counterEl.textContent);
        } else if ((event.target.hasAttribute('data-cart') && event.target.dataset.action === "minus") && counterEl.textContent > 1){
          counterEl.textContent = parseInt(--counterEl.textContent);
          } else if (event.target.dataset.action === "minus" && counterEl.textContent <= 1) {
            // console.log('nemae!!!')
            itemInCart.remove();
          };
      // counterEl.innerText = parseInt(++counterEl.innerText);
      priceEl.innerText = parseInt(productInfo.counter) * parseInt(productInfo.price) + ' грн';
      // console.log(productInfo.price = parseInt(productInfo.counter) * parseInt(productInfo.price));
      // console.log(parseInt(productInfo.price));
      // console.log(productInfo.counter);
    } else {
        const cartItemHTML = `
                              <div data-id="${productInfo.id}" class="submitBlock-popup__tickets tickets card">
                                <div class="ticket__date date-ticket _ticketDate">
                                    ${productInfo.date} <span class="date-ticket__accent _ticketDay">/ ${productInfo.day}</span>
                                </div>
                                <div class="ticket__quantity quantity-tickets _amountWrapper">
                                    <div data-action="minus" class="quantity-tickets__minus">-</div>
                                    <div data-counter class="quantity-tickets__value">${productInfo.counter}</div>
                                    <div data-action="plus" class="quantity-tickets__plus">+</div>
                                </div>
                                <div class="ticket__price">
                                ${productInfo.price}
                                </div>
                              </div>`;

      // show in cart
      cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
    }
  }
});
