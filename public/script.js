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

       window.location.href= `/chefs/${index}`
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




