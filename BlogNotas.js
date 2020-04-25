//variables
const listaTareas = document.querySelector('#lista-tareas');



//eventListeners

//evento agregar tarea
document.querySelector('#agregar').addEventListener('click', agregarNota);

//evento eliminar tarea
listaTareas.addEventListener('click', eliminarTarea);

//cargar contenido en el DOM con localstorage
document.addEventListener('DOMContentLoaded', cargarTareas);


//funciones

//agregar tarea al dom
function agregarNota(){
    const tarea = document.querySelector('#tarea-ingresada').value;
    
    const li = document.createElement('li')
    li.innerText = tarea
    listaTareas.appendChild(li)

    const borrar = document.createElement('a')
    borrar.classList = 'btn-eliminar'
    borrar.href = '#'
    borrar.innerText = 'x'
    li.appendChild(borrar)

    agregarTareaLS(tarea)
}

//eliminar tarea del dom
function eliminarTarea(e){
    
    if(e.target.classList.contains('btn-eliminar')){
        e.target.parentElement.remove()
        borrarTareaLS(e.target.parentElement.innerText)
    }    
}

//Agregar tareas al localstorage
function agregarTareaLS(tarea){
    let tareaLS;
    
    tareaLS = obtenerValorLS()

    tareaLS.push(tarea)
    
    localStorage.setItem('tareas', JSON.stringify(tareaLS))
}

//obtener valor de localstorage y convertirlo a string
function obtenerValorLS(){
    //validamos que exista o no un valor en localStorage
    let tareaLS = []

    if(localStorage.getItem('tareas') === null){
        tareaLS = []
    } else {
        tareaLS = JSON.parse(localStorage.getItem('tareas'))
    }
    return tareaLS
}

function cargarTareas(){
    let tareaCargadas;

    tareaCargadas = obtenerValorLS()

    tareaCargadas.forEach(function(tareaCargada){
    
        //Creamos el tag <li> donde iran cada tarea ingresada y le agregamos el valor tarea
        let li = document.createElement('li');
        li.innerText = tareaCargada;
        listaTareas.appendChild(li);

        //creamos el boton para borrar cada tarea y lo pasamos con cada <li> creado
        let eliminar = document.createElement('a');
        eliminar.classList = 'btn-eliminar';
        eliminar.innerText = 'x';
        li.appendChild(eliminar); 
    })
}

function borrarTareaLS(tarea){  
    let tareals, tareaborrada;

    tareaborrada = tarea.substring(0, tarea.length-1)
    
    tareals = obtenerValorLS()

    tareals.forEach(function(tarea, index){
        console.log(tarea)
        if(tareaborrada === tarea){
            tareals.splice(index, 1);
        }
    })
    localStorage.setItem('tareas', JSON.stringify(tareals))
}