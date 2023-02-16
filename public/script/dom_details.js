let title = document.getElementsByClassName("title");
let div = document.getElementsByClassName("div_content");
let svg_color = document.getElementById("svg_process_color");
let style = document.getElementById("style");

const arr_title = Array.from(title);

window.onload = function () {
  div[0].classList.replace("no_active_display", "active_display");
};
function to_non_active_display() {
  arr_title.forEach(function (elem, i) {
    div[i].classList.replace("active_display", "no_active_display");
  });
}
let i = 0;
let parameter;
function change() {
  svg_color.classList.toggle("transformed_svg");
    i++;
}
arr_title.forEach(function (elem, i) {
  elem.addEventListener("click", function () {
    to_non_active_display();
    div[i].classList.replace("no_active_display", "active_display");
    if (i % 2) {
      parameter = ".svg_process_color";
      const svg = document.querySelector('.svg_process_color')
      // svg.style.width="`${Math.round(((i + 1) / arr_title.length) * 100)}%`"
      // console.log(svg)
    } else {
      parameter = ".transformed_svg";
      const transformed = document.querySelector('.transformed_svg')
      // console.log(transformed)
      // transformed.style.width="`${Math.round(((i + 1) / arr_title.length) * 100)}%`"
    }
    let text = `${parameter}{
      width:${Math.round(((i + 1) / arr_title.length) * 100)}%;
    }`;
    // console.log(parameter)
    style.innerText = text;
    change();
  });
});

const stars_img = document.getElementsByClassName("star");
const value_stars = document.querySelector('input[name="stars"]');
const stars = Array.from(stars_img);

let toggle2change;
stars.forEach(function (star, index) {
  star.addEventListener("click", function () {
    if (index == toggle2change) {
      for (let i = 0; i < toggle2change + 1; i++) {
        stars[i].classList.toggle("highlight");
      }
      value_stars.value = 0;
      toggle2change = "reset";
    } else {
      if (toggle2change != "reset") {
        for (let i = 0; i < toggle2change + 1; i++) {
          stars[i].classList.toggle("highlight");
        }
      }
      toggle2change = index;
      for (let i = 0; i < index + 1; i++) {
        stars[i].classList.toggle("highlight");
      }
      value_stars.value = index + 1;
    }
  });
});

const stars_review = document.querySelectorAll(".star-reviews");
window.addEventListener("load", (event) => {
  const arr_stars = Array.from(stars_review);
  arr_stars.forEach(function (elem, i) {
    for (let i = 0; i < 5; i++) {
      if (i >= elem.id) {
        elem.insertAdjacentHTML(
          "beforeend",
          "<img class='star' src='/images/SVG/REVIEWS/Navy-blue.svg' alt='star_1'/>"
        );
      } else {
        elem.insertAdjacentHTML(
          "afterbegin",
          "<img class='star' src='/images/SVG/REVIEWS/Sky-blue.svg' alt='star_1'/>"
        );
      }
    }
  });
});
