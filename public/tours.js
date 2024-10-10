let tickets = {
  "BuenosAires": 0,
  "Cordoba": 0,
  "Wembley": 1,
  "Liverpool": 2,
  "Auckland": 3,
  "Dunedin": 4
}

let nombre = prompt("¿Cómo te llamás?").toUpperCase();
while (nombre.length < 3) {
  nombre = prompt(
    "Mmmm, tu nombre no puede ser tan corto, por favor ingresá al menos 3 letras:",
  ).toUpperCase();
}

let edad = prompt("¿Cuántos años tenés?");
if (edad < 18) {
  swal("Aviso",
    "Lo sentimos, la venta de tickets está deshabilitada para menores de 18 años.",
    "error"
  );

  const todosLosBotones = document.querySelectorAll(".fecha button");
  for (let i = 0; i < todosLosBotones.length; i++) {
    todosLosBotones[i].setAttribute("disabled", true);
    todosLosBotones[i].classList.add("text-gray-500");
  }
} else {
  disableSoldOutButtons();
}

const span = document.getElementById("welcome");
span.textContent = "Hola, " + nombre;
const i = document.querySelector("#i");
i.setAttribute("class", "fa fa-ticket");

function getTickets(lugar) {
  if (tickets[lugar]) {
    tickets[lugar]--;
    swal("Vendido!", "Ya tenés los tickets para el concierto en " +
      lugar + ".",
      "success"
    );
  } else {
    swal(
      "Agotado",
      "Lo sentimos, se agotaron los tickets para " + 
      lugar + ".", "error"
    );
  }
  disableSoldOutButtons();
}

function disableSoldOutButtons() {
  let boton;
  for (let lugar in tickets) {
    if (lugar.includes(" ")) {
      lugar = quitarEspaciosA(lugar);
    }
    boton = document.getElementById(lugar.toLowerCase());
    if (boton != null && tickets[lugar] === 0) {
      boton.textContent = "Agotado";
      boton.setAttribute("disabled", true);
      boton.classList.add("text-gray-500");
    }
  }
}

function quitarEspaciosA(cadena) {
  return cadena.toLowerCase().split(" ");
}