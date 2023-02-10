const div_course = document.getElementsByClassName('card-course')
const arr_course = Array.from(div_course)

arr_course.forEach(function (elem) {
    elem.addEventListener('click', function() {
        window.location.href = `/courses/course-details/${elem.id}`
    })
})