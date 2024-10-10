function validateInputs([campos]){
    campos.forEach(campo => {
        if (campo.length === 0) {
            alert("Falta completar campos obligatorios.");
            return;
        }
    });
}