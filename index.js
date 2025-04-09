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

    const recuperados = await fetch("https://lumatamorosva.github.io/Proyecto/comentarios.json");
    if(recuperados.ok){
      const data = await recuperados.json();
      const comentarios = data.comentarios;
      comentarios.forEach(comentario => {
        listaActual.push(comentario.comentario);
      })
    }
    
    //Mostrarlos
    listaActual.forEach(function(item){
      const nuevo = document.createElement('div');
      nuevo.classList.add('Comentario');
      nuevo.textContent = item;
      listaComentarios.appendChild(nuevo);
    });
    
  }

  async function guardarComentario(comment) {
    const aGuardar = {"comentario": comment};
    const response = await fetch("https://lumatamorosva.github.io/Proyecto/comentarios.json");
    if(response.ok){
      const data = await response.json();
      data.comentarios.push(aGuardar);

      const saveResponse = await fetch("https://lumatamorosva.github.io/Proyecto/comentarios.json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if(saveResponse.ok) {
        alert("Yes");
      }
    }
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