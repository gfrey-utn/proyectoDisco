const iconoDeTacho = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"> <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" /> </svg>'
const iconoDeYouTube = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"> <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" /> </svg>'

const getAlbum = async () =>{
    try {
      const windowSearch = window.location.search;
      const albumId = windowSearch.substring(7);        
      const response = await axios.get('http://localhost:5000/band/' + albumId)
      albumToUse = response.data;
      console.log('Antes del RenderAlbum. El álbum obtenido es: ' + albumToUse)
      renderAlbum(albumToUse);
    } catch(error){
      console.log(error)
      swal({
        title: 'Error!',
        text: error.response,
        icon: 'error',
        button: 'Ok'
      })
      redirect('http://localhost:5000/index.html')
    }
}

function renderAlbum(album){
    const titulo = document.getElementById("titulo")
    titulo.textContent = album.titulo

    const descripcion = document.getElementById("texto")
    descripcion.textContent = album.descripcion

    const imagen = document.getElementById("imagen")
    imagen.src = album.portada ? album.portada : 'https://imgur.com/0uSALUr.png'
    imagen.alt = album.titulo
    console.log(album.titulo)
    console.log(album)

    const buttonEditAlbum = document.getElementById('buttonEditAlbum')
    buttonEditAlbum.href = 'http://localhost:5000/editAlbum.html?album=' + album._id

    const buttonAddSong = document.getElementById('buttonAddSong')
    buttonAddSong.href = 'http://localhost:5000/addSong.html?album=' + album._id

    if(album.canciones.length){
      const divCanciones = document.createElement('div')
      divCanciones.classList.add('seccion', 'bg-[#0000ff]', 'm-[5px]')
      divCanciones.id = 'divCanciones'

      const cuerpo = document.getElementById('cuerpo')
      cuerpo.appendChild(divCanciones)

      const h2 = document.createElement('h2')
      h2.textContent = 'Canciones:'
      h2.classList.add('font-black', 'text-xl', 'ml-2.5', 'fuenteCustom')
      divCanciones.appendChild(h2)

      for (let i = 0; i < album.canciones.length; i++){
        renderSong(divCanciones, album.canciones[i], i + 1)
      }
    }
}

function renderSong(divContenedor, cancion, indice) {
    const divCancion = document.createElement('div')
    divCancion.classList.add('flex', 'justify-between', 'items-center', 'bg-[#ffd700]', 'm-[5px]')

    const divCanciones = document.getElementById('divCanciones')
    divCanciones.appendChild(divCancion)

    const p1 = document.createElement('p')
    p1.classList.add('mx-2')
    p1.textContent = indice
    divCancion.appendChild(p1)

    const p2 = document.createElement('p')
    p2.classList.add('mx-2', 'font-semibold', 'italic')
    p2.textContent = cancion.titulo
    divCancion.appendChild(p2)

    const p3 = document.createElement('p')
    p3.classList.add('mx-2', 'font-semibold')
    p3.textContent = cancion.duracion
    divCancion.appendChild(p3)

    const boton = document.createElement('button')
    boton.classList.add('mx-2', 'min-w-fit', 'text-red-600', 'flex', 'justify-center', 'items-center')
    boton.insertAdjacentHTML('beforeend', iconoDeTacho)
    divCancion.appendChild(boton)

    const tagA = document.createElement('a')
    tagA.classList.add('mx-2', 'min-w-fit', 'bg-sky-500', 'text-white', 'flex', 'justify-center', 'items-center')
    tagA.href = 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
    tagA.insertAdjacentHTML('beforeend', iconoDeYouTube)
    divCancion.appendChild(tagA)
}

console.log('Antes del getAlbum')
getAlbum()
console.log('Después del getAlbum')