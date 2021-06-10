const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .abas-adm a")

for (item of menuItems) {
	if (currentPage.includes(item.getAttribute("href"))) {			
		item.classList.add("active")
	}
}




/* Logica para selecionar o respectivo chef ao clicar nele */
const cardChefs = document.querySelectorAll(".card-chef") 
console.log(cardChefs)
for(let cardChef of cardChefs){
    
    cardChef.addEventListener('click', function() {
        const index = cardChef.getAttribute('id')

       window.location.href= `/admin/chefs/${index}`
    }) 

}

/* Logica de adicionar ingredientes */

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
  }
  
  document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient);


/* Logica de adicionar modo de preparo */

function addPreparo() {
    const modoPreparo = document.querySelector("#modoPreparo");
    const fieldContainer = document.querySelectorAll(".modPrep-content");
    // Realiza um clone do último modo de preparp adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    modoPreparo.appendChild(newField);
  }
  
  document
    .querySelector(".add-modPrep")
    .addEventListener("click", addPreparo);



  



    const PhotosUpload = {
      uploadLimit: 5,
      handleFileInput(event) {
          const { files: fileList } = event.target
          const { uploadLimit } = PhotosUpload
  
          if (fileList.length > uploadLimit) {
              alert(`Envie no máximo ${uploadLimit} fotos`)
              event.preventDefault()
              return			
          }
      }
  }