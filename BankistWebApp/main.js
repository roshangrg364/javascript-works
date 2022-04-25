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
    // cookieMessageElm.parentElement.removeChild(cookieMessageElm);
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

//smooth scrolling when clicking learn more

const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
btnScroll.addEventListener("click", function () {
  //modern way
  //section1.scrollIntoView({ behavior: "smooth" });

  //traditionalApproach

  const scrollCords = section1.getBoundingClientRect();

  window.scrollTo({
    left: scrollCords.left + window.pageXOffset,
    top: scrollCords.top + window.pageYOffset,
    behavior: "smooth",
  });
});

const parentNavLink = document.querySelector(".nav__links");

parentNavLink.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//tab handling
const operationTabContainer = document.querySelector(
  ".operations__tab-container"
);
const operationTabs = document.querySelectorAll(".operations__tab");
const operationContents = document.querySelectorAll(".operations__content");
//event delegation

operationTabContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clickedTab = e.target.closest(".operations__tab");
  if (!clickedTab) return;
  operationTabs.forEach(function (tab) {
    tab.classList.remove("operations__tab--active");
  });

  clickedTab.classList.add("operations__tab--active");
  const tabContent = document.querySelector(
    `.operations__content--${clickedTab.dataset.tab}`
  );

  operationContents.forEach(function (content) {
    content.classList.remove("operations__content--active");
  });
  tabContent.classList.add("operations__content--active");
});

//navigation hove effect
const navElm = document.querySelector(".nav");
const handleNavHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const hoveredLink = e.target;
    const siblings = hoveredLink.closest(".nav").querySelectorAll(".nav__link");
    siblings.forEach((sib) => {
      if (e.target != sib) sib.style.opacity = opacity;
    });
  }
};
navElm.addEventListener("mouseover", function (e) {
  handleNavHover(e, 0.5);
});

navElm.addEventListener("mouseout", function (e) {
  handleNavHover(e, 1);
});

//sticky nav
const stickNav = function (entries) {
  const firstEntry = entries[0];
  console.log(firstEntry);
  if (firstEntry.isIntersecting == false) {
    navElm.classList.add("sticky");
  } else {
    navElm.classList.remove("sticky");
  }
};

const navHeight = navElm.getBoundingClientRect().height;
console.log(navHeight);
const observer = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);

// show items on scrolling

const sections = document.querySelectorAll(".section");
const sectionReveal = function (entries, observer) {
  const entry = entries[0];
  if (entry.isIntersecting == false) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});
sections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});
