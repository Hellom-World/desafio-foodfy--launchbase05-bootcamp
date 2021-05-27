/* Redirecionamento de página ao clicar em alguma receta */

const cards = document.querySelectorAll(".card") 

for(let card of cards){
    
    card.addEventListener('click', function() {
        const index = card.getAttribute('id')

       window.location.href= `/recipes/${index}`
    }) 

}
            
/* Mostra - Esconde -> ingredientes */
const escondeingre = document.querySelector('.esconde-ingredientes')
const divIngredientes = document.querySelector('.lista-ingredientes')

escondeingre.addEventListener('click', function(){
    
    if(divIngredientes.classList.contains('mostrar')){
        divIngredientes.classList.remove('mostrar')
        escondeingre.innerHTML= "MOSTRAR"
    }else{
        divIngredientes.classList.add('mostrar')
        escondeingre.innerHTML= "ESCONDER"
    }
})

/* Mostra - Esconde -> Modo de preparo */
const escondeMP = document.querySelector('.esconder-preparo')
const divMP = document.querySelector('.lista-preparation')

escondeMP.addEventListener('click', function(){
    
    if(divMP.classList.contains('mostrar')){
        divMP.classList.remove('mostrar')
        escondeMP.innerHTML="MOSTRAR"
    }else{
        divMP.classList.add('mostrar')
        escondeMP.innerHTML="ESCONDER"
    }
})

/* Mostra - Esconde -> informações adicionais */
const escondeInfo = document.querySelector('.esconder-info')
const textInfo = document.querySelector('.text-info')

escondeInfo.addEventListener('click', function(){
    
    if(textInfo.classList.contains('mostrar')){
        textInfo.classList.remove('mostrar')
        escondeInfo.innerHTML="MOSTRAR"
    }else{
        textInfo.classList.add('mostrar')
        escondeInfo.innerHTML="ESCONDER"
    }
})
