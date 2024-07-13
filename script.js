// Definición de la clase ArticuloBase
class ArticuloBase {
    constructor(nombre, categoria) {
        this.nombre = nombre;
        this.categoria = categoria;
    }
}

// Definición de la clase ProductoSupermercado que hereda de ArticuloBase
class ProductoSupermercado extends ArticuloBase {
    constructor(nombre, categoria, cantidad, precio) {
        super(nombre, categoria);
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

// Array para almacenar los productos
let productos = [];

// Función para añadir un producto utilizando Promesas
function añadirProducto() {
    return new Promise((resolve, reject) => {
        let buscado;
        let nombre = document.getElementById('nombre').value;
        let categoria = document.getElementById('categoria').value;
        let cantidad = parseInt(document.getElementById('cantidad').value);
        let precio = parseFloat(document.getElementById('precio').value);

        buscado = productos.find(producto => producto.nombre === nombre);
        if(nombre && categoria && cantidad && precio){
            if(!buscado){
                let producto = new ProductoSupermercado(nombre, categoria, cantidad, precio);
                productos.push(producto);
                resolve(producto);
                }
                else{
                    reject(window.alert("No se pueden repetir los productos"))
                }
        }
        else{
            window.alert("Rellene todos los campos correctamente")
        }
        
    });
}

// Función para actualizar la cantidad de un producto utilizando Promesas
function actualizarCantidad() {
    return new Promise((resolve,reject)=>{
        let nombre = document.getElementById('nombreActualizar').value;
        let nuevaCantidad = parseInt(document.getElementById('nuevaCantidad').value);

        if(nombre && nuevaCantidad){
            let productoEncontrado = productos.find(producto => producto.nombre === nombre);
            if (productoEncontrado) {
                productoEncontrado.cantidad = nuevaCantidad;
                resolve(productoEncontrado);
            }
            else{
                reject('Producto no encontrado');
            }
        }
        else{
            window.alert("Rellene todos los campos correctamente")
        }
    });
}

// Función para mostrar productos por categoría utilizando Promesas
function mostrarProductos() {
    return new Promise((resolve, reject) => {
        let categoria = document.getElementById('categoriaMostrar').value;

        if(categoria){
            let productosFiltrados = productos.filter(producto => producto.categoria === categoria);

            if (productosFiltrados.length > 0) {
                resolve(productosFiltrados);
            } else {
                reject(window.alert('No se encontraron productos en la categoría: ' + categoria));
            }
        }
        else{
            window.alert("Rellene todos los campos correctamente")
        }
       
    });
}

// Función para limpiar el formulario después de añadir un producto
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
}

// event listeners para los botones
document.getElementById('añadirProducto').addEventListener('click', () => {
    añadirProducto()
        .then(producto => {
            window.alert('Producto añadido correctamente');
            limpiarFormulario();
        })
        .catch(error => window.alert(error))
});

document.getElementById("actualizarCantidad").addEventListener('click',() =>{
    actualizarCantidad()
    .then(producto => window.alert(" Para el producto: '" + producto.nombre + "' nueva cantida: " + producto.cantidad ))
    .catch(error => window.alert(error))
})

document.getElementById('mostrarProductos').addEventListener('click', () => {
    mostrarProductos()
        .then(productosFiltrados => {
            let tablaProductos = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];

            // Limpiar tabla
            tablaProductos.innerHTML = '';

            // Añadir filas a la tabla con los productos filtrados
            productosFiltrados.forEach(producto => {
                let fila = tablaProductos.insertRow();
                let celdaNombre = fila.insertCell(0);
                let celdaCantidad = fila.insertCell(1);
                let celdaPrecio = fila.insertCell(2);
                celdaNombre.textContent = producto.nombre;
                celdaCantidad.textContent = producto.cantidad;
                celdaPrecio.textContent = producto.precio;
            });

            document.getElementById('categoriaMostrar').value = '';
        })
        .catch(error => window.alert(error))
});

// event listener para el menú
document.getElementById('menu').addEventListener('change', function() {
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.style.display = 'none';
    });
    if(this.value !== "mostrarSeccion"){
        console.log("No se muestra nada")
        while(tablaProductos.rows.length > 1){
            tablaProductos.deleteRow(1);
        }
        console.log("todo borrado")
    }
    if (this.value) {
        document.getElementById(this.value + 'Seccion').style.display = 'block';
    }
});
