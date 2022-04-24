"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const cookieMessageElm = document.createElement("div");
cookieMessageElm.classList.add("cookie-message");
cookieMessageElm.innerHTML = `Cookie is used for enhancing user experience. Accept the cookie <button class='btn btn-close-cookie'> Accept </button>`;

header.append(cookieMessageElm);

document
  .querySelector(".btn-close-cookie")
  .addEventListener("click", function () {
    cookieMessageElm.remove();
  });
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (modal) {
  modal.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//
