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

    document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient);
};
  


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

    document
    .querySelector(".add-modPrep")
    .addEventListener("click", addPreparo);
  }
  




  



    

const PhotosUploadChefs = {
    previewChef: document.querySelector("#photos-preview-chefs"),
    input: "",
    files: [],
    handleFileChefInput(event) {
        
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (fileList.length != 1){
            alert('Selecione apenas 1 foto')
            event.preventDefault()
            return
        }

        Array.from(fileList).forEach(file => {

            PhotosUploadChefs.files.push(file)
			const reader = new FileReader()

			reader.onload = () => {
				const image = new Image()
				image.src = String(reader.result)
                

                
                const div = PhotosUploadChefs.getContainer(image)

                div.appendChild(PhotosUploadChefs.getRemoveButton())
                
                var node = document.querySelectorAll(".photo");
                if (node.length > 0) {
                    
                    alert('Selecione apenas 1 foto')
                    event.preventDefault()
                }
				document.querySelector('#photos-preview-chefs').appendChild(div)
            }
            

			reader.readAsDataURL(file)
        })
        PhotosUploadChefs.getAllFiles()
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUploadChefs.files.forEach(file => dataTransfer.items.add(file))

        console.log(dataTransfer)
    },
    getContainer(image){

        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUploadChefs.removePhoto

        div.appendChild(image)

        return div
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
        
    },
    removePhoto(event) {
        
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUploadChefs.previewChef.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        photoDiv.remove()
    }


}

function removediv(event){

}