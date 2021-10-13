const container = document.querySelector("#contenido");
//const botonFavorito = document.querySelector('.favorite');
const favorit = document.querySelector("#favorit");
const borrar = document.querySelector("#borrado");

let entradas = [];
let status = {
  favoritos: [],
};
let ReflejaFavorito = [];
const unicos = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarEstadoStorage();
  getBlog();
  borrar.addEventListener("click", borrarLocal);

  //botonFavorito.addEventListener('click', favoritos);
});

function getBlog() {
  fetch("./data/blog.json")
    .then((response) => response.json())
    .then((data) => {
      entradas = data;
      populateBlog(entradas);
      configurarMarcarFavorito();
      loadFavoritos();
    });
}

function populateBlog(entradasJSON) {
  container.innerHTML = "";
  entradasJSON.forEach((entrada) => {
    container.innerHTML += `
    <article class="entrada">
    <h2><img id="post-${entrada.id}" class="favorite" src="img/favorite-off-icon.png" alt="marcar como favorita" />${entrada.titol}</h2>
    <img src="img/${entrada.foto}" alt="Imagen ${entrada.titol}">
    <p>${entrada.descripcio}</p>
    <p>${entrada.autor}</p>
    <p>${entrada.dataPublicacio}</>
    <a href="#" class="boton">Leer Más</a>
  </article>
    
    
    `;
  });
}

/* function favoritos(e){
e.target.src="img/favorite-on-icon.png";
} */

function configurarMarcarFavorito() {
  const listaEstrellas = document.querySelectorAll(".favorite");
  for (let icono of listaEstrellas) {
    icono.addEventListener("click", function (e) {
      // Recuperamo el id del favorito
      let idFavorito = this.id.split("-")[1];
      console.log(e);
      if (e.target.src.includes("img/favorite-off-icon.png")) {
        e.target.src = "img/favorite-on-icon.png";
        // Actualizamos los favoritos del storage
        addFavoritoStorage(idFavorito);
        loadFavoritos();
      } else {
        e.target.src = "img/favorite-off-icon.png";
        // Actualizamos los favoritos del storage
        deleteFavoritoStorage(idFavorito);
      }
    });
  }
}

function cargarEstadoStorage() {
  let statusStorage = localStorage.getItem("status");
  if (statusStorage) status = JSON.parse(statusStorage);
  console.log(status.favoritos);
}

// Carga los favoritos desde el storage
function loadFavoritos() {
  if (status.favoritos) {
    status.favoritos.forEach((item) => {
      let favoritoIcono = document.querySelector("#post-" + item.id);
      if (favoritoIcono) {
        favoritoIcono.src = "img/favorite-on-icon.png";
        guardaFavoritos(item.id);
      }
    });
  }
}

// Añadir un favorito del storage
function addFavoritoStorage(idFavorito) {
  if (idFavorito != status.favoritos.id) {
    status.favoritos.push({ id: idFavorito });
    localStorage.setItem("status", JSON.stringify(status));
  }
}

// Quitar un favorito del storage
function deleteFavoritoStorage(idFavorito) {
  // Nos quedamos sólo con los favoritos que no coinciden con el id pasado por parámetro
  let nuevaListafavoritos = status.favoritos.filter(
    (fav) => fav.id != idFavorito
  );
  status.favoritos = nuevaListafavoritos;
  localStorage.setItem("status", JSON.stringify(status));
}

function guardaFavoritos(id) {
  entradas.forEach((entrada) => {
    if (id == entrada.id) {
      ReflejaFavorito.push(entrada.titol);
     
     
     
       if( ReflejaFavorito.some((A) => A != entrada.titol)){
            favorit.innerHTML += `
            <h3 id="titulo">${entrada.titol}</h3>
        <p id="cortado">${entrada.descripcio}<p>
            `;
        }



}
});
}
    
    

      // Lorem ipsum dolor sit amet, consectetur adipisicing elit...
    

const eliminaDuplicados = (arr = ReflejaFavorito) => {
  arr.forEach((elemento) => {
    if (!unicos.includes(elemento)) {
      unicos.push(elemento);
    }
  });
};

function borrarLocal() {
  localStorage.removeItem("status");
  favorit.innerHTML = "";
}
