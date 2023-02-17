console.log('hi new course')

//CONTENT DOM
const btn_content = document.querySelector('#btn_content_module')
const limit_module = document.querySelector('#limit_message_module')
const content = document.querySelectorAll('.content')
const arr_content = Array.from(content)
arr_content[0].classList.remove('no_active_display')

let index_module = 0
btn_content.addEventListener('click',function(){
    arr_content[index_module].classList.remove('no_active_display')
    if(index_module==10){
        limit_module.classList.remove('no_active_display')
        btn_content.classList.add('no_active_display')
    }
    index_module++
})

const btn_desc_content = document.querySelectorAll('#btn_content_description')
const arr_btn_desc_content = Array.from(btn_desc_content)
const limit_content = document.querySelectorAll('#limit_message_content')
const arr_limit_content = Array.from(limit_content)
const description_content = document.getElementsByClassName('content_description')


let index_content = 0
arr_btn_desc_content.forEach(function(btn_desc,index){
    btn_desc.addEventListener('click', function(){
        const arr = Array.from(description_content)
        arr[(index*4)+index_content].classList.remove('no_active_display')
        if(index_content==3){
            index_content=0
            btn_desc.classList.add('no_active_display')
            arr_limit_content[index].classList.remove('no_active_display')
        }
        else{
            index_content++
        }
    })
})


//FEATURES DOM
const features = document.querySelectorAll('.features')
const btn_features = document.querySelectorAll('.btn_subtitle_features')

const arr_btn_features = Array.from(btn_features)
arr_btn_features.forEach(function(btn,index){
    btn.addEventListener('click',function(){
        const arr = Array.from(features)
        arr[index*2].classList.remove('no_active_display')
        arr[(index*2)+1].classList.remove('no_active_display')
        btn.classList.add('no_active_display')
    })
})

//REASONS DOM
//LIST
const btn_list_reasons = document.querySelectorAll('.btn_list_reasons')
const list_reasons = document.querySelectorAll('.list_reasons')

const arr_btn_list_reasons = Array.from(btn_list_reasons)

arr_btn_list_reasons.forEach(function(btn_list,index){
    btn_list.addEventListener('click',function(){
        const arr_list_reasons = Array.from(list_reasons)
        arr_list_reasons[index].classList.remove('no_active_display')
        btn_list.classList.add('no_active_display')
    })
})

//REASONS DOM
//DESCRIPTION
const btn_description_reasons = document.querySelectorAll('.btn_description_reasons')
const description_reasons = document.querySelectorAll('.description_reasons')

const arr_btn_description_reasons = Array.from(btn_description_reasons)

arr_btn_description_reasons.forEach(function(btn_desc,index){
    btn_desc.addEventListener('click',function(){
        const arr_description_reasons = Array.from(description_reasons)
        arr_description_reasons[index].classList.remove('no_active_display')
        btn_desc.classList.add('no_active_display')
    })
})



