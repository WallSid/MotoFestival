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
    };
    if ((e.target.dataset.action === "minus") && (parseInt(quantityValue.innerText) >= 1)) {
      quantityValue.innerText = parseInt(--quantityValue.innerText);
    };
    calcPrice();
  }
});

function calcPrice() {
  const cardsWrapper = document.querySelectorAll("[data-popupWrapper]");
  
  cardsWrapper.forEach(function (item) {
    const cards = item.querySelectorAll("[data-card]");
    cards.forEach(function (item) {
      // const totalPrice = item.querySelector("[data-totalAmount]");
      const ticketPrice = item.querySelector("[data-price]");
      console.log(ticketPrice);
    });

    // console.log(ticketPrice);
    // totalPrice.innerText = 
  });
  console.log(cardsWrapper);
  // console.log(totalPrice);
}
