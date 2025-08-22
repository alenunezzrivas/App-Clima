// Función que se ejecuta cuando el usuario pulsa el botón "Buscar"
function buscarCiudad() {
    const ciudad = document.getElementById("ciudad").value.trim();

    if (ciudad === "") {
        alert("Por favor, introduce una ciudad.");
        return; 
    }

    fetch(`api.php?ciudad=${encodeURIComponent(ciudad)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }   // Si la respuesta del servidor no es correcta, se lanza un error
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Si la respuesta del servidor contiene un error, se muestra en pantalla
        if (data.error) {
            document.getElementById("resultado").innerHTML = `<p>${data.error}</p>`;
        } else {
            // Se procesan los datos del clima y las actividades sugeridas
            let actividadSugerida = sugerirActividad(data.clima);

            document.getElementById("resultado").innerHTML = `
                <strong>Ciudad:</strong> ${data.nombre} <br> 
                <strong>País:</strong> ${data.pais} <br> 
                <strong>Temperatura:</strong> ${data.temperatura} <br>
                <strong>Humedad:</strong> ${data.humedad} <br> 
                <strong>Clima:</strong> ${data.clima} <br>
                <strong>Actividad recomendada:</strong> ${actividadSugerida} <br>
                <strong>Latitud:</strong> ${data.latitud}, <strong>Longitud:</strong> ${data.longitud}
            `;
        }
    })
    .catch(error => console.error("Error en la solicitud:", error));   
    // Si hay un error en la solicitud, se muestra en consola
}   

// Función para sugerir actividades según el clima
function sugerirActividad(clima) {
    if (clima.includes("soleado")) {
        return "¡Perfecto para un paseo al aire libre o hacer senderismo!";
    } else if (clima.includes("lluvia")) {
        return "Es un buen día para leer un libro o ver una película en casa.";
    } else if (clima.includes("nubes")) {
        return "Un día ideal para visitar museos o galerías de arte.";
    } else {
        return "Disfruta de tu día, ¡las opciones son infinitas!";
    }
}
