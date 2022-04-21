const popup = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modals = document.querySelectorAll(".show-modal");
const closeModals = document.querySelector(".close-modal");
const close = () => {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
};
const open = () => {
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
modals.forEach(function (modal) {
  modal.addEventListener("click", open);
});
closeModals.addEventListener("click", close);

overlay.addEventListener("click", close);

document.addEventListener("keydown", function (e) {
  if ((e.key = "Escape" && !popup.classList.contains("hidden"))) {
    close();
  }
});
