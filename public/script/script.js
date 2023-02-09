const hamburguer_menu = document.getElementById('hamburguer')
const menu_items = document.getElementsByClassName('menu')
console.log(hamburguer_menu)
hamburguer_menu.addEventListener('click', function() {
      console.log('it works')
      menu_items.classList.toggle('show')
});





