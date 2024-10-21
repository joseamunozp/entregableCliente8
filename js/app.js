let arrayCursos = [];

addEventListener("load", (event) => {
    
    const bunttonsAddCart = document.querySelectorAll('.agregar-carrito');
    const bunttonEmptyCart = document.querySelector('#vaciar-carrito');
    const listCart = document.querySelector('#lista-carrito');

    bunttonsAddCart.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log('Button clicked!');

            let el = event.target;

            let idCurso = parseInt(el.dataset.id);
            let imgCurso = findParent(el, '.imagen-curso');
            let nombreCurso = findParent(el, '.info-card > h4');
            let precio = findParent(el, '.precio > span');
            let cantidad = 1;

            var matchingCourse = arrayCursos.find((curso) => curso.idCurso === idCurso);

            if(matchingCourse)
            {
                matchingCourse.cantidad = matchingCourse.cantidad + 1;
            }
            else
            {
                arrayCursos.push(
                    {
                        'idCurso': idCurso,
                        'imagen': imgCurso,
                        'nombre': nombreCurso,
                        'precio': precio,
                        'cantidad': cantidad
                    }
                );
            }

            renderCartList(listCart, arrayCursos);
        });
    });

    bunttonEmptyCart.addEventListener('click', (event) => {
        console.log('Button vaciar clicked!');

        arrayCursos.splice(0, arrayCursos.length);
        renderCartList(listCart, arrayCursos);
    });
});

function findParent(element, selector) {
    while (element) {
        let selectedElement = element.querySelector(selector);
        if (selectedElement) {
            return selectedElement;
        }
        element = element.parentElement; // Subimos al padre
    }
    return null; // Si no se encuentra, retorna null
}

function renderCartList(cartTable, arrayCursos)
{
    cartTable.replaceChildren(); // vaciar tabla

    arrayCursos.forEach(curso => {
        let productLine = cartTable.insertRow();

        let tdImg = productLine.insertCell(0);
        let tdNombreCurso = productLine.insertCell(1);
        let tdPrecio = productLine.insertCell(2);
        let tdCantidad = productLine.insertCell(3);
        let tdEliminar = productLine.insertCell(4);

        tdImg.appendChild(curso.imagen.cloneNode());
        tdNombreCurso.innerHTML = curso.nombre.innerHTML;
        tdPrecio.innerHTML = curso.precio.innerHTML;
        tdCantidad.innerHTML = curso.cantidad.toString();

        let botonEliminar = document.createElement('button');
        botonEliminar.classList.add('borrar-curso');
        botonEliminar.dataset.id = curso.idCurso;

        tdEliminar.appendChild(botonEliminar);

        botonEliminar.addEventListener('click', (event) => {
            let el = event.target;

            let idCurso = parseInt(el.dataset.id);
            deleteProductCart(idCurso, cartTable, arrayCursos);
        });
    });
}

function deleteProductCart(idCurso, cartTable, arrayCursos)
{
    var matchingCourse = arrayCursos.find((curso) => curso.idCurso === idCurso);

    if(matchingCourse)
    {
        if (matchingCourse.cantidad > 1)
            matchingCourse.cantidad = matchingCourse.cantidad - 1;
        else
        {
            arrayCursos.splice(arrayCursos.indexOf(matchingCourse), 1); 
        }
    }

    renderCartList(cartTable, arrayCursos);
}