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
  //Consumir el key para el token
  function consumirKeyToken() {
    fetch("config.json")
      .then(respuest => respuest.json())
      .then(
        config =>
        {
          return config.claveLlamada + "o";
        }
      )
  }
  //Constantes para las APIs
  const urlCommentsPut = "https://api.github.com/repos/lumatamorosva/RecursosProyecto/contents/comentarios.json?ref=main";
  const token1 = consumirKeyToken();
  const urlCom = "https://raw.githubusercontent.com/lumatamorosva/RecursosProyecto/main/comentarios.json";
  //Se usará un proxy porque Github no permite solicitudes fetch desde fronend
  const proxy = "https://cors-anywhere.herokuapp.com/";

  //Función para agregar el nuevo comentario en la pantalla y adicionalmente 
  //mandarlo a guardar de manera permanente
  function nuevoComment() {
    const nuevoComentario = document.getElementById('comentarioInput');
    const listaComentarios = document.getElementById('listaComentarios');
    if(nuevoComentario.value != ""){
      /*const nuevo = document.createElement('div');
      nuevo.classList.add('Comentario');
      
      nuevo.textContent = nuevoComentario.value.trim();
      listaComentarios.appendChild(nuevo);*/
      //guardar en JSON
      guardarComentario(nuevoComentario.value.trim());
      //Se limpia el campo de texto
      nuevoComentario.value = "";
      cargarComentarios();
    }
  }
//Aquí se cargan los comentarios anteriores
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
    //Limpiar la lista
    listaComentarios.innerHTML = "";
    //Volverlos a agregar
    listaActual.forEach(function(item){
      const nuevo = document.createElement('div');
      nuevo.classList.add('Comentario');
      nuevo.textContent = item;
      listaComentarios.appendChild(nuevo);
    });
  }

  async function guardarComentario(comment) {

    fetch("http://localhost:3000/comentarios")
      .then(res => res.json())
      .then(data => console.log(data));
  
    fetch("http://localhost:3000/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comentario: comment })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

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