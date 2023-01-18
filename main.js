/**
 * 
 * Axios es una libreria que nos permite hacer peticiones HTTP
 * Como fetch pero con mas funcionalidades y mas sencillo
 * 
 */

let librosPopulares = ["Harry potter", "El principito", "1984", "El señor de los anillos", "El alquimista", "El código da vinci", "El hobbit", "El diario de Ana Frank", "El arte de la guerra", "El perfume", "El nombre del viento", "El principito", "El poder del ahora", "El código da vinci", "El señor de los anillos", "El alquimista", "El hobbit", "El diario de Ana Frank", "El arte de la guerra", "El perfume", "El nombre del viento", "El principito", "El poder del ahora", "El código da vinci", "El señor de los anillos", "El alquimista", "El hobbit", "El diario de Ana Frank", "El arte de la guerra", "El perfume", "El nombre del viento", "El principito", "El poder del ahora", "El código da vinci", "El señor de los anillos", "El alquimista", "El hobbit", "El diario de Ana Frank", "El arte de la guerra", "El perfume", "El nombre del viento", "El principito", "El poder del ahora", "El código da vinci", "El señor de los anillos", "El alquimista", "El hobbit", "El diario de Ana Frank", "El arte de la guerra", "El perfume", "El nombre del viento", "El principito", "El poder del ahora", "El código da vinci", "El señor de los anillos", "El alquimista", "El hobbit", "El diario de Ana Frank", "El arte de la guerra", "El perfume", "El nombre del viento", "El principito", "El poder del ahora", "El código da vinci", "El señor de los anillos", "El alquimista", "El hobbit", "El diario de Ana Frank", "El arte de la guerra", "El perfume", "El nombre del viento", "El principito", "El poder del ahora", "El código da vinci", "El señor de los anillos", "El alquimista", "El hobbit", "El diario de Ana Frank", "El arte de la guerra", "The Alchemist"];

let librosDiv = document.getElementById('deck');
let inputSearch = document.getElementById('search');
let btnSearch = document.getElementById('btnSearch');

let spinner = document.getElementById('spinner');

btnSearch.addEventListener('click', () => {
    getLibros(inputSearch.value);
});

inputSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        getLibros(inputSearch.value);
    }
});


let respuesta = [];

//Funcion que hace la peticion HTTP a la API de OpenLibrary y devuelve los libros que coincidan con el titulo
const getLibros = async (titulo) => {
    spinner.style.display = 'block';

    const respuesta = await axios.get(`http://openlibrary.org/search.json?title=${titulo}`);
    console.log(respuesta.data.docs);

    printLibros(respuesta.data.docs);
}

//getLibros de la listaLibros
let random = Math.floor(Math.random() * librosPopulares.length);
getLibros(librosPopulares[random]);
inputSearch.value = librosPopulares[random];

//Funcion que imprime los libros en el HTML con un template string
const printLibros = (libros) => {  
    const contenedor = document.getElementById('deck');
    contenedor.innerHTML = '';
    libros.forEach(libro => {

        const lib = document.createElement('div');
        
        lib.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${libro.title}</h3>
                    <p>${libro.author_name}</p>
                    <p>${libro.first_publish_year}</p>
                                      
                    <img src="${devolverPortadaLibro(libro)}" alt=""> 
                    <br>           
                    <a href="https://openlibrary.org${libro.key}" target="_blank">Ver libro</a>        
                </div>
            </div>
        `;

        librosDiv.appendChild(lib);
    });
}

//Funcion que devuelve la url de la portada del libro si existe o una imagen por defecto
function devolverPortadaLibro(libro) {
    console.log(libro);
    if (libro.cover_i) {
        return `http://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`;
    } else {
        return 'https://via.placeholder.com/150x180?text=No+Image';
    }
}

