const botonEditar = document.getElementById('botonEditar')
const botonCancelar = document.getElementById('botonCancelar')

const inputTitulo = document.getElementById('titulo')
const inputDescripcion = document.getElementById('descripcion')
const inputImagen = document.getElementById('imagen')

const buttonEditAlbum = document.getElementById('buttonEditAlbum')
const buttonAddSong = document.getElementById('buttonAddSong')

let albumActual

const cargarAlbum = async () => {
    try {
      const windowSearch = window.location.search;
      const albumId = windowSearch.substring(7);        
      const response = await axios.get('https://proyectodisco.onrender.com/band/' + albumId)
      albumActual = response.data;

      inputTitulo.value = albumActual.titulo      
      inputDescripcion.value = albumActual.descripcion
      inputImagen.value = albumActual.portada

      buttonEditAlbum.href = 'https://proyectodisco.onrender.com/editAlbum.html?album=' + albumActual._id
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
    if (!validateInputs()) {
      return
    }
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
            title: '¡Error!',
            text: error.response,
            icon: 'error',
            button: 'Ok'
        })
        redirect("https://proyectodisco.onrender.com/album.html?album=" + albumActual._id)
    }
}

function getInputValues() {    

    const albumEditado = {
      "titulo": inputTitulo.value,
      "descripcion": inputDescripcion.value,
      "portada": inputImagen.value
    }

    return albumEditado
}

function validateInputs() {
  const titulo = inputTitulo.value
  const descripcion = inputDescripcion.value
  
  if (!titulo) {
    swal({
      title: 'Error!',
      text: 'El álbum debe tener un título.',
      icon: 'error',
      button: 'Ok'
    })
    return false
  }

  if (!descripcion) {
    swal({
      title: 'Error!',
      text: 'El álbum debe tener una descripción.',
      icon: 'error',
      button: 'Ok'
    })
    return false
  }

  if (descripcion.length < 5) {
    swal({
      title: 'Error!',
      text: 'La descripción del álbum debe tener un mínimo de 5 caracteres.',
      icon: 'error',
      button: 'Ok'
    })
    return false
  }

  if (descripcion.length > 200) {
    swal({
      title: 'Error!',
      text: 'La descripción del álbum debe tener un máximo de 200 caracteres.',
      icon: 'error',
      button: 'Ok'
    })
    return false
  }

  return true
}

cargarAlbum()

botonEditar.addEventListener('click', (e) => changeAlbum(e));

botonCancelar.addEventListener('click', () => {
  redirect("https://proyectodisco.onrender.com/album.html?album=" + albumActual._id)
})

function redirect(url) {
  window.location.href = url;
}