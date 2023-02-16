console.log('hi new course')

//CONTENT DOM
const btn_content = document.getElementById('btn_content_description')
const limit_content = document.getElementById('limit_message_content')
const description_content = document.getElementsByClassName('content_description')

let index_content = 0
btn_content.addEventListener('click', function(){
    const arr = Array.from(description_content)
    arr[index_content].classList.remove('no_active_display')
    arr[index_content+1].classList.remove('no_active_display')
    if(index_content<18){
        index_content+=2
    }
    else{
        btn_content.classList.add('no_active_display')
        limit_content.classList.remove('no_active_display')
    }
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
  