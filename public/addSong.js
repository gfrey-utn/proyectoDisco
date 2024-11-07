const botonAgregar = document.getElementById('botonAgregar')
const botonCancelar = document.getElementById('botonCancelar')

const inputTitulo = document.getElementById('titulo')
const inputDuracion = document.getElementById('duracion')
const inputImagen = document.getElementById('imagen')

const buttonEditAlbum = document.getElementById('buttonEditAlbum')
const buttonAddSong = document.getElementById('buttonAddSong')

let albumActual;
let newSong = {}
const albumId = window.location.search.split('album=')[1]

const getAlbum = async () =>{
  try {
    const response = await axios.get('https://proyectodisco.onrender.com/band/' + albumId)
    albumActual = response.data;
  } catch (error) {
    console.log(error)
    swal({
        title: 'Error!',
        text: 'Error al cargar el álbum.',
        icon: 'error',
        button: 'Ok'
    })
    redirect('https://proyectodisco.onrender.com/editAlbum.html?album=' + albumActual._id)
  }
}

const addSong = async(e) => {
    e.preventDefault()
    if (!validateInputs()) {
        return
    }
    const nuevaCancion = getInputValues()
    albumActual.canciones.push(nuevaCancion)
    try {
        await axios.put('https://proyectodisco.onrender.com/band/' + albumActual._id, albumActual)
        swal({
            title: '¡Canción agregada!',
            text: '¡La canción fue sumada al álbum con éxito!',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    } catch(error) {
        console.log(error)
        swal({
            title: '¡Error!',
            text: error.response,
            icon: 'error',
            button: 'Ok'
        })
    }
    redirect("https://proyectodisco.onrender.com/album.html?album=" + albumActual._id)
}

function getInputValues() {    
    const nuevaCancion = {
      "titulo": inputTitulo.value,
      "duracion": inputDuracion.value,
    }

    return nuevaCancion
}

function validateInputs() {
    const titulo = inputTitulo.value
    const duracion = inputDuracion.value
    
    if (!titulo) {
      swal({
        title: 'Error!',
        text: 'El álbum debe tener un título.',
        icon: 'error',
        button: 'Ok'
      })
      return false
    }
  
    if (!duracion) {
      swal({
        title: 'Error!',
        text: 'El álbum debe tener una duración.',
        icon: 'error',
        button: 'Ok'
      })
      return false
    }  
    return true
}

getAlbum()

botonAgregar.addEventListener('click', (e) => addSong(e));

botonCancelar.addEventListener('click', () => {
  redirect("https://proyectodisco.onrender.com/album.html?album=" + albumActual._id)
})

function redirect(url) {
  window.location.href = url;
}