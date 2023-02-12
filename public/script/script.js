const btn_menu = document.querySelector(".btn_menu");
const menu_items = document.querySelector(".menu_nav");
const btn_logo = document.querySelector(".app-logo");
const btn_search = document.querySelector(".btn_search");
const search_form = document.querySelector(".search_form");
const btn_close = document.querySelector(".btn_close");
const btn_close2 = document.querySelector(".btn_close2");


btn_logo.addEventListener("click", () => {
  window.location.href = `/`;
});

btn_menu.addEventListener("click", () => {
 
      menu_items.classList.toggle("show");
    
    });
btn_search.addEventListener("click", () => {
        search_form.classList.toggle("show");
      });

btn_close.addEventListener("click", () => {
  btn_menu.classList.remove("show");
  search_form.classList.remove("show");
});

btn_close2.addEventListener("click", () => {
  btn_search.classList.remove("show");
  menu_items.classList.remove("show");
});

