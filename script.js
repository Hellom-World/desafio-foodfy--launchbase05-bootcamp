const cards = document.querySelectorAll('.card')
const overlay = document.querySelector('.modal-overlay')

for(let card of cards){
    card.addEventListener('click', function(){
        overlay.classList.add('active')

    
        const pegaimg = card.getAttribute('id')
        const title = card.querySelector(".content").innerHTML;
        const text = card.querySelector(".info").innerHTML;
        
        document.querySelector('.modalimg').src = (`assets/${pegaimg}.png`)
        overlay.querySelector(".title").innerHTML = title;
        overlay.querySelector(".info").innerHTML = text; 

        

       
    })
}

document.querySelector('.modal-close').addEventListener('click', function(){
    overlay.classList.remove('active')
})