

//urlApi = "https://newsapi.org/v2/everything?q=cat&apiKey=96bf84656a224ac4a1005fc92ade694d"
  var index = 0;
  var page = 1;
  var divPadre;
  var tituloId;
  var imagenID;
  var contenidoId;
  var pageSize = 6;
  var respuesta;

function clearAndSearch(){

  $("*#contenedorMaestro").html("")

  page = 1;
  index = 0;
  searchNews()

  /*document.getElementById("contenedorMaestro").innerHTML ="";
  page = 1;
  index = 0;
  searchNews();*/
}



function searchNews() {
  
  urlApi = setUrl();

  $.ajax({
    url: urlApi,
    
    beforeSend: function( xhr ) {
     // xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
    }
  })
  
    .done(function(datos) {
    
        //console.log( "Sample of data:", datos.slice( 0, 100 ) );
        respuesta = datos;

        console.log(respuesta);
       // console.log(page);

          index = 0;
    reload(respuesta);

    });




/*
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      respuesta = this.responseText;
      console.log(respuesta);
      console.log("page: " + page)
      index = 0;

      reload();
    }




    };
  xhttp.open("GET", urlApi, true);
  xhttp.send();

  
*/
}

function setUrl(){
  botonId = $("#inputNoticias");
  text = botonId.val();
  urlApi = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://newsapi.org/v2/everything?q=" + text + "&pageSize=" + pageSize + "&page=" + page + "&apiKey=96bf84656a224ac4a1005fc92ade694d");
  return urlApi;
}


  
  //respuestaParse.articles[page]


function reload(respuestaParse){
  
  //Hacerlo que te elimine en la pagina
  //document.getElementById("contenedorMaestro").innerHTML ="";
  //respuestaParse = JSON.parse(respuesta)
  barraDeEstado = $("#status");
  if(respuestaParse.totalResults != 0){


    for(i = 0; i < pageSize; i++){
        
      inputBusqueda = $("#inputNoticias");
      masResultados = $("#botonMas");
      divAbuelo = $("#contenedorMaestro");
      divPadre = $("<div></div>");
      tituloId = $("<div></div>");
      imagenId = $("<img></img>");
      contenidoId = $("<div></div>");
      //masInfo = document.createElement("button");
      enlaceNoticia = $("<a></a>");
      //contadorPagina = document.getElementById("contadorPagina");

      divAbuelo.append(divPadre);
      divPadre.attr("class", "contenedorPadre");
      // divPadre.css("width", "27vw");
      divPadre.css("position","relative");
      divPadre.css("borderLeft", "solid");
      divPadre.css("borderColor", "burlyWood");
      divPadre.css("backgroundColor", "moccasin");
      // divPadre.css("padding", "1vh");

      divPadre.css("animation", "fade .5s");

      //divPadre.style.borderRadius = "5%";
      

      divPadre.append(tituloId);

      divPadre.append(imagenId);
      imagenId.css("width", "26vw");

      divPadre.append(contenidoId);

      /*divPadre.appendChild(masInfo);
      masInfo.textContent = "Mas info"
      //masInfo.style.border = "outset"
      */
      divPadre.append(enlaceNoticia);
      enlaceNoticia.text("Mas info");
      
      titulo = respuestaParse.articles[index].title;
      imagen = respuestaParse.articles[index].urlToImage;
      
      //--------------------------Trimer---------------------------
      contenido = trimText(respuestaParse.articles[index].content);
      
      //contenido = respuestaParse.articles[index].content;

      enlace = respuestaParse.articles[index].url;

      tituloId.text(titulo);
      imagenId.attr("src",imagen);
      contenidoId.text(contenido);
      enlaceNoticia.attr("href",enlace);

      //contadorPagina.textContent = page;
      
      index++
      //console.log(index)

      masResultados.css("opacity", "1");
      barraDeEstado.text("Se han encontrado: " + respuestaParse.totalResults + " resultados.");
    
      scrollDown();
    }    
  }
}

function trimText(textoIntroducido){
  position = textoIntroducido.lastIndexOf("[");
  nuevaCadena = textoIntroducido.slice(0, position);

  //console.log(nuevaCadena + "  a  " + textoIntroducido + " a " + position)
  return nuevaCadena;
}


function scrollDown(){
  $("html").scrollTop(document.body.scrollHeight);
}



function cargarMas(){
  page++
  //contadorPagina.textContent = page;
      searchNews();
    }


    
    window.onload = function(){

      input = $("#inputNoticias");
      input.on("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault();
         $("#botonNoticias").click();
        }
      });
    }


    
