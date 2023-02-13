const search = document.getElementById('input_search')
const div_search = document.getElementById('select')
const content = document.querySelectorAll('.card-course')

console.log(content.classList)

let content_id = []
let content_title = []
const arr_content = Array.from(content)

let position
let index
function assignControls(){
    document.addEventListener('keydown',(event) => {
        switch (event.code){
            case 'ArrowUp':
                    position = 'U'
                    if(index>0){
                        index --
                    }
                break
            case 'ArrowDown':
                    position = 'D'
                    index ++
                break
            case 'Enter': 
                    position = true
                break
            default:
                 break
            }
        })
    }

window.onload = function(){
    assignControls()
  }

arr_content.forEach(function (elem){
    content_id.push(`${elem.classList[1]}`)
    content_title.push(`${elem.id}`)
})

content_title.forEach(function (elem){
    let text = `<option class=''options>${elem}</option>`
  div_search.insertAdjacentHTML('beforeend',text)
})

let length = 0
let options = []
let text_options = ""
search.addEventListener('click', function() {
    
    setInterval(() => {
        if(search.value.length>=1 & search.value.length!=length){
            div_search.classList.replace('no_active_display','active_display')
            console.log(1)
            length = search.value.length
            options = []
            content_title.forEach(function (elem,i){
                const split = (elem.toLowerCase()).split((search.value).toLowerCase())
                if(split[0].length != elem.length){
                    options.push({title: elem,index: i})
                }
            })
            text_options = ""
            options.forEach(function (elem,i){
                let text = `<option>${elem.title}</option>`
                text_options += ` ${text}`
            })
            div_search.innerHTML = text_options
            // if(position=='U' & index>0){

            //     div_search.value == 
            // }
        }
        else if(search.value.length>=1){
            div_search.classList.replace('no_active_display','active_display')
            console.log(2)
            console.log(options,div_search.value)
            const filter = options.filter(word => word.title == div_search.value);
            if (filter.length>0){
                console.log(filter)
                console.log(options)
                // div_search.value = options[filter+1].title
                // console.log(div_search.value)
            }
            console.log(filter)
            // div_search.value =
            if(position=='U'){
                 
            }
            return
        }
        else{
            console.log(3)
            div_search.classList.replace('active_display','no_active_display')
        }
    },
       4000)
})