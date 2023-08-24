document.addEventListener("DOMContentLoaded", function () {
    const agregarAlCarritoBotones = document.querySelectorAll('.agregar-carrito');
    const vaciarCarritoButton = document.getElementById('vaciar-carrito');

    agregarAlCarritoBotones.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    vaciarCarritoButton.addEventListener('click', vaciarCarrito);

    function agregarAlCarrito(event) {
        event.preventDefault();
        const curso = event.target.parentElement;
        const cursoId = curso.querySelector('.agregar-carrito').getAttribute('data-id');
        const nombreCurso = curso.querySelector('h4').textContent;
        const precioCurso = curso.querySelector('.precio').textContent;

        const listaCarrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
        const filasEnCarrito = listaCarrito.querySelectorAll('tr');
        SubirLocal(nombreCurso, precioCurso, cursoId);

        let cursoExistente = false;
        filasEnCarrito.forEach(fila => {
            const filaId = fila.querySelector('.borrar-curso').getAttribute('data-id');
            if (filaId === cursoId) {
                const cantidadInput = fila.querySelector('input[type="number"]');
                cantidadInput.value = parseInt(cantidadInput.value) + 1;
                cursoExistente = true;
            }
        });

        if (!cursoExistente) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><img src="img/curso${cursoId}.jpg" width="50"></td>
                <td>${nombreCurso}</td>
                <td>${precioCurso}</td>
                <td><input type="number" min="1" value="1"></td>
                <td><a href="#" class="borrar-curso" data-id="${cursoId}">X</a></td>
            `;
            
            const eliminarCursoButton = fila.querySelector('.borrar-curso');
            eliminarCursoButton.addEventListener('click', eliminarCurso);
            
            listaCarrito.appendChild(fila);
        }
    }

    function vaciarCarrito(event) {
        event.preventDefault();
        const listaCarrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
        while (listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild);
        }
        localStorage.removeItem('localS');
    }

    function SubirLocal(nombreCurso, precioCurso, cursoId) {
        let LocalS = JSON.parse(localStorage.getItem('localS')) || [];
        LocalS.push({ nombreCurso, precioCurso, cursoId });
        localStorage.setItem("localS", JSON.stringify(LocalS));
    }

    function eliminarCurso(event) {
        event.preventDefault();
        const fila = event.target.parentElement.parentElement;
        const cursoId = fila.querySelector('.borrar-curso').getAttribute('data-id');
    
        fila.remove();
        eliminarCursoDelLocalStorage(cursoId);
    }
    

    function eliminarCursoDelLocalStorage(cursoId) {
        let LocalS = JSON.parse(localStorage.getItem('localS')) || [];
        LocalS = LocalS.filter(item => item.cursoId !== cursoId);
        localStorage.setItem("localS", JSON.stringify(LocalS));
    }
});

