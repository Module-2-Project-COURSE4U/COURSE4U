let title = document.getElementsByClassName('title')
let div = document.getElementsByClassName('div_content')
let svg_color = document.getElementById('svg_process_color')
let style = document.getElementById('style')

const arr_title = Array.from(title)

window.onload = function(){
  div[0].classList.replace('no_active_display','active_display') 
}

function to_non_active_display(){
  arr_title.forEach(function (elem,i){
    div[i].classList.replace('active_display','no_active_display')  
  })
}


let i = 0
let parameter;
function change() {
  svg_color.classList.toggle('transformed_svg');
  i++
}
arr_title.forEach(function (elem,i) {
  elem.addEventListener('click', function() {
    to_non_active_display()
    div[i].classList.replace('no_active_display','active_display')
    if(i%2){
      parameter = '.svg_process_color'
    }
    else{
      parameter = '.transformed_svg'
    }
    let text = `${parameter}{
      width:${Math.round(((i+1)/arr_title.length)*100)}%;
    }`
    style.innerText = text
    change()
  })
})

