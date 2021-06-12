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
        input: "",
        preview: document.querySelector("#photos-preview"),
        uploadLimit: 5,
        files: [],

    handleFileInput(event) {
          const { files: fileList } = event.target
          PhotosUpload.input = event.target
  
          if (PhotosUpload.hasLimit(event)) return

          
		Array.from(fileList).forEach(file => {
			PhotosUpload.files.push(file)

            const reader = new FileReader()

			reader.onload = () => {
				const image = new Image()
                image.src = String(reader.result)
                
                const div = PhotosUpload.getContainer(image)

				PhotosUpload.preview.appendChild(div)
			}

			reader.readAsDataURL(file)
        })
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input
        
        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true	
        }	

        
        const photosDiv = []
        preview.childNodes.forEach(item =>{
            if (item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }
        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image){

        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(PhotosUpload.getRemoveButton())
        div.appendChild(image)

        return div
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "delete"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

       
        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
        photoDiv.remove()
    }
  }