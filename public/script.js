const iconoTacho = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"> <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" /> </svg>' 

const getAlbums =  async () => {
  try {
    const response = await axios.get('https://proyectodisco.onrender.com/band')
    response.data.map((album)=> {
      renderAlbums(album)})
  } catch(error) {
    console.error(error);
  }
}

const renderAlbums = (album) => {
  const div = document.getElementsByClassName('grid grid-cols-3 gap-4 mt-12 py-30')[0]
  const newDiv = document.createElement('div')
  newDiv.classList.add('mb-20')
  const img = document.createElement('img')
  img.classList.add('rounded', 'cursor-pointer', 'album')
  img.src = album.portada ? album.portada : 'albumVacio.png'
  img.alt = album.titulo
  
  div.appendChild(newDiv)

  const tagA = document.createElement('a')
  tagA.href = './album.html?album=' + album._id
  tagA.classList.add('favorite', 'relative')
  newDiv.appendChild(tagA)
  tagA.appendChild(img)

  const icono = document.createElement('i')
  icono.classList.add('fa-solid', 'fa-star', 'absolute', 'bg-green-500', 'top-0', 'left-0', 'p-2', 'z-10')
  tagA.appendChild(icono)

  if (favoriteRecords.includes(album.titulo)) {
    icono.style.color = "gold";
  }

  icono.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        let albumName = album.titulo;
        if (this.style.color === "gold") {

            // Si está marcado, lo despinto y lo saco de favoritos
            this.style.color = "black";
            favoriteRecords = favoriteRecords.filter(cancion => cancion !== albumName)
        } else {

            // Si no está marcado, lo pinto y lo guardo en favoritos
            this.style.color = "gold";
            favoriteRecords.push(albumName);
        }
        console.log(favoriteRecords);
    });
  
  const renglon = document.createElement('div')
  renglon.classList.add('flex', 'justify-between', 'w-full')
  newDiv.appendChild(renglon)

  const p = document.createElement('p')
  p.classList.add('font-semibold', 'italic', 'w-5/6', 'bg-violet-800', 'text-center')
  p.textContent = album["año"]
  renglon.appendChild(p)
  // renglon.insertAdjacentHTML("beforeend", boton)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('w-1/6', 'min-w-fit', 'bg-red-600', 'text-white', 'flex', 'justify-center', 'items-center', 'rounded')
  deleteButton.insertAdjacentHTML("beforeend", iconoTacho)
  renglon.appendChild(deleteButton)

  deleteButton.addEventListener('click', () => deleteAlbum(album._id))

}

const deleteAlbum = async (id) => {
  try {
    const response = await axios.get('https://proyectodisco.onrender.com/band/' + id)
    const albumABorrar = response.data
    const nombreDelAlbum = albumABorrar.nombre
    await axios.delete('https://proyectodisco.onrender.com/band/' + id)
    swal({
        title: '¡Álbum borrado!',
        text: 'Borraste ' + nombreDelAlbum + ' de la lista.',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  } catch(error) {
    console.log(error)
    swal({
        title: '¡Error!',
        text: 'No se ha podido eliminar el álbum.',
        icon: 'error',
        button: 'Ok'
    })
  }
  redirect('https://proyectodisco.onrender.com/')
}

getAlbums();

function redirect(url) {
  window.location.href = url;
}

let favoriteRecords = ["A Night at the Opera", "Greatest Hits", "Greatest Hits II"];

function addFavorites(favorites) {
  const albums = document.querySelectorAll(".album");

  albums.forEach((album) => {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-star");
    icon.classList.add("absolute");
    icon.classList.add("bg-green-500");
    icon.classList.add("top-0");
    icon.classList.add("left-0");
    icon.classList.add("p-2");
    icon.classList.add("z-10");
    album.parentNode.appendChild(icon);
    album.parentElement.classList.add("favorite");
    album.parentElement.classList.add("relative");
    if (favorites.includes(album.alt)) {
        icon.style.color = "gold";
      //icon.classList.add("text-yellow-500");
    }
  });
}

addFavorites(favoriteRecords);

let iconos = document.querySelectorAll("a i")
for (let i = 0; i < iconos.length; i++) {
    iconos[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        let albumName = this.parentElement.querySelector("img").alt;
        if (this.style.color === "gold") {

            // Si está marcado, lo despinto y lo saco de favoritos
            this.style.color = "black";
            let index = favoriteRecords.indexOf(albumName);
            if (index > -1) {
                favoriteRecords.splice(index, 1);
            }
        } else {

            // Si no está marcado, lo pinto y lo guardo en favoritos
            this.style.color = "gold";
            favoriteRecords.push(albumName);
        }
        console.log(favoriteRecords);
    });
}