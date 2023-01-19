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

    const respuesta = await axios.get(`https://openlibrary.org/search.json?title=${titulo}`);

    printLibros(respuesta.data.docs);
}

//getLibros de la listaLibros
let random = Math.floor(Math.random() * librosPopulares.length);
getLibros(librosPopulares[random]);
//inputSearch.value = librosPopulares[random];
//Mostrar spinner
spinner.style.display = 'block';

//Funcion que imprime los libros en el HTML con un template string
const printLibros = (libros) => {  
    const contenedor = document.getElementById('deck');
    contenedor.innerHTML = '';
    libros.forEach(libro => {

        const lib = document.createElement('div');
        
        //Cargar el enlace de la casa del libro
        let link = '';
        if(!libro.isbn || libro.isbn.length === 0){ //Si no hay isbn (no hay enlace
            link = "";
        }else{
            //link = `<a href="${enlaceCasaDelLibro(libro.isbn[0])}" target="_blank" class="btn btn-primary">Comprar</a>`;
        }
        link = `<a href="${enlaceCasaDelLibro(libro.title)}" target="_blank" class="btn btn-primary">Comprar</a>`;

        lib.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${libro.title}</h3>
                    <p>${libro.author_name}</p>
                    <p>${libro.first_publish_year}</p>
                                      
                    <img src="${devolverPortadaLibro(libro)}" alt=""> 
                    <br>           
                    ${link}
                </div>
            </div>
        `;

        librosDiv.appendChild(lib);
    });
}

//Funcion que devuelve la url de la portada del libro si existe o una imagen por defecto
function devolverPortadaLibro(libro) {
    if (libro.cover_i) {
        return `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`;
    } else {
        return 'https://via.placeholder.com/150x180?text=No+Image';
    }
}

function enlaceCasaDelLibro(isbn) {
    return `https://www.casadellibro.com/?q=${isbn}`;
}