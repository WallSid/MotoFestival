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



window.addEventListener("click", function(e) {
  console.log(e.target.hasAttribute("data-action"));
  if (e.target.hasAttribute("data-action")) {
    const cardWrapper = e.target.closest("[data-card]");
    const quantityValue = cardWrapper.querySelector("[data-counter]");

    if (e.target.dataset.action === "plus") {
      quantityValue.innerText = parseInt(++quantityValue.innerText);
      calcPrice();
    };
    if ((e.target.dataset.action === "minus") && (parseInt(quantityValue.innerText) >= 1)) {
      quantityValue.innerText = parseInt(--quantityValue.innerText);
      calcPrice();
    };
    
  }
});

function calcPrice() {
  const cardsWrapper = document.querySelectorAll("[data-popupWrapper]");
  const totalPriceEl = document.querySelectorAll("[data-totalAmount]");
  
  cardsWrapper.forEach(function (item) {
    const cards = item.querySelectorAll("[data-card]");
    let currentPrice;
    let totalPrice = 0;
    cards.forEach(function (item) {
      const ticketPrice = item.querySelector("[data-price]");
      const ticketQuantity = item.querySelector("[data-counter]");

      currentPrice = parseInt(ticketPrice.innerText) * parseInt(ticketQuantity.innerText);
      totalPrice = parseInt(currentPrice) + parseInt(totalPrice);
      
      
      totalPriceEl.forEach(function (item) {
        item.innerText = parseInt(totalPrice);
      });
    });
  });
};

// adding tickets to the next popup(cart)
// adding tickets to the cart 
const cartWrapper = document.querySelector('.submitBlock-popup__ticketsInner');

// const cart = document.querySelector('._cartWrapper');
// console.log(cart);
window.addEventListener("click", function(event) {

  if (event.target.hasAttribute('data-action')) {
    
    // finding card with ticket in which clicked
    const card = event.target.closest('.card');
    console.log(card);

    //getting data from card and writting them in object productInfo
    const productInfo = {
      id: card.dataset.id,
      price: card.querySelector('.cards-popup__price').textContent,
      currentPrice: parseInt(card.querySelector('[data-price]').textContent) * parseInt(card.querySelector('[data-counter]').textContent),
      date: card.querySelector('[data-title]').textContent,
      day: card.querySelector('.cards-popup__subtitle').textContent,
      counter: card.querySelector('[data-counter]').textContent,
    };

    
    
    // check if cart has the same ticket
    const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
    const cards = document.querySelectorAll(`[data-id="${productInfo.id}"]`);
    console.log(cards);
    calcPrice();
    console.log(itemInCart);
    console.log(productInfo.currentPrice);
    console.log(productInfo.price);
    console.log(productInfo.id);
    console.log(productInfo.date);
    console.log(productInfo.counter);

    if (itemInCart) {
      const counterEl = itemInCart.querySelector('[data-counter]');
      const priceEl = itemInCart.querySelector('[data-price]');

     
      if (event.target.dataset.action === "minus" && counterEl.textContent < 1) {
            console.log('nemae!!!')
            itemInCart.remove();
            // cards.forEach(function(item) {
            //   counterEl.innerText = 0;
            // });
          };
          // if (event.target.dataset.action === "plus") {

          // }

    } else {
        const cartItemHTML = `
                              <div data-card data-id="${productInfo.id}" class="submitBlock-popup__tickets tickets card">
                                <div class="ticket__date data-title date-ticket _ticketDate">
                                    ${productInfo.date} <span class="date-ticket__accent _ticketDay">${productInfo.day}</span><span class="cards-popup__price" data-price>${productInfo.price}</span>
                                </div>
                                <div class="ticket__quantity quantity-tickets _amountWrapper">
                                    <div data-cart data-action="minus" class="quantity-tickets__minus">-</div>
                                    <div data-cart data-counter class="quantity-tickets__value">${productInfo.counter}</div>
                                    <div data-cart data-action="plus" class="quantity-tickets__plus">+</div>
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
