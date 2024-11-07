const botonEnviar = document.getElementById('botonEnviar')

const inputTitulo = document.getElementById('titulo')
const inputAño = document.getElementById('año')
const inputDescripcion = document.getElementById('descripcion')
const inputImagen = document.getElementById('imagen')

function redirect(url) {
    window.location.href = url;
}

const addAlbum = async (e) => {
    e.preventDefault()
    if (!validateInputs()) {
        return
    }
    try {
      const albumCreado = getInputValues();
      await axios.post("/band", albumCreado);
      swal({
        title: "¡Álbum creado!",
        text: "¡Álbum agregado con éxito!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      redirect('https://proyectodisco.onrender.com')  
    } catch (error) {
        console.log(error)
        swal({
            title: '¡Error!',
            text: error.response,
            icon: 'error',
            button: 'Ok'
        })
    }
}

function getInputValues() {    

    const albumCreado = {
      "titulo": inputTitulo.value,
      "descripcion": inputDescripcion.value,
      "año": inputAño.value,
      "canciones": [],
      "portada": inputImagen.value
    }

    return albumCreado
}

function validateInputs() {
  const titulo = inputTitulo.value
  const año = inputAño.value
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

  if (!año) {
    swal({
      title: 'Error!',
      text: 'El álbum debe tener un año de lanzamiento.',
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

botonEnviar.addEventListener("click", (e) => addAlbum(e));