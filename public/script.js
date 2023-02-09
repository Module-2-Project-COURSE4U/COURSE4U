// Select the card container element
const cardContainer = document.querySelector('.card-container');
// Add a click event listener to the card container
cardContainer.addEventListener('click', event => {
  // Find the closest ancestor element with the class 'card-course'
  const cardCourse = event.target.closest('.card-course');
  // If a 'card-course' element is found
  if (cardCourse) {
    // Extract the id from the dataset of the 'card-course' element
    const id = cardCourse.dataset.id;
    // Navigate to the URL  followed by the extracted id
    window.location.href = '/courses/course-details/' + id;
  }
});

/* active menu hamburquesa*/
addEventListener('DOMContentLoaded', () => {
const btn_menu = document.querySelector('.btn_menu')
if (btn_menu) {
  btn_menu.addEventListener('click',() =>{
    const menu_items   = document.querySelector('.menu_items')
      menu_items.classList.toggle('show')
  });
}
});



