const form = document.getElementById('login');
let email = document.forms[0].elements[0];
let password = document.forms[0].elements[1];
let reminder = document.getElementById("reminder");

// Si la contraseña tiene menos de 6 letras, no envía el form y muestra el mensaje de error
form.addEventListener('submit', function(event) {
    if (email.value.length === 0 || password.value.length === 0) {
        swal("Ups!", "Por favor completá todos los campos",
            "warning"
        );
    }

    if (password.value.length < 6) {
        event.preventDefault();
        reminder.style.display = 'block';
    }

});

password.addEventListener('input', function() {
    if (password.value.length < 6) {
        reminder.style.display = 'block';
    } else {
        reminder.style.display = 'none';
    }
});