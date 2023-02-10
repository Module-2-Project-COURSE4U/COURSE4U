const btn_menu = document.querySelector(".btn_menu");
const menu_items = document.querySelector(".menu_nav");
const btn_logo = document.querySelector(".app-logo")

btn_logo.addEventListener("click", () => {
  window.location.href = `/`
})

btn_menu.addEventListener("click", () => {
  menu_items.classList.toggle("show");
});


