const search = document.getElementById('input_search')
const div_search = document.getElementById('div_search')
const content = document.querySelectorAll('.card-course')

let content_object = []
const arr_content = Array.from(content)

arr_content.forEach(function (elem){
    content_object.push({
        id: `${elem.classList[1]}`,
        title: `${elem.id}`
    })
})

// window.onload = function(){
//     console.log(search)
//   }

// let i = 0
search.addEventListener('click', function() {
    setInterval(() => {
        if(search.value){
            div_search.classList.replace('no_active_display','active_display')
            // console.log(i) 
            // i++
        }
       else{
        // console.log('still')
        div_search.classList.replace('active_display','no_active_display')
        }
    },
       2000)
})