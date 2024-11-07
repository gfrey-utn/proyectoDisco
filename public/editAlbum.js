const botonEditar = document.getElementById('botonEditar')
const botonCancelar = document.getElementById('botonCancelar')

let albumActual

const cargarAlbum = async () => {
    try {
      const windowSearch = window.location.search;
      const albumId = windowSearch.substring(7);        
      const response = await axios.get('https://proyectodisco.onrender.com/band/' + albumId)
      albumActual = response.data;

      const inputTitulo = document.getElementById('titulo')
      inputTitulo.value = albumActual.titulo
      console.log(albumActual)
      
      const inputDescripcion = document.getElementById('descripcion')
      inputDescripcion.textContent = albumActual.descripcion

      const inputImagen = document.getElementById('imagen')
      inputImagen.value = albumActual.portada

      const buttonEditAlbum = document.getElementById('buttonEditAlbum')
      buttonEditAlbum.href = 'https://proyectodisco.onrender.com/editAlbum.html?album=' + albumActual._id

      const buttonAddSong = document.getElementById('buttonAddSong')
      buttonAddSong.href = 'https://proyectodisco.onrender.com/addSong.html?album=' + albumActual._id

    } catch (error) {
      console.log(error)
      swal({
        title: 'Error!',
        text: error.response,
        icon: 'error',
        button: 'Ok'
      })
      redirect('https://proyectodisco.onrender.com/index.html')  
    }
} 

const changeAlbum = async(e)=>{
    e.preventDefault()
    const albumEditado = getInputValues()
    try {
        await axios.put('https://proyectodisco.onrender.com/band/' + albumActual._id, albumEditado)
        swal({
            title: '¡Álbum modificado!',
            text: '¡El álbum fue modificado con éxito!',
            icon: 'success',
            confirmButtonText: 'Ok'
        }) 
        window.location.href = "https://proyectodisco.onrender.com/album.html?album=" + albumActual._id
    } catch(error) {
        console.log(error)
        swal({
            title: 'Error!',
            text: error.response,
            icon: 'error',
            button: 'Ok'
        })
        window.location.href= "https://proyectodisco.onrender.com/album.html?album=" + albumActual._id
    }
}

function getInputValues() {
    const inputTitulo = document.getElementById('titulo')
    const inputDescripcion = document.getElementById('descripcion')
    const inputImagen = document.getElementById('imagen')
    
    const albumEditado = {
      "titulo": inputTitulo.textContent,
      "descripcion": inputDescripcion.textContent,
      "portada": inputImagen.textContent
    }

    return albumEditado
}

cargarAlbum()