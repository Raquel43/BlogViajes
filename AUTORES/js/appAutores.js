import { Autor } from "./Autor.js";
const button = document.querySelector("#btn-guardar");
const tablaAutores = document.querySelector("#autores");

let AutorList =JSON.parse(localStorage.getItem("autores")) || [];

document.addEventListener("DOMContentLoaded", () => {
  button.addEventListener("click", addAutor);
  populateAutores();
});

function comprobarFecha(fecha) {
  let hoy = new Date();
  let fechaFormulario = new Date(fecha);
  hoy.setHours(0, 0, 0, 0);
  fechaFormulario.setHours(0, 0, 0, 0);
  if (fechaFormulario >= hoy) {
    console.log(hoy);
    console.log("fecha erronea");
    return false;
  } else {
    console.log(hoy);
    console.log("fecha correcta");
    return true;
  }
}

function checkFormulario() {
  let Nif = document.querySelector("#nif").value;
  let Nom = document.querySelector("#nom").value;
  let Llinatges = document.querySelector("#llinatges").value;
  let Naixement = document.querySelector("#naixement").value;
  //comprobar si algun campo esta vacio
  if (Nif == "" || Nom == "" || Llinatges == "" || Naixement == "") {
    return false;
  } else {
    return true;
  }
}

const addAutor = () => {
  let Nif = document.querySelector("#nif").value;
  let Nom = document.querySelector("#nom").value;
  let Llinatges = document.querySelector("#llinatges").value;
  let Naixement = document.querySelector("#naixement").value;
  let Rol = document.querySelector("#rol").value;
  //Comprobamos que el NIF introducido no esté repetido
  if (AutorList.some((A) => A.nif == Nif)) {
    alert("El DNI debe ser único");
    return false;
  }
  let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
  let expresion_regular_nombre = /^[a-z ,.'-]+$/i;
  if (
    expresion_regular_dni.test(Nif) &&
    expresion_regular_nombre.test(Nom) &&
    expresion_regular_nombre.test(Llinatges) &&
    comprobarFecha(Naixement) &&
    checkFormulario()
  ) {
    let autor = new Autor(Nif, Nom, Llinatges, Naixement, Rol);

    AutorList.push(autor);
    GuardarLocal();
    populateAutores();
  } else {
    alert("datos incorrectos");
  }
};

function populateAutores() {
  tablaAutores.innerHTML = "";
  AutorList.forEach((autor, index) => {
    tablaAutores.innerHTML += `
        <tr>
      <th>${index + 1}</th>
      <td>${autor.nif}</td>
      <td>${autor.nom}</td>
      <td>${autor.llinatges}</td>
      <td>${convertDateFormat(autor.naixement)}</td>
      <td>${autor.rol}</td>
    </tr>
        
        `;
  });
}

//Función que convierte el formato de fecha año-mes-dia por el de dia/mes/año
function convertDateFormat(fecha) {
  var info = fecha.split("-").reverse().join("/");
  return info;
}


function GuardarLocal() {
  // Comprovar en primer lloc si l'objecte Storage es troba definit al motor del navegador
  if (typeof Storage == "undefined") {
    alert("Localstore no soportado por el navegador");
  } else {
    console.log("Estoy guardando usuarios");

    // LocalStorage disponible
    // Guardar i extreure objectes json del Storage:

    let dadesNoves = AutorList;

    //Pasamos los datos a string para poder guardarlos en el localStorage
    localStorage.setItem("autores", JSON.stringify(dadesNoves));
    alert("objeto guardado");
  }
}
