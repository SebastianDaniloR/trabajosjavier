const formulario = document.querySelector('#formulario');
const imagenInput = document.querySelector('#imagenInput');
const listaImagenes = document.querySelector('#lista-imagenes');
let imagenes = [];

eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarImagen);

    document.addEventListener('DOMContentLoaded', () => {
        imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];
        console.log(imagenes);
        crearHTML();
        agregarEventosEliminar();
    });
}

function agregarImagen(e) {
    e.preventDefault();

    const imagen = imagenInput.files[0];

    if (!imagen) {
        mostrarError('Debes seleccionar una imagen');
        return;
    }

    const imagenObj = {
        id: Date.now(),
        src: URL.createObjectURL(imagen)
    };

    imagenes.push(imagenObj);
    console.log(imagenes);
    crearHTML();
    agregarEventosEliminar();
    agregarStorage();
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {
    limpiarHTML();

    imagenes.forEach((imagen) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = imagen.src;
        img.alt = 'Imagen';

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('eliminar-btn');
        btnEliminar.dataset.id = imagen.id;

        li.appendChild(img);
        li.appendChild(btnEliminar);

        listaImagenes.appendChild(li);
    });

    agregarStorage();
    agregarEventosEliminar();
}

function agregarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.eliminar-btn');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', eliminarImagen);
    });
}

function eliminarImagen(e) {
    const id = parseInt(e.target.dataset.id);
    imagenes = imagenes.filter((imagen) => imagen.id !== id);
    crearHTML();
    agregarEventosEliminar();
    agregarStorage();
}

function agregarStorage() {
    localStorage.setItem('imagenes', JSON.stringify(imagenes));
}

function limpiarHTML() {
    while (listaImagenes.firstChild) {
        listaImagenes.removeChild(listaImagenes.firstChild);
    }
}
