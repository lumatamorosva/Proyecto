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
function ampliacionProducts(imgs) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    expandImg.parentElement.style.display = "block";
  }

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