const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .abas a")

for (item of menuItems) {
	if (currentPage.includes(item.getAttribute("href"))) {			
		item.classList.add("active-site")
	}
}

/* Logica para selecionar o respectivo chef ao clicar nele */
const cardChefs = document.querySelectorAll(".card-chef") 
console.log(cardChefs)
for(let cardChef of cardChefs){
    
    cardChef.addEventListener('click', function() {
        const index = cardChef.getAttribute('id')

       window.location.href= `/recipes/chefs/${index}`
    }) 

}


/* Redirecionamento de página ao clicar em alguma receta */

const cards = document.querySelectorAll(".card") 

for(let card of cards){
    
    card.addEventListener('click', function() {
        const index = card.getAttribute('id')

       window.location.href= `/recipes/${index}`
    }) 

}
            
/* Mostra - Esconde -> ingredientes */
/* const escondeingre = document.querySelector('.esconde-ingredientes')
const divIngredientes = document.querySelector('.lista-ingredientes')

escondeingre.addEventListener('click', function(){
    
    if(divIngredientes.classList.contains('mostrar')){
        divIngredientes.classList.remove('mostrar')
        escondeingre.innerHTML= "MOSTRAR"
    }else{
        divIngredientes.classList.add('mostrar')
        escondeingre.innerHTML= "ESCONDER"
    }
}) */

/* Mostra - Esconde -> Modo de preparo */

/* const escondeMP = document.querySelector('.esconder-preparo')
const divMP = document.querySelector('.lista-preparation')

escondeMP.addEventListener('click', function(){
    
    if(divMP.classList.contains('mostrar')){
        divMP.classList.remove('mostrar')
        escondeMP.innerHTML="MOSTRAR"
    }else{
        divMP.classList.add('mostrar')
        escondeMP.innerHTML="ESCONDER"
    }
}) */

/* Mostra - Esconde -> informações adicionais */

/* const escondeInfo = document.querySelector('.esconder-info')
const textInfo = document.querySelector('.text-info')

escondeInfo.addEventListener('click', function(){
    
    if(textInfo.classList.contains('mostrar')){
        textInfo.classList.remove('mostrar')
        escondeInfo.innerHTML="MOSTRAR"
    }else{
        textInfo.classList.add('mostrar')
        escondeInfo.innerHTML="ESCONDER"
    }
}) */

    // paginação
    // totalPages = 20
    // SelectedPage = 15
    // [1, ..., 13, 14, 15, 16, 17, ..., 20]

    function paginate (selectedPage, totalPages) {
        let pages = [],
        oldPage
        for(let currentPage = 1; currentPage <= totalPages; currentPage++){
    
            const firstAndLastPage = currentPage == 1 || currentPage == totalPages
            const pagesAfterSelectedPage = currentPage <= selectedPage + 2
            const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
    
    
            if(firstAndLastPage == 1 || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
                if (oldPage && currentPage - oldPage > 2){
                    pages.push("...")
                }
    
                if (oldPage && currentPage - oldPage == 2) {
                    pages.push(oldPage + 1)
                }
    
                pages.push(currentPage)
                    
                oldPage = currentPage
            }
            
        }
        return pages 
    }
    const pagination = document.querySelector(".pagination")
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;

    const pages = paginate(page, total)
    console.log(pages)
    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            elements += `<a href= "?page=${page}">${page}</a>`
        }    
    }
    
    pagination.innerHTML = elements
