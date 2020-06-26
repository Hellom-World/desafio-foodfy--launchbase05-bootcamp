const cards = document.querySelectorAll('.card')
const overlay = document.querySelector('.modal-overlay')

for(let card of cards){
    card.addEventListener('click', function(){
        overlay.classList.add('active')
    })
}

document.querySelector('.modal-close').addEventListener('click', function(){
    overlay.classList.remove('active')
})