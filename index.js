/*Geolocation API*/
function initMap() {
            // Coordenadas de la ubicación
            const lat = 9.994909;
            const lon = -84.230364;
            const shopLocation = { lat: lat, lng: lon };
            // Crear el mapa centrado
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: shopLocation
            });
            // Crear un marcador en la ubicación
            const marker = new google.maps.Marker({
                position: shopLocation,
                map: map,
                title: "Encuentranos justo aquí!"
            });
        }
/*Contacto*/

/*Principal*/
//Servicios
function ampliacionProducts(imgs) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    expandImg.parentElement.style.display = "block";
  }

  //Comentarios
  //Requerido para traer la información del ENV
  require('dotenv').config();
  //Constantes para las APIs
  const urlCommentsPut = "https://api.github.com/repos/lumatamorosva/RecursosProyecto/contents/comentarios.json?ref=main";
  const token1 = process.env.claveLlamada;
  const urlCom = "https://raw.githubusercontent.com/lumatamorosva/RecursosProyecto/main/comentarios.json";

  function nuevoComment() {
    const nuevoComentario = document.getElementById('comentarioInput');
    const listaComentarios = document.getElementById('listaComentarios');
    if(nuevoComentario.value != ""){
      const nuevo = document.createElement('div');
      nuevo.classList.add('Comentario');
      nuevo.textContent = nuevoComentario.value.trim();
      listaComentarios.appendChild(nuevo);
      //guardar en JSON
      guardarComentario(nuevoComentario.value.trim());
      //Se limpia el campo de texto
      nuevoComentario.value = "";
    }
  }

  async function cargarComentarios() {
    //Recuperarlos
    const listaComentarios = document.getElementById('listaComentarios');
    const listaActual = [];

    const recuperados = await fetch(urlCom);
    if(recuperados.ok){
      const data = await recuperados.json();
      const comentarios = data.comentarios;
      comentarios.forEach(comentario => {
        listaActual.push(comentario.comentario);
      })
    }else{
      console.log("Error al consumir API");
    }
    
    //Mostrarlos
    listaActual.forEach(function(item){
      const nuevo = document.createElement('div');
      nuevo.classList.add('Comentario');
      nuevo.textContent = item;
      listaComentarios.appendChild(nuevo);
    });
  }
/*
  async function guardarComentario(comment) {
    const aGuardar = { "comentario": comment };
  
    // Obtener el contenido actual del archivo JSON desde GitHub 
    //Se le agrega en no-cache para que no cargue una copia desactualizada
    const response = await fetch(urlCommentsPut, {
      headers: {
        Authorization: `Bearer ${token1+"o"}`,
        Accept: "application/vnd.github.v3+json",
        "Cache-Control": "no-cache",
      },
    });
    //Error por si falla
    if (!response.ok) {
      console.error("Error al obtener el archivo:", await response.text());
      return;
    }
    //el sha es un string encriptado del archivo (valor de hash). En github identifica un commit específico
    const dataActual = await response.json();
    const sha = dataActual.sha;
  
    // Decodificar el contenido base64 a texto
    const contenidoBase64 = dataActual.content;
    const contenidoDecodificado = decodeURIComponent(
      escape(atob(contenidoBase64))
    );
    const jsonActual = JSON.parse(contenidoDecodificado);
  
    // Agregar el nuevo comentario al arreglo
    if (!Array.isArray(jsonActual.comentarios)) {
      jsonActual.comentarios = [];
    }
    jsonActual.comentarios.push(aGuardar);
  
    // Convertir a base64 el nuevo contenido (en github hay que usar base64)
    const nuevoContenidoJSON = JSON.stringify(jsonActual, null, 2);
    const contentBase64 = btoa(unescape(encodeURIComponent(nuevoContenidoJSON)));
  
    // Enviar el PUT para actualizar el archivo
    const respuestaPut = await fetch(urlCommentsPut, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token1+"o"}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Agregado nuevo comentario",
        content: contentBase64,
        sha: sha,
      }),
    });
  }*/

  //Redes
  function goToFacebook() {
    window.open("https://www.facebook.com/invalid_page");
  }

  function goToInstagram() {
    window.open("https://www.instagram.com/[username]/");
  }

  function goToYoutube() {
    window.open("https://www.youtube.com/watch?v=[video_id]");
  }

  function goToWhatsApp() {
    window.open("https://wa.me/11234567890");
  }

  

  /*Historia*/
  async function getHistoria(){
    const contenedor1 = document.getElementById("mostrarHistoria");
    let parrafos = [];
    let texto = "Prueba";
    let counter = 0;
    //API
    const historia = await fetch("https://lumatamorosva.github.io/Proyecto/historia.json")
    .then(response => response.json())
    .then(data => {parrafos.push(data);})

    //Enviar al frontend
    contenedor1.innerHTML = (parrafos[0]).parrafo1 + "<br><br>" + (parrafos[0]).parrafo2  + "<br><br>" + (parrafos[0]).parrafo3  + "<br><br>" + (parrafos[0]).parrafo4;
    
  }